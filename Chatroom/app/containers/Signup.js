import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Dimensions,
  ScrollView
} from 'react-native';

import { bindActionCreators } from 'redux';
import { connect }  from 'react-redux';

import * as signupActions from '../actions/SignupActions';

import ErrorMessage from '../components/ErrorMessage';
import MyActivityIndicator from '../components/MyActivityIndicator';
import MyStatusBar from '../components/MyStatusBar';


const window = Dimensions.get("window");

class Signup extends Component {

  static navigationOptions = {
    title: 'Chatroom',
    header : null
  }

  constructor(){
    super();
    this.state = {
        status : false,
        error : null,
        loading : false,
        form_data :{    first_name: "",
                        last_name: "" ,
                        email: "",
                        username: "",
                        password: ""
                    },
        confirm_password : ""
    }
  }

    componentWillReceiveProps(nextProps) {
          if (nextProps.signup !== this.props.signup) {
            this.setState({
                status : nextProps.signup.status,
                error : nextProps.signup.error,
                loading : nextProps.signup.loading
            });
          }
    }

    pressed(){
        this.props.navigation.navigate('Login',{});
    }

    signupClick(){
        if(!this.isFormFilled()){
            this.setState({
                error : { error : "All fields required"}
            });
        }else if(!this.didPasswordsMatch()){
            this.setState({
                error : { error : "Passwords did not match"}
            });
        }else{
            this.setState({
                error : null
            });
            this.props.register(this.state.form_data);
        }
    }

    firstNameChange(value){
        this.setState({
            form_data : {...this.state.form_data,first_name:value}
        });
    }

    lastNameChange(value){
        this.setState({
            form_data : {...this.state.form_data,last_name:value}
        });
    }

    usernameChange(value){
        this.setState({
            form_data : {...this.state.form_data,username:value}
        });
    }

    emailChange(value){
        this.setState({
            form_data : {...this.state.form_data,email:value}
        });
    }

    passwordChange(value){
        this.setState({
            form_data : {...this.state.form_data,password:value}
        });
    }

    confirmpasswordChange(value){
        this.setState({
            confirm_password : value
        });
    }

    didPasswordsMatch(){
        return this.state.confirm_password === this.state.form_data.password
    }

    isFormFilled(){
        for(let key in this.state.form_data){
            if(this.state.form_data[key] === "" || this.state.form_data[key] === null)
                return false;
        }
        return true;
    }

  render() {

    if(this.state.loading){
        return(
            <View>
                <MyStatusBar />
                <MyActivityIndicator message={"Signing Up"}/>
            </View>
        );
    }else if(this.state.status){
        return(
                <View style={{flex:1,justifyContent:'center',alignItems:'center'}} >
                    <MyStatusBar />
                    <Text style={styles.title}>ChatRoom</Text>
                    <Text style={styles.successText}>Signup Successful</Text>
                    <TouchableOpacity onPress={() => {this.pressed()}}>
                        <Text style={styles.link} >Login</Text>
                    </TouchableOpacity>
                </View>
        );
    }else{

            return (
                <View style={styles.container}>
                <MyStatusBar />
                <ScrollView
                    style={styles.container}
                    contentContainerStyle={{
                                            justifyContent: 'center',
                                            alignItems: 'center'
                                        }}
                >
                    <Text style={styles.title}>ChatRoom</Text>
                        <TextInput
                            style={styles.inputbox}
                            placeholder={"First Name"}
                            autoFocus={true}
                            onChangeText={(text) => {this.firstNameChange(text)}}
                            value={this.state.form_data.first_name}
                            underlineColorAndroid='transparent'
                        />
                        <TextInput
                            style={styles.inputbox}
                            placeholder={"Last Name"}
                            onChangeText={(text) => {this.lastNameChange(text)}}
                            value={this.state.form_data.last_name}
                            underlineColorAndroid='transparent'
                        />
                        <TextInput
                            style={styles.inputbox}
                            placeholder={"email"}
                            onChangeText={(text) => {this.emailChange(text)}}
                            value={this.state.form_data.email}
                            underlineColorAndroid='transparent'
                        />
                        <TextInput
                            style={styles.inputbox}
                            placeholder={"username"}
                            onChangeText={(text) => {this.usernameChange(text)}}
                            value={this.state.form_data.username}
                            underlineColorAndroid='transparent'
                        />
                        <TextInput
                            style={styles.inputbox}
                            placeholder="password"
                            onChangeText={(text) => {this.passwordChange(text)}}
                            value={this.state.form_data.password}
                            underlineColorAndroid='transparent'
                            secureTextEntry={true}
                        />
                        <TextInput
                            style={styles.inputbox}
                            placeholder="confirm password"
                            onChangeText={(text) => {this.confirmpasswordChange(text)}}
                            value={this.state.confirm_password}
                            underlineColorAndroid='transparent'
                            secureTextEntry={true}
                        />
                        {
                            this.state.error && <ErrorMessage message={JSON.stringify(this.state.error)} />
                        }
                        <TouchableOpacity onPress={() => {this.signupClick()}}>
                          <Text style={styles.button}>Sign Up</Text>
                        </TouchableOpacity>
                    <TouchableOpacity onPress={() => {this.pressed()}}>
                        <Text style={styles.link} >Login</Text>
                    </TouchableOpacity>
                </ScrollView>
                </View>
            );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:'column',
    alignContent:'center',
    borderRadius:20
  },
  title:{
    fontSize:60,
    color:'steelblue',
    fontWeight:'bold',
    textShadowColor:'black',
    textShadowOffset :{width: 2, height: 2},
    textShadowRadius : 5
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
  button:{
    padding:20,
    fontWeight : 'bold',
    width : window.width * 0.5,
    borderRadius: 15,
    backgroundColor : 'steelblue',
    margin : 10,
    color:'white',
    textAlign:'center'
  },
  errorText:{
    color: 'red',
    fontWeight: 'bold'
  },
  successText:{
    color:'green',
    fontWeight: 'bold',
    fontSize:20
  }
});



function mapStateToProps(state){
  return {
    signup : state.signup
  };
}


function mapDispatchToProps(dispatch){
    return bindActionCreators({
                register : signupActions.register
            },dispatch);
}

AppRegistry.registerComponent('Signup', () => Signup);

export default connect(mapStateToProps,mapDispatchToProps)(Signup);
