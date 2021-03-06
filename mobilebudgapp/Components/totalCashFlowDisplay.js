import React, { Component } from "react";
import { ActivityIndicator, View } from 'react-native';
import { Container, Header, Content, Card, CardItem, Text, Body } from "native-base";
import style from "../Styles/Styles";

function TotalCashFlowDisplay (props) {
    return (
        <Content padder>
          <View style={{ flex: 1, alignSelf: 'stretch', flexDirection: 'row' }}>
                  <View style={{ flex: 1, alignSelf: 'stretch' }}>
                  {
                  props.showSpinner 
                    ?
                  <ActivityIndicator style={{ opacity: props.spinnerOpacity }} animating={props.showSpinner} size={props.spinnerSize} color="#40DBCE"/>
                    : 
                  <Text style={{fontSize: 30, fontFamily: 'Laila-SemiBold', textAlign: 'center'}}> ${props.currentTotalIncome.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} </Text>
                  }
                  </View>
          </View>
          <View style={{ flex: 1, alignSelf: 'stretch', flexDirection: 'row' }}>
                  <View style={{ flex: 1, alignSelf: 'stretch' }}> 
                  {props.switcherClicked
                  ?
                    <Text style={{fontSize: 12, fontFamily: 'Laila-SemiBold', textAlign: 'center'}}> remaining after planning </Text>
                  :
                    <Text style={{fontSize: 12, fontFamily: 'Laila-Medium', textAlign: 'center'}}> of total income this month </Text>
                  }
                  </View>
          </View>
        </Content>
    );
  }

  export default TotalCashFlowDisplay;