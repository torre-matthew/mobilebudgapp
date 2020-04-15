import React, { Component } from "react";
import { View } from 'react-native';
import { Container, Header, Content, Card, CardItem, Text, Body, Button } from "native-base";
import MainPage from '../Components/mainPage';

class MainScreen extends Component {
    render(){
        const {navigation} = this.props;
    return (
      <MainPage 
        tester={this.props.route.params.name}
      />
    );
  }
}

  export default MainScreen;