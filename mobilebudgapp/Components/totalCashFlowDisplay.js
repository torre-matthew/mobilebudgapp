import React, { Component } from "react";
import { View } from 'react-native';
import { Container, Header, Content, Card, CardItem, Text, Body } from "native-base";
import style from "../Styles/Styles";

function TotalCashFlowDisplay (props) {
    return (
        <Content padder>
          <View style={{ flex: 1, alignSelf: 'stretch', flexDirection: 'row' }}>
                  <View style={{ flex: 1, alignSelf: 'stretch' }}> 
                    <Text style={style.total}> Total Income </Text>
                  </View>
                  <View style={{ flex: 1, alignSelf: 'stretch' }}> 
                    <Text style={style.total}> ${props.currentTotalIncome} </Text>
                  </View>
          </View>
        </Content>
    );
  }

  export default TotalCashFlowDisplay;