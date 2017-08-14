import React, { Component } from 'react';
import {
  StatusBar
} from 'react-native';

import HeaderButton from './HeaderButton';


export default class MyStatusBar extends Component {

    componentDidMount(){
    }

  render() {
    return (
        <StatusBar
                    backgroundColor="#2b7abc"
                    barStyle="light-content"
                  />
    );
  }
}
