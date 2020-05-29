import React, { Component } from "react";
import { ActivityIndicator, View, Button, ImageBackground, Alert, Image, TouchableOpacity } from 'react-native';
import { Container, Header, Content, Card, CardItem, Text, Body } from "native-base";
import LoginScreenStyles from "../Styles/loginSreenStyles";
import style from "../Styles/Styles";
import ApiMethods from '../utilities/apiMethods';
import MainScreen from "./mainScreen";
import BackGroundImage from "../Styles/images/app background 2.png";

class SelectFundingSourceScreen extends Component {

  state = {
  }

 render() {

   const {navigation} = this.props;

   ////flex: 1, alignSelf: 'stretch'
    return (
      <View>
        <ImageBackground
            source={BackGroundImage}
            style={{width: '100%', height: '100%'}} > 
            <View style={{marginTop: '15%'}}>
              <View style={{marginBottom: 20}}>  
                <Text style={{fontSize: 18, margin: 10, textAlign: 'center'}}> Plan this item by selecting a funding source from available income </Text>
              </View>
              {this.props.route.params.incomeDataFromDB.map(income =>
              <View onTouchEnd={() => {this.props.route.params.selectFundingSource(income._id)}} style={{ width: '75%', height: '25%', alignSelf: 'center', justifyContent: 'center', backgroundColor: '#F5F5F5', margin: 10, borderRadius: 15, elevation: 5, borderWidth: 1, borderStyle: 'solid', borderColor: '#4A0784'}}> 
                <Text style={{fontSize: 18, textAlign: 'center'}}> {income.name} </Text>
                <Text style={{fontSize: 18, textAlign: 'center'}}> ${income.afterSpendingAmount + ' remaining of ' + ' $' + income.amount} </Text>
              </View>
              )}
            </View>
            {/* <View style={{flex: 1, alignItems: 'center', marginTop: '5%'}}>
            </View> */}
        </ImageBackground> 
      </View>
      
    );
  }
}

  export default SelectFundingSourceScreen;