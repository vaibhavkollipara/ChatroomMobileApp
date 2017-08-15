import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Dimensions
} from 'react-native';

import MyModal from './MyModal';
import MyButton from './MyButton';
import ErrorMessage from './ErrorMessage';
import MyActivityIndicator from './MyActivityIndicator';
import {baseUrl} from '../actions/baseurl';


const window = Dimensions.get("window");

export default class NewChatroomModal extends Component {

  static defaultProps = {
      width : null,
      token: null
  }

    constructor(){
        super();
        this.state = {
            loading: false,
            chatroomName : "",
            error : null
        }
    }

    onChatroomNameChange(value){
        this.setState({
            chatroomName : value
        });
    }



  newChatroomView(){

        if(this.state.loading){
            return (
                <MyActivityIndicator
                    message={"Creating New Chatroom"}
                />
            );
        }else{
            return ( <View style={{flex:1,alignItems:'center',justifyContent:'center'}} >
                            <TextInput
                                        style={styles.inputbox}
                                        placeholder="New Chatroom Name"
                                        onChangeText={(text) => {this.onChatroomNameChange(text)}}
                                        value={this.state.chatroomName}
                                        underlineColorAndroid='transparent'
                                  />
                            {
                                this.state.error && <ErrorMessage message={this.state.error}/>
                            }
                            <MyButton   onClick={this.createChatroom.bind(this)}
                                        buttonText={"Create"}
                                        width={window.width*0.5}
                                      />
                    </View>
                );
        }
    }

    createChatroom(){
        if(this.state.chatroomName){
        fetch(baseUrl+ "/newchatroom/",{
                method : 'post',
                body : JSON.stringify({ name : this.state.chatroomName }),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `JWT ${this.props.token}`
                  }
            }).then((response) =>{
                if(response.status==201){
                    this.setState({
                        loading:false
                    });
                    alert("New Chatroom Created");
                    this.props.toggleFunction();
                }else{
                    response.json().then((response) => {
                        console.log("NCR ERROR.....");
                        console.log(response);
                        this.setState({
                            loading: false,
                            error : response
                        });
                    });
                }

            }).catch((error) =>{
                this.setState({
                    loading : false,
                    error : {error : error.toString()}
                });
            });
        }else{
            this.setState({
                error : {error : "Chatroom Name Cannot Be Empty"}
            });
        }
    }

  render() {
    return (
                    <MyModal
                            hidden={this.props.hidden}
                            title={"New Chatroom"}
                            contentView={this.newChatroomView()}
                            toggleFunction={this.props.toggleFunction.bind(this)}
                        />
    );
  }
}

const styles = StyleSheet.create({
  inputbox:{
    width : window.width *0.65,
    borderColor: 'gray',
    borderWidth: 1,
    backgroundColor: 'white',
    textAlign:'center',
    borderRadius : 10,
    margin: 10
  }
});
