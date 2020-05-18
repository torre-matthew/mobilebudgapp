import React, { Component } from "react";
import { View } from 'react-native';
import { Container, Header, Content, Card, CardItem, Text, Body, Button } from "native-base";
import MainPage from '../Components/mainPage';
import SideBar from "../Components/sideBar";

class MainScreen extends Component {
    render(){
        const {navigation} = this.props;
    return (
      <Container> 
        {/* <SideBar 
          loggedInUsersEmail={this.props.route.params.email}
          currentMonth={this.props.route.params.currentMonth}
          currentMonthID={this.props.route.params.currentMonthID}
          navigation={navigation}
          photoURL={this.props.route.params.photoURL}
        />  */}
        <MainPage 
          loggedInUsersEmail={this.props.route.params.email}
          currentMonth={this.props.route.params.currentMonth}
          currentMonthID={this.props.route.params.currentMonthID}
          navigation={navigation}
          photoURL={this.props.route.params.photoURL}
          />
      </Container>
    );
  }
}

  export default MainScreen;