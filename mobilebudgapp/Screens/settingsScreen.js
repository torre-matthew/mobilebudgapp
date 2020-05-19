import React, { Component } from "react";
import { ActivityIndicator, View, Button, ImageBackground, Alert, Image } from 'react-native';
import { Container, Header, Content, Card, CardItem, Text, Body } from "native-base";
import { TouchableOpacity } from 'react-native-gesture-handler';
import LoginScreenStyles from "../Styles/loginSreenStyles";
import style from "../Styles/Styles";
import ApiMethods from '../utilities/apiMethods';
import MainScreen from "./mainScreen";

class SettingsScreen extends Component {

  state = {
    
  }

 render() {

   const {navigation} = this.props;

    return (
      <Container> 
        <View style={{flex: 1, justifyContent: 'flex-start', alignItems: 'center', margin: 15}}> 
            <Image style={{width: 100, height: 100, borderRadius: 50, borderWidth: 1}} source={{uri: this.props.route.params.photoURL}} />
          </View>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', margin: 25}}>
            <Text style={{color: '#474198', fontSize: 20}}>
              Settings Page
            </Text>
          </View>
          <View style={{flex: 1, justifyContent: 'center'}}>
          <TouchableOpacity
            style={style.button2_light_style}
            onPress={this.props.route.params.signOut}
            >
            <Text style={{color: 'red'}}> Sign Out </Text>
          </TouchableOpacity>
          </View>  
      </Container>
      
    );
  }
}

  export default SettingsScreen;