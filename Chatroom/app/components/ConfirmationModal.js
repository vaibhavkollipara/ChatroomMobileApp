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
                            <Text style={styles.contentMessage}>{this.props.message}</Text>
                      </View>
                      <View style={styles.modalFooter}>
                            <TouchableOpacity style={{flex:1,padding:5}} onPress={this.props.toggleFunction.bind(this)}>
                            <View style={styles.footerbox}>
                                    <Text style={styles.buttonText}>Cancle</Text>
                            </View>
                            </TouchableOpacity>
                            <TouchableOpacity  style={{flex:1,padding:5}} onPress={() => {this.props.toggleFunction();
                                                            this.props.confirmAction(); }
                                                        }>
                            <View style={styles.footerbox}>
                                    <Text style={styles.buttonText}>Confirm</Text>
                            </View>
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
        flex:5,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor : 'white',
        borderWidth:15,
        borderColor:'steelblue',
        borderRadius:15
    },
    contentMessage:{
        fontWeight: 'bold',
        padding : 10,
        textAlign:'center'
    },
    modalFooter:{
        flex:1,
        alignItems:'center',
        justifyContent:'flex-end',
        flexDirection:'row'
    },
    footerbox :{
        flex:1,
        alignItems : 'center',
        justifyContent : 'center',
        padding:10,
        margin:1,
        backgroundColor:'steelblue',
        borderWidth:2,
        borderColor:'white',
        borderRadius : 10
    },
    buttonText : {
        fontWeight:'bold',
        color:'white'
    }
});
