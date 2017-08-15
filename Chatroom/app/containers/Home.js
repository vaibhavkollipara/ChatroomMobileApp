import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  AsyncStorage,
  ListView,
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
import NewChatroomModal from '../components/NewChatroomModal';

const window = Dimensions.get("window");
class Home extends Component {

  static navigationOptions = {
    title: 'Home',
    header : null
  }

    constructor(){
        super();
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            token : null,
            loading: false,
            user: null,
            chatroomsDataSource : ds,
            error : null,
            hidden : true
        }
        this.refreshHandler = null;
    }

    componentWillMount(){
        AsyncStorage.getItem("token").then((token) => {
            if(token===null || token === ""){
                this.navigateToLoginScreen()
            }else{
                this.props.setToken(token);
                this.props.fetchUserDetails(token);
            }
        }).catch(error => {console.log(error)});
    }

    componentDidMount(){
        this.setState({
              chatroomsDataSource : this.state.chatroomsDataSource.cloneWithRows(this.props.home.chatrooms)
            });
        this.refreshHandler = setInterval(this.getChatrooms.bind(this),5000);

    }

    getChatrooms(){
        console.log("Refresing chatrooms...");
        if(this.state && this.state.token!==null){
                this.props.refreshChatroomsList(this.state.token);
            }
    }

    componentWillUnmount() {
        clearInterval(this.refreshHandler);
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.home != this.props.home){
            this.setState({
                token : nextProps.home.token,
                loading : nextProps.home.loading,
                user : nextProps.home.user,
                error : nextProps.home.error,
                chatroomsDataSource : this.state.chatroomsDataSource.cloneWithRows(nextProps.home.chatrooms)
            });
        }
    }



    settings(){
      return [
        {
            name : 'New Chatroom',
            action: this.toggleNewChatroomModal.bind(this)
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

      errorSettings(){
        return    [{
                name : 'Re Login',
                action : this.logout.bind(this)
            }]
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
        AsyncStorage.removeItem("token").then(() => {
            this.props.logout();
            this.navigateToLoginScreen();
        });
    }

    toggleNewChatroomModal(){
        this.setState({
            hidden : !this.state.hidden
        });
    }

    renderRow(chatroom,sectionId, rowId, highlightId){
        return (
            <TouchableOpacity onPress={() => {alert(`Name : ${chatroom.name}\nSlug : ${chatroom.slug}\nUrl : ${chatroom.url}`)}}>
                <Text style={styles.chatroomName}>{chatroom.name}</Text>
            </TouchableOpacity>
        );
    }

  render() {
    if(this.state.loading){
        return (
            <MyActivityIndicator message={"Fetching User Details"} />
        );
    }else{

        return (
            <View style={styles.container}>
                <MyStatusBar />
                {
                    this.state.user &&
                    <Header title={this.state.user.fullname} settings={this.settings()}/>
                }
                {
                        !this.state.user &&
                        <Header settings={this.errorSettings()}/>
                }
                <View style={{marginTop:75}}>
                    <NewChatroomModal
                            hidden={this.state.hidden}
                            title={"New Chatroom"}
                            toggleFunction={ this.toggleNewChatroomModal.bind(this) }
                            token={this.state.token}
                        />
                    {
                        this.state.error &&
                        <View>
                            <ErrorMessage message={this.state.error} />
                        </View>
                    }

                        <ListView

                            dataSource = {this.state.chatroomsDataSource}
                            renderRow = {this.renderRow.bind(this)}
                            enableEmptySections
                        />
                </View>
            </View>
        );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chatroomName : {
    padding:20,
    margin:5,
    borderRadius:10,
    borderWidth:5,
    borderColor:'#2b7abc',
    textAlign:'center',
    width:window.width *0.75
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
