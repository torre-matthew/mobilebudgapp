import React, { Component } from "react";
import { View } from 'react-native';
import { Container, Header, Content, Card, CardItem, Text, Body } from "native-base";
import PlannedBillDisplay from './plannedBillDisplay';
import style from "../Styles/Styles";

function PlannedBillWrapper (props) {
  return (
      <Content padder style={style.unplanned_section}>
        <View> 
          <Text style={style.secondary_header}> Planned Bills and Expenses </Text>
        </View>
        <PlannedBillDisplay />
        <PlannedBillDisplay />
      </Content>
  );
  }

  export default PlannedBillWrapper;