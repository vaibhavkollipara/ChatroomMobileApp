import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions
} from 'react-native';

import HeaderButton from './HeaderButton';

const window = Dimensions.get("window");

export default class Header extends Component {

  static defaultProps = {
    title : "Home",
    settings : null
  }

  render() {
    return (
        <View style={styles.container} elevation={5}>
            <View style={styles.titleBox}>
                <Text style={styles.title}>{this.props.title}</Text>
            </View>
            {   this.props.settings &&
                <View style={styles.action}>
                    <HeaderButton settings={this.props.settings} />
                </View>
            }

        </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    position:'absolute',
    top:0,
    backgroundColor:'steelblue',
    flexDirection :'row'
  },
  titleBox :{
    flex:3,
    alignItems:'flex-start',
    justifyContent: 'center',
    padding : 20
  },
  title:{
    fontSize:20,
    fontWeight : 'bold',
    color:'white'
  },
  action :{
    flex:1,
    alignItems:'flex-start',
    justifyContent: 'center',
    overflow:'visible'
  }
});
