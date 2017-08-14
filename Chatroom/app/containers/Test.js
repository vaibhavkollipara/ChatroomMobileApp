import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Dimensions
} from 'react-native';

import Header from '../components/Header';

export default class Test extends Component {

    static navigationOptions = {
        header : null
    }

    settings(){
        return [
            { name : 'Setting 1',
              action : () => {alert("Setting 1 Functionality...");}
            },
            { name : 'Setting 2',
              action : () => {alert("Setting 2 Functionality...");}
            },
            { name : 'Setting 3',
              action : () => {alert("Setting 3 Functionality...");}
            }
        ]
    }
  render() {

    return (
      <View style={styles.container}>
            <Header title={"Test"} settings={this.settings()}/>
            <Text>Test</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
    flex: 1,
    alignItems :'center',
    justifyContent: 'center'
  }
});

AppRegistry.registerComponent('Test', () => Test);
