/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import App from './app/containers/App';

export default class Chatroom extends Component {
  render() {
    return (
        <View style={styles.container}>
          <App />
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#a6d1fc'
  }
});

AppRegistry.registerComponent('Chatroom', () => Chatroom);
