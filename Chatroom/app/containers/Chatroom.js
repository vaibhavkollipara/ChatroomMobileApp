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

import * as chatroomActions from '../actions/ChatroomActions';

import ErrorMessage from '../components/ErrorMessage';
import MyActivityIndicator from '../components/MyActivityIndicator';
import MyButton from '../components/MyButton';

import Header from '../components/Header';
import MyStatusBar from '../components/MyStatusBar';
import SendMessage from '../components/SendMessage';

import MyModal from '../components/MyModal';

const window = Dimensions.get("window");
class Chatroom extends Component {

  static navigationOptions = {
    title: 'Chatroom',
    header : null,
    chatroomSlug : null
  }

    constructor(){
        super();
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            token : null,
            messagesDataSource : ds,
            error : null,
            chatroomSlug : null,
            chatroomName : null,
            fullname : null,
            message : "",
            membersDataSource : ds,
            membersModalHidden : true,
            loading:true
        }
        this.refreshHandler = null;
    }

    componentWillMount(){
        AsyncStorage.getItem("token").then((token) => {
            if(token===null || token === ""){
                this.navigateToLoginScreen()
            }else{
                this.setState({
                    token,
                });
            }
        }).catch(error => {console.log(error)});
    }

    componentDidMount(){
        this.setState({
              messagesDataSource : this.state.messagesDataSource.cloneWithRows(this.props.chatroom.messages),
              membersDataSource : this.state.membersDataSource.cloneWithRows(this.props.chatroom.members),
              chatroomSlug : this.props.navigation.state.params.chatroomSlug,
              chatroomName : this.props.navigation.state.params.chatroomName,
              fullname : this.props.navigation.state.params.fullname
            });
            this.refreshHandler = setInterval(this.getMessages.bind(this),5000);

    }

    componentWillUnmount() {
        clearInterval(this.refreshHandler);
    }


    componentWillReceiveProps(nextProps) {
        if(nextProps.chatroom != this.props.chatroom){
            this.setState({
                error : nextProps.chatroom.error,
                membersDataSource : this.state.membersDataSource.cloneWithRows(nextProps.chatroom.members),
                messagesDataSource : this.state.messagesDataSource.cloneWithRows(nextProps.chatroom.messages),
                members : nextProps.chatroom.members
            });
        }
    }



    settings(){
      return [
        {
            name: 'View Members',
            action : this.membersModalToggle.bind(this)
        },
        {
            name : 'Exit From Chatroom',
            action : ()=> {alert("Exit from Chatroom")}
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
            this.setState({
                token:null
            });
            this.navigateToLoginScreen();
        });
    }

    getMessages(){
        console.log("Get Messages......");
        if(this.state && this.state.token!==null && this.state.chatroomSlug!==null){
                this.props.loadMessages(this.state.token,this.state.chatroomSlug);
                if(this.state.loading){
                    this.setState({
                        loading:false
                    })
                }
            }
    }

    renderMemberRow(member,sectionId, rowId, highlightId){
        return (
            <View style={{width:window.width*0.65,borderWidth:2,borderRadius:10,margin:10,
            borderColor:'white',alignItems:'center',justifyContent:'center',padding:10}}>
                <Text style={{color:'white'}}>{member.name}</Text>
                <Text style={{color:'white'}}>{member.email}</Text>
            </View>
        );
    }

    membersView(){
        return ( <View style={{flex:1,alignItems:'center',justifyContent:'center'}} >
                            <ListView
                                dataSource = {this.state.membersDataSource}
                                renderRow = {this.renderMemberRow.bind(this)}
                                enableEmptySections
                            />
                    </View>
                );
    }

    renderRow(message,sectionId, rowId, highlightId){
        return (
            <View style={[
                            {flex:1},
                            this.state.fullname===message.sender && {alignItems:'flex-end',marginRight:10},
                            this.state.fullname!==message.sender && {alignItems:'flex-start',marginLeft:10},

                        ]}>
                <Text style={styles.messageSender}>{message.sender}</Text>
                <Text style={styles.message}>{message.message}</Text>
            </View>
        );
    }

    onMessageChange(value){
        this.setState({
            message : value
        });
    }

    sendMessage(){
        if(this.state && this.state.message){
            this.props.sendMessage(this.state.token,this.state.chatroomSlug,this.state.message)
            this.setState({
                message : ""
            });
        }
    }

    membersModalToggle(){
        this.setState({
            membersModalHidden : !this.state.membersModalHidden
        },() => {
            if(!this.state.membersModalHidden){
                if(this.state && this.state.token && this.state.chatroomSlug){
                    this.props.fetchMembers(this.state.token,this.state.chatroomSlug);
                }
            }
        });
    }

  render() {
    if(!this.state.token || this.state.loading){
        return (
            <MyActivityIndicator message={"Fetching Messages...."} />
        );
    }else{

        return (
            <View style={styles.container}>
                <MyStatusBar />
                {
                    this.state.chatroomName &&
                    <Header backFunction={() => {
                        this.props.navigation.dispatch(NavigationActions.back())
                    }}
                    title={this.state.chatroomName} settings={this.settings()}/>
                }
                {
                    !this.state.chatroomName &&
                    <Header title={"Chatroom"} settings={this.errorSettings()}/>
                }{
                    this.state.members &&
                    <MyModal
                        contentView={this.membersView()}
                        title={"Members"}
                        hidden={this.state.membersModalHidden}
                        toggleFunction={this.membersModalToggle.bind(this)}
                    />
                }
                <View style={{marginTop:75,flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
                    {
                        this.state.error &&
                        <View style={{flex:1,alignItems:'center',justifyContent:'center'}} >
                            <ErrorMessage message={this.state.error} />
                        </View>
                    }
                        <View style={[  this.state.error && {flex:7},
                                        !this.state.error && {flex:8},
                                        {alignSelf:'flex-start'}
                                    ]}>
                            <ListView
                                style={{width:window.width}}
                                dataSource = {this.state.messagesDataSource}
                                renderRow = {this.renderRow.bind(this)}
                                enableEmptySections
                            />
                        </View>
                        <View style={{flex:1,alignSelf:'flex-start'}}>
                            <SendMessage
                                    message={this.state.message}
                                    onMessageChange={this.onMessageChange.bind(this)}
                                    sendMessage={this.sendMessage.bind(this)}
                            />
                        </View>
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
  message : {
    padding:10,
    margin:5,
    borderRadius:10,
    borderWidth:2,
    borderColor:'#2b7abc'
  },
  messageSender :{
    fontWeight: 'bold'
  }
});

function mapStateToProps(state){
  return {
    chatroom : state.chatroom
  };
}


function mapDispatchToProps(dispatch){
    return bindActionCreators({
                loadMessages : chatroomActions.loadMessages,
                sendMessage : chatroomActions.sendMessage,
                fetchMembers : chatroomActions.fetchMembers
            },dispatch);
}

AppRegistry.registerComponent('Chatroom', () => Chatroom);

export default connect(mapStateToProps,mapDispatchToProps)(Chatroom)
