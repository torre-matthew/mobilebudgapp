import React, { Component } from "react";
import { View, Modal, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Container, Header, Content, Card, CardItem, Text, Body } from "native-base";
import style from "../Styles/Styles";
import ApiMethods from '../utilities/apiMethods';


class MonthDisplay extends Component {
  state = {

  };

  componentDidMount() {

  }

  render () {  
    return (
          <View onTouchEnd={() => { this.props.closeModal(); this.props.selectNewMonth(this.props.month, this.props.monthID); }} style={{ flex: 1, alignSelf: 'center', flexDirection: 'row', marginTop: 10, marginBottom: 10 }}>
            <View style={{ flex: 1, alignSelf: 'center', backgroundColor: '#DEF1F2', flexGrow: 3, paddingLeft: 5, paddingTop: 15, paddingBottom: 25, borderTopLeftRadius: 15 }}> 
              <Text style={{fontSize: 18, textAlign: 'center'}}> {this.props.month + ' ' + this.props.year} </Text>
            </View>
          </View>
      );
    }
  }

  export default MonthDisplay;