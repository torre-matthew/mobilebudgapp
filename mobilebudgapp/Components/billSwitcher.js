import React, { Component } from "react";
import { View } from 'react-native';
import { Container, Header, Content, Card, CardItem, Text, Body } from "native-base";
import style from "../Styles/Styles";
import ApiMethods from '../utilities/apiMethods';

class BillSwitcher extends Component {

    state = {
        switcherClicked: false,
        plannedSwitherStyle: style.bill_switcher_clicked,
        unplannedSwitherStyle: style.bill_switcher
    };

    clickingBillSwithcer = (clicked, activeSwitcher, inactiveSwitcher) => {

        this.setState({
          switcherClicked: clicked,
          [activeSwitcher]: style.bill_switcher_clicked,
          [inactiveSwitcher]: style.bill_switcher      
        });
      };

render() {
    return (
        <Content padder>
            <View style={{ flex: 1, alignSelf: 'stretch', flexDirection: 'row' }}>
                <View onTouchEnd={() => {this.props.switcherLogic('planned'); this.clickingBillSwithcer(true, 'plannedSwitherStyle', 'unplannedSwitherStyle')}} style={this.state.plannedSwitherStyle}> 
                    <Text style={{ textAlign: 'center', fontSize: 15, fontFamily: 'Laila-SemiBold', color: this.state.plannedSwitherStyle.color }}> Not yet planned </Text>
                </View>
                <View onTouchEnd={() => {this.props.switcherLogic('unplanned'); this.clickingBillSwithcer(true, 'unplannedSwitherStyle', 'plannedSwitherStyle');}} style={this.state.unplannedSwitherStyle}>
                    <Text style={{ textAlign: 'center', fontSize: 15, fontFamily: 'Laila-SemiBold', color: this.state.unplannedSwitherStyle.color }}> Planned </Text>
                </View>
            </View>
        </Content>
    );
  }
}

  export default BillSwitcher;