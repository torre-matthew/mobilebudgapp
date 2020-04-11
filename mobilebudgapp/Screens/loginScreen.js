import React, { Component } from "react";
import { View, Button, ImageBackground } from 'react-native';
import { Container, Header, Content, Card, CardItem, Text, Body } from "native-base";
import * as Google from 'expo-google-app-auth'

const style = require("../Styles/Styles");
const backgroundImage = require('../Styles/images/turquise indigo gradient.png');

class LoginScreen extends Component {

  state = {
    signedIn: false,
    name: "",
    photoUrl: ""
  }

  signIn = async () => {
    try {
      const result = await Google.logInAsync({
        androidClientId: "446220388364-jffs659t4t98fuur4srsstggq04mgd52.apps.googleusercontent.com",
        scopes: ["profile", "email"]
      })
      if (result.type === "success") {
        console.log(result);
        this.setState({
          signedIn: true,
          name: result.user.name,
          photoUrl: result.user.photoUrl
        })
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
      <Container>
          <ImageBackground
            source={backgroundImage}
            style={{width: '100%', height: '100%'}} >
        <View style={style.container}>
            {this.state.signedIn ? 
              <Text> {this.state.name + " " + this.state.photoUrl} </Text>
            : 
              <Text></Text>
            }
          </View>
          <View>
          <Button title="Sign in with Google" 
          onPress={() => this.signIn()} />
        </View>
        <View>
          <Button title="Go To Main Page" 
          onPress={() => navigation.navigate('Main')} />
        </View>
        </ImageBackground>  
      </Container>
      
    );
  }
}

  export default LoginScreen;