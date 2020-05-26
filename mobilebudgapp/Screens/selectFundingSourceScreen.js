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

    return (
      <View>
        <ImageBackground
            source={BackGroundImage}
            style={{width: '100%', height: '100%'}} > 
            <View style={{flex: 1, marginTop: '15%'}}>
              <View style={{ flex: 1, alignSelf: 'stretch'}}> 
                <Text style={{fontSize: 18, textAlign: 'center'}}> Plan this item by selecting a funding source from available income </Text>
              </View>
              {this.props.route.params.incomeDataFromDB.map(income =>
              <View onTouchEnd={() => {this.props.route.params.selectFundingSource(income._id)}} style={{ flex: 1, width: '85%', backgroundColor: '#F5F5F5', margin: 5, borderRadius: 15, elevation: 5, borderWidth: 1, borderStyle: 'solid', borderColor: '#40DBCE'}}> 
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