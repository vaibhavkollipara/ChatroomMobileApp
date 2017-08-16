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
    title : "",
    settings : null,
    backFunction : null
  }

  displayTitle(){
    if(this.props.title.length<=15){
        return this.props.title.toUpperCase();
    }else{
        return `${this.props.title.substring(0,9)}...`.toUpperCase();
    }
  }

  render() {
      return (
          <View style={styles.container} elevation={5}>
            {
                this.props.backFunction &&
                <View style={{flex:1,alignItems:'flex-start',justifyContent:'center'}}>
                    <TouchableOpacity onPress={this.props.backFunction.bind(this)}>
                        <Text style={{marginLeft:10,fontWeight:'bold',color:'white'}}>Back</Text>
                    </TouchableOpacity>
                </View>
            }
              <View style={[
                    this.props.backFunction && {flex:2},
                    !this.props.backFunction && {flex:3},
                    styles.titleBox,

                ]}>
                  <Text style={styles.title}>{this.displayTitle()}</Text>
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
    alignItems:'flex-end',
    marginRight:5,
    justifyContent: 'center',
    overflow:'visible'
  }
});
