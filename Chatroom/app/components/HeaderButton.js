import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ListView,
  Dimensions,
  Modal
} from 'react-native';

const window = Dimensions.get("window");

export default class HeaderButton extends Component {

constructor(){
        super();
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            settingsDataSource: ds,
            hidden : true
        };
  }

  componentDidMount(){
    this.setState({
              settingsDataSource : this.state.settingsDataSource.cloneWithRows(this.props.settings)
            });
  }

  renderRow(setting,sectionId, rowId, highlightId){
    return  (
                <TouchableOpacity onPress={() => {this.toggleSettings();setting.action();}}>
                    <Text style={styles.settingName}>{setting.name}</Text>
                </TouchableOpacity>
            );
  }

    toggleSettings(){
        this.setState({
            hidden : !this.state.hidden
        });
    }
  render() {
    return (
            <View>
                <TouchableOpacity  onPress={this.toggleSettings.bind(this)}>
                    <Text style={styles.buttonText}>settings</Text>
                </TouchableOpacity>
                {   !this.state.hidden &&

                        <Modal
                          animationType={"fade"}
                          transparent={true}
                          visible={!this.state.hidden}
                          onRequestClose={this.toggleSettings.bind(this)}
                          >
                            <View style={{flex:1,alignItems:'center',justifyContent:'center',margin:window.width*0.1,borderRadius:15,backgroundColor:'steelblue'}}
                            elevation={10}>
                                <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                                    <Text style={{fontWeight:'bold',fontSize:25,color:'white'}}>Settings</Text>
                                </View>
                                <View style={{flex:3,alignItems:'center',justifyContent:'center'}}>
                                    <ListView
                                            style={styles.settingsList}
                                            dataSource = {this.state.settingsDataSource}
                                            renderRow = {this.renderRow.bind(this)}
                                    />
                                </View>
                                <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                                    <TouchableOpacity onPress={() => {this.toggleSettings();}} >
                                        <Text style={{color:'red',padding:10,paddingLeft:15,paddingRight:15,backgroundColor:'white',borderRadius:20,fontWeight:'bold',fontSize:20}}>X</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </Modal>
                }
            </View>
    );
  }
}

const styles = StyleSheet.create({

    buttonText : {
    fontWeight:'bold',
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 10
  },
  settingName:{
    padding:10,
    margin:2,
    borderRadius:10,
    borderWidth : 2,
    borderColor:'black',
    width : window.width * 0.65,
    textAlign:'center',
    backgroundColor:'white'
  },
  settingsList : {

  }
});
