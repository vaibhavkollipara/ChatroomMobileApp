import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Dimensions
} from 'react-native';

const window = Dimensions.get("window")

export default class Login extends Component {

    static navigationOptions = {
    title: 'Chatroom',
    header:null
  }

    pressed(){
        this.props.navigation.navigate('Signup',{});
    }
  render() {
    return (
        <View style={styles.container}>
                <Text style={styles.title}>ChatRoom</Text>
                <TextInput
                    style={styles.inputbox}
                    onChangeText={(text) => {}}
                    placeholder={"username"}
                    autoFocus={true}
                    underlineColorAndroid='transparent'
                />
                <TextInput
                    style={styles.inputbox}
                    onChangeText={(text) => {}}
                    placeholder="password"
                    underlineColorAndroid='transparent'
                    secureTextEntry={true}
                />
            <TouchableOpacity onPress={() => {}}>
                <Text style={styles.button}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {this.pressed()}}>
                <Text style={styles.link}>Sign Up</Text>
            </TouchableOpacity>
            <View style={styles.footer}>
                <Text style={{fontWeight: 'bold'}}>© Vaibhav Kollipara</Text>
            </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:'column',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent:'center',
    borderRadius:20
  },
  title:{
    fontSize:60,
    color:'steelblue',
    fontWeight:'bold',
    textShadowColor:'black',
    textShadowOffset :{width: 2, height: 2},
    textShadowRadius : 5,
    fontFamily : 'Bungee-Regular'
  },
  inputbox:{
    width : window.width * 0.75,
    borderColor: 'gray',
    borderWidth: 1,
    backgroundColor: 'white',
    textAlign:'center',
    borderRadius : 10,
    margin: 10
  },
  link : {
    padding:20,
    fontWeight: 'bold',
    textDecorationLine:'underline'
  },
  footer :{
    position:'absolute',
    bottom: 10,
    alignItems: 'center'
  },
  button:{
    padding:20,
    fontWeight : 'bold',
    width : window.width * 0.5,
    borderRadius: 15,
    backgroundColor : 'steelblue',
    margin : 10,
    color:'white',
    textAlign:'center'
  }
});

AppRegistry.registerComponent('Login', () => Login);
