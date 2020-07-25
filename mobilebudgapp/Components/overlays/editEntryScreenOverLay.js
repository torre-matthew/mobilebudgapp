import React, { Component} from "react";
import { View, StyleSheet, TouchableOpacity, Picker, Text } from 'react-native';

const qadStyle = StyleSheet.create({

container_hide: {
  position: 'absolute',
  zIndex: 0,
  opacity: 0, 
  width: '0%', 
  height: '0%', 
  alignSelf: 'flex-end',
  marginTop: '15%',
  marginRight: 0, 
  backgroundColor: 'black',
  borderBottomLeftRadius: 0, 
  borderBottomRightRadius: 0
},
container_show: {
  position: 'absolute',
  zIndex: 1,
  opacity: 0.6, 
  width: '100%', 
  height: '100%', 
  alignSelf: 'flex-end',
  marginTop: '5%',
  marginRight: 10, 
  backgroundColor: 'black',
  borderBottomLeftRadius: 10, 
  borderBottomRightRadius: 10
},

})

class EditEntryScreenOverLay extends Component {

  state = {
  }


  render(){
      return (
        <View style={this.props.show ? qadStyle.container_show : qadStyle.container_hide} onTouchEnd={() => {this.props.hideDrawerAndOverLay()}} />
      );
    }
  }

  export default EditEntryScreenOverLay;