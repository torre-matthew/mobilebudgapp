import React, { Component } from "react";
import { ActivityIndicator, View, Button, ImageBackground, Alert, Image, TouchableOpacity } from 'react-native';
import { Container, Header, Content, Card, CardItem, Text, Body } from "native-base";
import { FontAwesome5 } from '@expo/vector-icons';
import style from "../Styles/Styles";
import ApiMethods from '../utilities/apiMethods';
import MainScreen from "./mainScreen";
import AddIncomeForm from "../Components/addIncomeForm";
import AddBillForm from "../Components/addBillForm";
import BackGroundImage from "../Styles/images/whiteWall.png";


class AddEntryScreen extends Component {

  state = {
  }

  componentDidMount(){
  }

 render() {

   const {navigation} = this.props;

    return (
      <Container>
        <ImageBackground
            source={BackGroundImage}
            style={{width: '100%', height: '100%'}} >
            {/* <View style={{flex: 1, position: 'absolute', zIndex: 0, alignSelf: 'stretch', width: '100%', marginTop: '15%'}}>
              <AddIncomeForm />
            </View> */}
            <View style={{flex: 1, position: 'absolute', zIndex: 0, alignSelf: 'stretch', width: '100%', marginTop: '15%'}}>
              <AddBillForm />
            </View>
        </ImageBackground> 
      </Container>
      
    );
  }
}

  export default AddEntryScreen;