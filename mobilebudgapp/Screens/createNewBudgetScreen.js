import React, { Component } from "react";
import { ActivityIndicator, View, Button, ImageBackground, Alert } from 'react-native';
import { Container, Header, Content, Card, CardItem, Text, Body } from "native-base";
import { TouchableOpacity } from 'react-native-gesture-handler';
import LoginScreenStyles from "../Styles/loginSreenStyles";
import style from "../Styles/Styles";
import ApiMethods from '../utilities/apiMethods';
import MainScreen from "./mainScreen";

class CreateNewBudgetScreen extends Component {

  state = {
    
  }
copyPreviousMonth = () => {
  // alert("Soldiers are in here looking for you, my guy!!!")
  ApiMethods.copyPreviousMonthData(this.props.route.params.previousMonthID, this.props.route.params.userID, this.props.route.params.targetMonthID)
    .then(data => {

      console.log(data);
      // if (data) {
      //   alert(this.props.route.params.targetMonthName + " ready")
      // } else {
      //   alert("Sorry there seems to have been a problem. Please try again.")
      // }
    })
    .catch(err => console.log(err))
}
 render() {

   const {navigation} = this.props;

    return (
      <Container>
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', margin: 25}}>
            <Text style={{color: '#474198', fontSize: 20}}>
              Hey there, ready to start planning
            </Text>
            <Text style={{color: '#474198', fontSize: 20}}>
              {this.props.route.params.targetMonthName + "'s budget?"}
            </Text>
            <Text style={{color: '#474198', fontSize: 16, marginTop: 20}}>
              Get a head start by copying a this month's budget 
            </Text>
            <Text style={{color: '#474198', fontSize: 16}}>
              or you can start fresh.
            </Text>
          </View>
          <View style={{flex: 1, justifyContent: 'center'}}>
          <TouchableOpacity
            onPress={() => {this.copyPreviousMonth()}}
            style={style.button2_cta_style}
            >
            <Text> {'Copy ' + this.props.route.params.previousMonthName +  "'s plan"} </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {}}
            style={style.button2_light_style}
            >
            <Text> Start fresh </Text>
          </TouchableOpacity>
          </View>  
      </Container>
      
    );
  }
}

  export default CreateNewBudgetScreen;