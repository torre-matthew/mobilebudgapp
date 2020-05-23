import React, { Component } from "react";
import { View } from 'react-native';
import { Container, Header, Content, Card, CardItem, Text, Body, Button } from "native-base";
import MainPage from '../Components/mainPage';

class MainScreen extends Component {
    render(){
        const {navigation} = this.props;
    return (
      <Container> 
        <MainPage 
          loggedInUsersEmail={this.props.route.params.email}
          currentMonth={this.props.route.params.currentMonth}
          currentMonthID={this.props.route.params.currentMonthID}
          navigation={navigation}
          photoURL={this.props.route.params.photoURL}
          signOut={this.props.route.params.signOut}
          />
          <MainPage 
          loggedInUsersEmail={"torre.pk.matthew@gmail.com"}
          currentMonth={"May"}
          currentMonthID={"5eaf6211e7b5c6001726776a"}
          navigation={navigation}
          photoURL={"https://lh3.googleusercontent.com/a-/AOh14GiYRuLnlpz-uypUOvbDG_uVR56n6DxLoC5Ubb-Wcg"}
          // signOut={this.props.route.params.signOut}
          />
      </Container>
    );
  }
}

  export default MainScreen;