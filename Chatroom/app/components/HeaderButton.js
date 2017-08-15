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

import MyModal from './MyModal';

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

    settingsView(){
        return (
                <ListView
                        dataSource = {this.state.settingsDataSource}
                        renderRow = {this.renderRow.bind(this)}
                />
        );
    }

  render() {
    return (
            <View>
                <TouchableOpacity  onPress={this.toggleSettings.bind(this)}>
                    <Text style={styles.buttonText}>settings</Text>
                </TouchableOpacity>
                <MyModal
                          title={"Settings"}
                          hidden={this.state.hidden}
                          contentView={this.settingsView()}
                          toggleFunction={this.toggleSettings.bind(this)}
                        />
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
  }
});
