import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions
} from 'react-native';


const window = Dimensions.get("window");

export default class ErrorMessage extends Component {

    getErrorContent(errors){
        if(Array.isArray(errors)){
            let i=1;
            return errors.map((error) => <Text key={i++} style={styles.errorText} >{error}</Text>);
        }else{
            return <Text style={styles.errorText}>{errors}</Text>
        }
    }

    getErrorMessages(){
        console.log(this.props.message);
        return Object.entries(this.props.message).map(([key, value]) => {
                                        console.log(`Key : ${key}, Value: ${value}`);
                                        return (
                                            <View key={key}>
                                                {this.getErrorContent(value)}
                                            </View>
                                        );
                                });
    }

  render() {

    return (
        <View>
            {this.getErrorMessages()}
        </View>
    );
  }
}

const styles = StyleSheet.create({

    errorTitle:{
        color:'red',
        fontWeight:'bold',
        fontSize:20,
    },
    errorText:{
        color:'red'
    }
});
