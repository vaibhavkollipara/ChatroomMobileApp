import React, { Component } from 'react';
import {
    Modal,
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Dimensions
    } from 'react-native';

const window = Dimensions.get("window");

export default class MyModal extends Component {

    static defaultProps = {
        hidden : true,
        title : null,
        contentView : null
    }

    render(){
        return (
            <Modal
                  animationType={"fade"}
                  transparent={true}
                  visible={!this.props.hidden}
                  onRequestClose={this.props.toggleFunction.bind(this)}
                  >
                  <View style={styles.modalContainer}
                    elevation={10} >
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalHeaderText}>{this.props.title}</Text>
                        </View>
                        <View  style={styles.modalContentContainer}>
                            {this.props.contentView}
                      </View>
                      <View style={styles.modalFooter}>
                            <TouchableOpacity onPress={this.props.toggleFunction.bind(this)} >
                                <Text style={{color:'red',padding:10,paddingLeft:15,paddingRight:15,backgroundColor:'white',borderRadius:20,fontWeight:'bold',fontSize:20}}>X</Text>
                            </TouchableOpacity>
                        </View>
                  </View>
            </Modal>
        );
    }

}

const styles = StyleSheet.create({
    modalContainer :{
        flex:1,alignItems:'center',
        justifyContent:'center',
        margin:window.width*0.1,
        borderRadius:15,
        backgroundColor:'steelblue'
    },
    modalHeader:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    },
    modalHeaderText :{
        fontWeight:'bold',
        fontSize:25,color:
        'white'
    },
    modalContentContainer : {
        flex:3,
        alignItems:'center',
        justifyContent:'center'
    },
    modalFooter:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        overflow:'hidden'
    }
});
