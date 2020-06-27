import React, { Component} from "react";
import { View, StyleSheet, TouchableOpacity, Picker, Text } from 'react-native';
import BackGroundImage from "../Styles/images/turquise indigo gradient.png";
import style from "../Styles/Styles";

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
  opacity: 0.5, 
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

class OverLay extends Component {

  state = {
  }



  componentDidMount() {
  }

  render(){
      return (
        <View style={this.props.show ? qadStyle.container_show : qadStyle.container_hide} onTouchEnd={this.props.hideDrawerAndOverLay} />
      );
    }
  }

  export default OverLay;