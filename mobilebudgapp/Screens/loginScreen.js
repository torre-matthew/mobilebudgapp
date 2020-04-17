import React, { Component } from "react";
import { View, Button, ImageBackground } from 'react-native';
import { Container, Header, Content, Card, CardItem, Text, Body } from "native-base";
import * as Google from 'expo-google-app-auth'
import LoginScreenStyles from "../Styles/loginSreenStyles";
import MainPage from '../Components/mainPage';
import ApiMethods from '../utilities/apiMethods';
import MainScreen from "./mainScreen";

const style = require("../Styles/Styles");
const backgroundImage = require('../Styles/images/turquise indigo gradient.png');

class LoginScreen extends Component {

  state = {
    signedIn: false,
    name: "",
    photoUrl: "",
    email:""
  }

  signIn = async () => {
    try {
      const result = await Google.logInAsync({
        androidClientId: "446220388364-jffs659t4t98fuur4srsstggq04mgd52.apps.googleusercontent.com",
        scopes: ["profile", "email"]
      })
      if (result.type === "success") {
          ApiMethods.getUserByEmail(result.user.email)
          .then(data => {
            if (data.data[0] === undefined){
              ApiMethods.addUser(result.user.email, result.user.photoUrl, result.user.familyName, result.user.givenName)
              .then(data => console.log(data)).catch(err => console.log(err));

              this.setState({
                signedIn: true,
                name: result.user.name,
                photoUrl: result.user.photoUrl,
                email: result.user.email 
              })
            }else {
              
              this.setState({
                signedIn: true,
                name: result.user.name,
                photoUrl: result.user.photoUrl,
                email: result.user.email 
              })
            }
          })
          .catch(err => console.log(err))

      } else {
        console.log("cancelled")
      }
} catch (e) {
      console.log("error", e)
    }
}

 render() {

   const {navigation} = this.props;

    return (
      <Container style={LoginScreenStyles.container}>
          <ImageBackground
            source={backgroundImage}
            style={{width: '100%', height: '100%'}} >
          <View style={LoginScreenStyles.welcome}>
            <Text style={{color: '#F5F5F5', fontSize: 35}}>
              Hi! I'm Lahri.
            </Text>
            <Text style={{color: '#F5F5F5', fontSize: 25}}>
              I'll help you make a plan for your money.
            </Text>
            <Text style={{color: '#F5F5F5', fontSize: 25}}>
              Shall we get started?
            </Text>
          </View>
          <View style={LoginScreenStyles.welcome}>
            {this.state.signedIn ? 
              <Text style={{color: '#F5F5F5', fontSize: 25}}> {'Hi, ' + this.state.name} </Text>
            : 
              <Text></Text>
            }
          </View>
          <View style={LoginScreenStyles.signIn}>
          {this.state.signedIn ? 
              <Button title="Go To Main Page" onPress={() => navigation.navigate('Main', {email: this.state.email})} />
            : 
            <Button title="Sign in with Google" onPress={() => this.signIn()} />
            }
          </View>
        </ImageBackground>  
      </Container>
      
    );
  }
}

  export default LoginScreen;