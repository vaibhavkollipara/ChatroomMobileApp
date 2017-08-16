import React, { Component } from 'react';
import {
  Text,
  View,
  Dimensions
} from 'react-native';

import MyModal from './MyModal';


const window = Dimensions.get("window");

export default class ViewMembersModal extends Component {

    constructor(){
        super();
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state ={
            membersDataSource : ds
        }

        this.setState({
              membersDataSource : this.state.membersDataSource.cloneWithRows(this.props.members)
          });
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.members !== nextProps.members){
            this.setState({
              membersDataSource : this.state.membersDataSource.cloneWithRows(nextProps.members)
          });
        }
    }

    renderRow(member,sectionId, rowId, highlightId){
        return (
            <View style={{width:window.width/4,borderWidth:2,borderColor:'steelblue',borderRadius:10,margin:10}}>
                <Text>{member.name}</Text>
                <Text>{member.email}</Text>
            </View>
        );
    }


  membersView(){

            return ( <View style={{flex:1,alignItems:'center',justifyContent:'center'}} >
                            <ListView
                                dataSource = {this.state.membersDataSource}
                                renderRow = {this.renderRow.bind(this)}
                                enableEmptySections
                            />
                    </View>
                );
    }


  render() {
    return (
                    <MyModal
                            hidden={this.props.hidden}
                            title={"Members"}
                            contentView={this.membersView()}
                            toggleFunction={this.props.toggleFunction.bind(this)}
                        />
    );
  }
}
