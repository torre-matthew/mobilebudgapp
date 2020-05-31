import React, { Component } from "react";
import { ActivityIndicator, View, Button, ImageBackground, Alert } from 'react-native';
import { Container, Header, Content, Card, CardItem, Text, Body } from "native-base";
import { TouchableOpacity } from 'react-native-gesture-handler';
import LoginScreenStyles from "../Styles/loginSreenStyles";
import style from "../Styles/Styles";
import ApiMethods from '../utilities/apiMethods';
import MainScreen from "./mainScreen";
import BackGroundImage from "../Styles/images/app background 2.png";

class CreateNewBudgetScreen extends Component {

  state = {
    
  }

copyPreviousMonth = () => {
  
  ApiMethods.copyPreviousMonthData(this.props.route.params.previousMonthID, this.props.route.params.userID, this.props.route.params.targetMonthID)
    .then(data => {return data})
    .catch(err => console.log(err))
    this.props.route.params.fetchData();
    this.props.navigation.navigate('Main');

    //{email: this.state.email, currentMonth: this.state.currentMonth, currentMonthID: this.state.currentMonthID}
}
 render() {

   const {navigation} = this.props;

    return (
      <Container>
          <ImageBackground
            source={BackGroundImage}
            style={{width: '100%', height: '100%'}} > 
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', margin: 25}}>
            <Text style={{color: "#40DBCE", fontSize: 20}}>
              Hey there, ready to start planning
            </Text>
            <Text style={{color: "#40DBCE", fontSize: 20}}>
              {this.props.route.params.targetMonthName + "'s budget?"}
            </Text>
            <Text style={{color: "#40DBCE", fontSize: 16, marginTop: 20}}>
              Get a head start by copying a this month's budget 
            </Text>
            <Text style={{color: "#40DBCE", fontSize: 16}}>
              or you can start fresh.
            </Text>
          </View>
          <View style={{flex: 1, justifyContent: 'center'}}>
          <TouchableOpacity
            onPress={() => {this.copyPreviousMonth()}}
            style={style.button2_cta_style}
            >
            <Text style={{color: '#4A0784'}}> {'Copy ' + this.props.route.params.previousMonthName +  "'s plan"} </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {this.props.navigation.navigate('Main')}}
            style={style.button2_light_style}
            >
            <Text style={{color: '#4A0784'}}> Start fresh </Text>
          </TouchableOpacity>
          </View>  
          </ImageBackground>
      </Container>
      
    );
  }
}

  export default CreateNewBudgetScreen;