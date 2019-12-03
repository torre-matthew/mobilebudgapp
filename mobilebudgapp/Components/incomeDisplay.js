import React, { Component } from "react";
import { View } from 'react-native';
import { Container, Header, Content, Card, CardItem, Text, Body } from "native-base";
import style from "../Styles/Styles";

function IncomeDisplay (props) {
    return (
        <Content>
            <View>
              <View style={{ flex: 1, alignSelf: 'stretch', flexDirection: 'row', marginTop: 10 }}>
                <View style={{ flex: 1, alignSelf: 'flex-start', backgroundColor: '#F6F6EE', flexGrow: 3, paddingLeft: 5, paddingTop: 15, paddingBottom: 15, borderTopLeftRadius: 15 }}> 
                  <Text style={{fontSize: 18 }}> {props.incomeName} </Text>
                </View>
                <View style={{ flex: 1, alignItems:'center', backgroundColor: '#F6F6EE', flexGrow: 1, paddingTop: 15, paddingBottom: 15, borderTopRightRadius: 15 }}> 
                  <Text style={{fontSize: 18 }}> ${props.incomeAmount} </Text>
                </View>
              </View>
              <View style={{ flex: 1, alignSelf: 'stretch', flexDirection: 'row', backgroundColor: '#CECECE', borderBottomLeftRadius: 15, borderBottomRightRadius: 15 }}>
                <View style={{ flex: 1, alignSelf: 'stretch', flexGrow: 3, paddingTop: 1, paddingBottom: 5, paddingLeft: 5,}}> 
                  <Text style={{fontSize: 12 }}> Date: {props.incomeDate} </Text>
                </View>
              </View>
            </View>
        </Content>
    );
  }

  export default IncomeDisplay;