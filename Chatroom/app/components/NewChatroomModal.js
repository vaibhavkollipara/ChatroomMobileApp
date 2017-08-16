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


  newChatroomView(){
            return ( <View style={{flex:1,alignItems:'center',justifyContent:'center'}} >
                            <TextInput
                                        style={styles.inputbox}
                                        placeholder="New Chatroom Name"
                                        onChangeText={(text) => {this.props.onNewChatroomNameChange(text)}}
                                        value={this.props.newChatroomName}
                                        underlineColorAndroid='transparent'
                                  />
                            <MyButton   onClick={this.props.createChatroom.bind(this)}
                                        buttonText={"Create"}
                                        width={window.width*0.5}
                                      />
                    </View>
                );
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
