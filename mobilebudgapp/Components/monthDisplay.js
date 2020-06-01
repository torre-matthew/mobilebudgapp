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
          <View onTouchEnd={() => { this.props.closeModal(); this.props.selectNewMonth(this.props.month, this.props.monthID); }} style={{ flex: 1, alignSelf: 'center', flexDirection: 'row', marginTop: 5, marginBottom: 5, width: '60%'}}>
            <View style={{ flex: 1, alignSelf: 'center', backgroundColor: '#F5F5F5', paddingLeft: 5, paddingTop: 5, paddingBottom: 5, borderRadius: 15, elevation: 5, borderWidth: 1, borderStyle: 'solid', borderColor: '#40DBCE'}}> 
              <Text style={{fontSize: 18, textAlign: 'center', fontFamily: 'Laila-SemiBold'}}> {this.props.month} </Text>
              <Text style={{fontSize: 12, textAlign: 'center', fontFamily: 'Laila-SemiBold'}}> {this.props.year} </Text>
            </View>
          </View>
      );
    }
  }

  export default MonthDisplay;