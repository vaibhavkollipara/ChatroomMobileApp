import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import {Provider} from 'react-redux';

import {StackNavigator} from 'react-navigation';

import Login from './Login';
import Signup from './Signup'
import store from '../store';

const AppNav = StackNavigator({

  Signup : { screen: Signup },
  Login : { screen: Login}
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
