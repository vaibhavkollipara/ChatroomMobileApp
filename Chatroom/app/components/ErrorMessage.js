import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';


export default class ErrorMessage extends Component {
  render() {
    return (
        <Text style={styles.textStyle}>{this.props.message}</Text>
    );
  }
}

const styles = StyleSheet.create({
  textStyle: {
    color: 'red',
    fontWeight: 'bold'
  }
});
