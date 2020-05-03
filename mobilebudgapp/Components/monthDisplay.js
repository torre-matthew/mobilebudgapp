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
          <View>
              <View>
                <View onTouchEnd={() => {this.setModalVisible(true);}} style={{ flex: 1, alignSelf: 'stretch', flexDirection: 'row', marginTop: 10 }}>
                  <View style={{ flex: 1, alignSelf: 'flex-start', backgroundColor: '#DEF1F2', flexGrow: 3, paddingLeft: 5, paddingTop: 15, paddingBottom: 25, borderTopLeftRadius: 15 }}> 
                    <Text style={{fontSize: 18 }}> June 2020 </Text>
                  </View>
                  <View style={{ flex: 1, alignItems:'center', backgroundColor: '#DEF1F2', flexGrow: 1, paddingTop: 15, paddingBottom: 15, borderTopRightRadius: 15 }}> 
                    <Text style={{fontSize: 18 }}> $Amount </Text>
                    <Text style={{fontSize: 6 }}> Remaining </Text>
                  </View>
                </View>
                <View style={{ flex: 1, alignSelf: 'stretch', flexDirection: 'row', backgroundColor: '#F5F5F5', borderBottomLeftRadius: 15, borderBottomRightRadius: 15 }}>
                  <View style={{ flex: 1, alignSelf: 'stretch', flexGrow: 3, paddingTop: 1, paddingBottom: 5, paddingLeft: 5,}}> 
                    <Text style={{fontSize: 12 }}> Date: ### </Text>
                  </View>
                </View>
              </View>
          </View>
      );
    }
  }

  export default MonthDisplay;