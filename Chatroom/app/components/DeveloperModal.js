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


  DeveloperDetailsView(){
            return ( <View style={{flex:1,alignItems:'center',justifyContent:'center',backgroundColor:'white',borderRadius:10,padding:20}} >
                    <Text style={[styles.baseStyle],{fontSize:25}}>Vaibhav Kollipara</Text>
                    <Text style={styles.baseStyle}>vkollip1@binghamton.edu</Text>
                    <Text style={styles.baseStyle}>(660)528-5433</Text>
                    </View>
                );
    }

  render() {
    return (
                    <MyModal
                            hidden={this.props.hidden}
                            title={"Developer Details"}
                            contentView={this.DeveloperDetailsView()}
                            toggleFunction={this.props.toggleFunction.bind(this)}
                        />
    );
  }
}

const styles = StyleSheet.create({

  baseStyle:{
    fontWeight:'bold',
    textAlign:'center',
    fontSize : 15
  }
});
