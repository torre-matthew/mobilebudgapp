import React, { Component } from "react";
import { View } from 'react-native';
import { Container, Header, Content, Card, CardItem, Text, Body, Button } from "native-base";
import MainPage from '../Components/mainPage';

class MainScreen extends Component {
    render(){
        const {navigation} = this.props;
    return (
      <MainPage 
        loggedInUsersEmail={this.props.route.params.email}
        currentMonth={this.props.route.params.currentMonth}
        currentMonthID={this.props.route.params.currentMonthID}
      />
    );
  }
}

  export default MainScreen;