import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Dimensions,
  AsyncStorage
} from 'react-native';
import { NavigationActions } from 'react-navigation'
import { bindActionCreators } from 'redux';
import { connect }  from 'react-redux';

import * as loginActions from '../actions/LoginActions';

import ErrorMessage from '../components/ErrorMessage';
import MyActivityIndicator from '../components/MyActivityIndicator';
import MyStatusBar from '../components/MyStatusBar';

const window = Dimensions.get("window")

class Login extends Component {

    static navigationOptions = {
    title: 'Chatroom',
    header:null
  }

    constructor(){
        super();
        this.state = {
            token  : null,
            error : null,
            loading : false,
            form_data : {
                username : "",
                password : ""
            }
        };
    }

    navigateToHome(){
        const resetAction = NavigationActions.reset({
              index: 0,
              actions: [
                NavigationActions.navigate({ routeName: 'Home'})
              ]
            })
        this.props.navigation.dispatch(resetAction);
    }

    componentWillReceiveProps(nextProps) {
          if (nextProps.login !== this.props.login) {
            this.setState({
                token : nextProps.login.token,
                error : nextProps.login.error,
                loading : nextProps.login.loading
            });
          }
          if(nextProps.login.token!==null){
            AsyncStorage.setItem("token",nextProps.login.token).then(() => {
                this.navigateToHome();
            });
        }
    }

    usernameChange(value){
        console.log(`Value : ${value}`);
        this.setState({
            form_data : {...this.state.form_data,username:value}
        });
        console.log(` form value : ${this.state.form_data.username}`);
    }

    passwordChange(value){
        this.setState({
            form_data : {...this.state.form_data,password:value}
        });
        console.log(this.state.form_data.password);
    }

    isFormFilled(){
        for(let key in this.state.form_data){
            if(this.state.form_data[key] === "" || this.state.form_data[key] === null)
                return false;
        }
        return true;
    }

    loginClick(){
        if(!this.isFormFilled()){
            this.setState({
                error : {error : ["All fields Required"]}
            });
        }else{
            this.props.authenticate(this.state.form_data)
        }

    }

  render() {
    if(this.state.loading){
        return (
            <View>
                <MyStatusBar />
                <MyActivityIndicator message={"Verifying Credentials"}/>
            </View>
        );
    }else{
    return (
        <View style={styles.container}>
                <MyStatusBar />
                <Text style={styles.title}>ChatRoom</Text>
                <TextInput
                    style={styles.inputbox}
                    placeholder={"username"}
                    autoFocus={true}
                    onChangeText={(text) => {this.usernameChange(text)}}
                    value={this.state.form_data.username}
                    underlineColorAndroid='transparent'
                />
                <TextInput
                    style={styles.inputbox}
                    onChangeText={(text) => {}}
                    placeholder="password"
                    onChangeText={(text) => {this.passwordChange(text)}}
                    value={this.state.form_data.password}
                    underlineColorAndroid='transparent'
                    secureTextEntry={true}
                />
            {
                this.state.error && <ErrorMessage message={this.state.error} />
            }
            <TouchableOpacity onPress={() => {this.loginClick()}}>
                <Text style={styles.button}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {this.props.navigation.navigate('Signup',{});}}>
                <Text style={styles.link}>Sign Up</Text>
            </TouchableOpacity>
            <View style={styles.footer}>
                <Text style={{fontWeight: 'bold'}}>© Vaibhav Kollipara</Text>
            </View>
        </View>
    );
    }
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

function mapStateToProps(state){
  return {
    login : state.login
  };
}


function mapDispatchToProps(dispatch){
    return bindActionCreators({
                authenticate : loginActions.authenticate
            },dispatch);
}

AppRegistry.registerComponent('Login', () => Login);

export default connect(mapStateToProps,mapDispatchToProps)(Login);
