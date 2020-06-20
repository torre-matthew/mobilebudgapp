import React, { Component } from "react";
import { ActivityIndicator, View, Button, ImageBackground, Alert, Image } from 'react-native';
import { Container, Header, Content, Card, CardItem, Text, Body } from "native-base";
import { TouchableOpacity } from 'react-native-gesture-handler';
import LoginScreenStyles from "../Styles/loginSreenStyles";
import style from "../Styles/Styles";
import ApiMethods from '../utilities/apiMethods';
import MainScreen from "./mainScreen";
import BackGroundImage from "../Styles/images/app background 3.png";
import AppFooter from '../Components/appfooter';
import AppHeader from '../Components/appheader';
import PlaidLinkComponent from '../Components/plaidLinkComponent';

class TransactionsScreen extends Component {

  state = {
    
  }

 render() {

   const {navigation} = this.props;

    return (
      <Container>
        <ImageBackground
            source={BackGroundImage}
            style={{width: '100%', height: '100%'}} > 
        <AppHeader 
            photoURL={this.state.photoUrl}
            navigation={this.props.navigation}
            signOut={this.props.signOut} />
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', margin: 25}}>
            <PlaidLinkComponent />
        </View> 
        <AppFooter 
              navigation={this.props.navigation}
              screen={"spending"} />
        </ImageBackground> 
      </Container>
      
    );
  }
}

  export default TransactionsScreen;