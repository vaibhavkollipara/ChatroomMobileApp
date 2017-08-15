import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';


export default class ErrorMessage extends Component {

  static defaultProps = {
      width : null
  }

  render() {
    return (
        <TouchableOpacity onPress={() => this.props.onClick()}>
          <Text style={[{width:this.props.width}, styles.button]}>{this.props.buttonText}</Text>
        </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  button:{
    padding:20,
    fontWeight : 'bold',
    borderRadius: 15,
    backgroundColor : 'steelblue',
    margin : 10,
    color:'white',
    textAlign:'center',
    borderWidth:2,
    borderColor: 'white'
  }
});
