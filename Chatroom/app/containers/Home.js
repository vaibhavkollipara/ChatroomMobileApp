import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  AsyncStorage,
  Dimensions
} from 'react-native';

import { bindActionCreators } from 'redux';
import { connect }  from 'react-redux';

import { NavigationActions } from 'react-navigation'

import * as homeActions from '../actions/HomeActions';

import ErrorMessage from '../components/ErrorMessage';
import MyActivityIndicator from '../components/MyActivityIndicator';
import MyButton from '../components/MyButton';

import Header from '../components/Header';
import MyStatusBar from '../components/MyStatusBar';

const window = Dimensions.get("window");


class Home extends Component {

  static navigationOptions = {
    title: 'Home',
    header : null
  }

    constructor(){
        super();
        this.state = {
            token : null,
            loading: true,
            user: null,
            chatrooms : [],
            error : null

        }
    }

    componentWillMount(){
        AsyncStorage.getItem("token").then(token => {
            if(token===null || token === ""){
                this.navigateToLoginScreen()
            }else{
                this.props.setToken(token);
                this.props.fetchUserDetails(token);
            }
        }).catch(error => {console.log(error)});
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.home != this.props.home){
            this.setState({
                token : nextProps.home.token,
                loading : nextProps.home.loading,
                user : nextProps.home.user,
                chatrooms: nextProps.home.chatrooms,
                error : nextProps.home.error
            });
        }
    }

    settings(){
      return [
        {
            name : 'New Chatroom',
            action: () => {alert("New Chatroom");}
        },
        {
            name : 'Logout',
            action : this.logout.bind(this)
        },
        {
            name : 'Developer Details',
            action : () => {alert(`Vaibhav Kollipara\nvkollip1@binghamton.edu\n660-528-5433`);}
        }
      ]

    }

    navigateToLoginScreen(){
        const resetAction = NavigationActions.reset({
              index: 0,
              actions: [
                NavigationActions.navigate({ routeName: 'Login'})
              ]
            })
        this.props.navigation.dispatch(resetAction);
    }

    logout(){
        AsyncStorage.removeItem("token");
        this.props.logout();
        this.navigateToLoginScreen();
    }

  render() {
    if(this.state.loading){
        return (
            <MyActivityIndicator message={"Fetching User Details"} />
        );
    }else{

      let action = {
        title:"Logout",
        clicked : this.logout.bind(this)
      }
        return (
            <View style={styles.container}>
                <MyStatusBar />
                {
                    this.state.user && <Header title={this.state.user.fullname} settings={this.settings()}/>
                }
            </View>
        );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

function mapStateToProps(state){
  return {
    home : state.home
  };
}


function mapDispatchToProps(dispatch){
    return bindActionCreators({
                fetchUserDetails : homeActions.fetchUserDetails,
                setToken : homeActions.setToken,
                refreshChatroomsList : homeActions.refreshChatroomsList,
                logout : homeActions.logout
            },dispatch);
}

AppRegistry.registerComponent('Home', () => Home);

export default connect(mapStateToProps,mapDispatchToProps)(Home)
