import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import {Provider} from 'react-redux';

import {StackNavigator} from 'react-navigation';

import store from '../store';

import Login from './Login';
import Signup from './Signup'
import Home from './Home'


const AppNav = StackNavigator({


  Home : {screen: Home},
  Login : { screen: Login},
  Signup : { screen: Signup }
});

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppNav />
      </Provider>
    );
  }
}

const styles = StyleSheet.create({

});

AppRegistry.registerComponent('App', () => App);
