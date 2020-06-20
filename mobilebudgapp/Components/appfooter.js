import React, { Component } from 'react';
import { ImageBackground, Image, Text } from 'react-native';
import { Container, Header, Left, Body, Right, Title, View } from 'native-base';
import style from "../Styles/Styles";
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

const backgroundImage = require('../Styles/images/whiteWall.png');

class AppFooter extends Component {

  state = {
    loggedInUserImage: "",
    budgetClicked: "",
    spendingClicked: "",
    billsClicked: "",
    trendsClicked: ""
  }

  componentDidMount() {
    this.activeIconLogic(this.props.screen);
  }


  activeIconLogic = (whatsBeenClicked) => {
    switch (whatsBeenClicked) {
      case "budget":
        this.setState({
          budgetClicked: true,
          spendingClicked: false,
          billsClicked: false,
          trendsClicked: false
          });
        break;
      case "spending":
        this.setState({
          budgetClicked: false,
          spendingClicked: true,
          billsClicked: false,
          trendsClicked: false
          });
        break;
      case "bills":
        this.setState({
          budgetClicked: false,
          spendingClicked: false,
          billsClicked: true,
          trendsClicked: false
          });
        break;
      case "trends":
        this.setState({
          budgetClicked: false,
          spendingClicked: false,
          billsClicked: false,
          trendsClicked: true
          });
      }
  }


  // #2D2D2F - Charcoal
  // #4658A1 - blue
  render() {
    return (
      <Container style={{ minHeight: '8%', maxHeight: '8%', backgroundColor: '#448EB3'}}>
        <View style={{flex:1, flexDirection: 'row', paddingTop: 12}}>
          <View onTouchEnd={() => {this.props.navigation.navigate('Main')}} style={{flex:1, alignItems: 'center', opacity: this.state.budgetClicked ? 1.0 : 0.7}}>
          <FontAwesome5 name="balance-scale" size={25} color="#F5F5F5" />
          <Text style={{fontSize: 12, color: "#F5F5F5", fontFamily: 'Laila-SemiBold'}}> Budget </Text>
          </View>
          <View onTouchEnd={() => {this.props.navigation.navigate('Transactions')}} style={{flex:1, alignItems: 'center', opacity: this.state.spendingClicked ? 1.0 : 0.7}}>
            <FontAwesome5 name="list-alt" size={25} color="#F5F5F5" />
            <Text style={{fontSize: 12, color: "#F5F5F5", fontFamily: 'Laila-SemiBold'}}> Spending </Text>
          </View>
          <View onTouchEnd={() => {this.props.navigation.navigate('Bill Pay')}} style={{flex:1, alignItems: 'center', opacity: this.state.billsClicked ? 1.0 : 0.7}}>
            <FontAwesome5 name="file-invoice" size={25} color="#F5F5F5" />
            <Text style={{fontSize: 12, color: "#F5F5F5", fontFamily: 'Laila-SemiBold'}}> Pay Bills </Text>
          </View>
          <View onTouchEnd={() => {this.props.navigation.navigate('Trends')}} style={{flex:1, alignItems: 'center', opacity: this.state.trendsClicked ? 1.0 : 0.7}}>
            <FontAwesome5 name="chart-line" size={25} color="#F5F5F5" />
            <Text style={{fontSize: 12, color: "#F5F5F5", fontFamily: 'Laila-SemiBold'}}> Trends </Text>
          </View>
        </View>
       </Container>
    );
  }
}

export default AppFooter