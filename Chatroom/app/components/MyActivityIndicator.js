import React, { Component } from 'react';
import {
  View,
  Text,
  ActivityIndicator
} from 'react-native';


export default class MyActivityIndicator extends Component {
  render() {
    return (
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}} >
            <ActivityIndicator size={"large"} />
            <Text>{this.props.message}</Text>
        </View>    );
  }
}
