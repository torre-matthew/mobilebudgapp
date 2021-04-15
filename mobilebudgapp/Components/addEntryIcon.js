import React, { Component } from 'react';
import { ImageBackground, Image, Text } from 'react-native';
import { Container, Header, Left, Body, Right, Title, View } from 'native-base';
import style from "../Styles/Styles";
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

const backgroundImage = require('../Styles/images/whiteWall.png');

class AddEntryIcon extends Component {

  state = {
    loggedInUserImage: "",
    budgetClicked: "",
    spendingClicked: "",
    billsClicked: "",
    trendsClicked: ""
  }

  // #2D2D2F - Charcoal
  // #4658A1 - blue
  render() {
    return (
      <Container style={{position: 'absolute', left: '82%', top: '90%', zIndex: 0, width: '16%', height: '8%', backgroundColor: "#40DBCE", borderRadius: 32}}>
        <View onTouchEnd={() => {this.props.navigation.navigate('Add Entry', {
            handleAddIncomeFormSubmit: this.props.handleAddIncomeFormSubmit,
            currentMonth: this.props.currentMonth,
            getUnPlannedExpenseDataFromDB: this.props.getUnPlannedExpenseDataFromDB,
            getIncomeDataFromDB: this.props.getIncomeDataFromDB,
            currentYear: this.props.currentYear,
            currentMonthID: this.props.currentMonthID,
            loggedInUsersEmail: this.props.loggedInUsersEmail,
            currentUserID: this.props.currentUserID,
            navigation: this.props.navigation
          })}} style={{alignSelf: 'center', justifyContentt: 'center', marginTop: '18%'}}>
            <FontAwesome5 name="plus" size={32} color= '#F5F5F5' />
        </View>
      </Container>
    );
  }
}

export default AddEntryIcon