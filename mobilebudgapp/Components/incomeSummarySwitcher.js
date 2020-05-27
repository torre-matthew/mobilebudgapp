import React, { Component } from "react";
import { View } from 'react-native';
import { Container, Header, Content, Card, CardItem, Text, Body } from "native-base";
import style from "../Styles/Styles";
import ApiMethods from '../utilities/apiMethods';

class IncomeSummarySwitcher extends Component {

    state = {
        switcherClicked: false,
        beforeSpendingSwitherStyle: style.summary_income_switcher_clicked,
        afterSpendingSwitherStyle: style.summary_income_switcher
    };

    clickingIncomeSummarySwithcer = (clicked, activeSwitcher, inactiveSwitcher) => {

        this.setState({
          switcherClicked: clicked,
          [activeSwitcher]: style.summary_income_switcher_clicked,
          [inactiveSwitcher]: style.summary_income_switcher      
        });
      };

render() {
    return (
        <Content padder>
            <View style={{ flex: 1, alignSelf: 'stretch', flexDirection: 'row' }}>
                <View onTouchStart={() => {this.props.switcherLogic('before')}} onTouchEnd={() => {this.clickingIncomeSummarySwithcer(true, 'beforeSpendingSwitherStyle', 'afterSpendingSwitherStyle')}} style={this.state.beforeSpendingSwitherStyle}> 
                    <Text style={{ textAlign: 'center', fontSize: 15 }}> Before Planning </Text>
                </View>
                <View onTouchStart={() => {this.props.switcherLogic('after')}} onTouchEnd={() => {this.clickingIncomeSummarySwithcer(true, 'afterSpendingSwitherStyle', 'beforeSpendingSwitherStyle');}} style={this.state.afterSpendingSwitherStyle}>
                    <Text style={{ textAlign: 'center', fontSize: 15 }}> After Planning </Text>
                </View>
            </View>
        </Content>
    );
  }
}

  export default IncomeSummarySwitcher;