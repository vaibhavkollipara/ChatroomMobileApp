import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Dimensions
} from 'react-native';

import MyButton from './MyButton';
import ErrorMessage from './ErrorMessage';

const window = Dimensions.get("window");

export default class SendMessage extends Component{


    render(){
        return (
            <View style={styles.container}>
                <View style={styles.inputBoxContainer}>
                    <TextInput
                        style={styles.inputbox}
                        placeholder="Type message..."
                        onChangeText={(text) => {this.props.onMessageChange(text)}}
                        value={this.props.message}
                        underlineColorAndroid='transparent'
                    >

                    </TextInput>
                </View>
                <View style={styles.sendButtonContainer}>
                    <TouchableOpacity   onPress={this.props.sendMessage.bind(this)}>
                        <Text style={styles.button}>Send</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles= StyleSheet.create({
    container :{
        flex:1,
        flexDirection:'row',
        alignSelf:'flex-start'
    },
    inputBoxContainer: {
        flex:8,
        alignItems:'center',
        justifyContent:'center'
    },
    sendButtonContainer:{
        flex:2,
        alignItems:'center',
        justifyContent : 'center',
    },
    inputbox:{
        borderColor: 'gray',
        borderWidth: 1,
        backgroundColor: 'white',
        textAlign:'center',
        borderRadius : 10,
        height:50,
        width: window.width*0.75
    },
    button:{
        borderRadius:10,
        textAlign:'center',
        color:'white',
        fontWeight:'bold',
        backgroundColor:'steelblue',
        padding:15
    }
});
