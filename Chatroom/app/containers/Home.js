import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
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

const window = Dimensions.get("window")


class Home extends Component {

  static navigationOptions = {
    title: 'Home'
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
        return (
            <View style={styles.container}>
                { this.state.user &&
                  <View>
                    <Text>{this.state.user.fullname}</Text>
                    <Text>{this.state.user.email}</Text>
                  </View>
                }
                <MyButton width={window.width/2} buttonText={"Logout"} onClick={() => {this.logout();}}/>
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
