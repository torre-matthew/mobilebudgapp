import React, { Component } from "react";
import { ActivityIndicator, View, Button, ImageBackground, Alert, Image } from 'react-native';
import { Container, Header, Content, Card, CardItem, Text, Body } from "native-base";
import { TouchableOpacity } from 'react-native-gesture-handler';
import LoginScreenStyles from "../Styles/loginSreenStyles";
import style from "../Styles/Styles";
import ApiMethods from '../utilities/apiMethods';
import MainScreen from "./mainScreen";
import BackGroundImage from "../Styles/images/app background.png";
import EditBillFormDisplay from "../Components/editBillForm";

class SettingsScreen extends Component {

  state = {
    whatsBeingEdited: this.props.route.params.whatsBeingEdited
  }

 render() {

   const {navigation} = this.props;

    return (
      <Container>
        <ImageBackground
            source={BackGroundImage}
            style={{width: '100%', height: '100%'}} > 
            {this.state.whatsBeingEdited === "bill"
            ?
            <EditBillFormDisplay
              navigation={this.props.route.params.navigation}
              dueDate={this.props.route.params.dueDate}
              billName={this.props.route.params.billName}
              billAmount={this.props.route.params.billAmount}
              billID={this.props.route.params.billID}
              billIsPlanned={this.props.route.params.billIsPlanned}
              billFundingSourceID={this.props.route.params.billFundingSourceID}
              fundingSourceName={this.props.route.params.fundingSourceName}
              fundingSourceAmount={this.props.route.params.fundingSourceAmount}
              incomeDataFromDB={this.props.route.params.incomeDataFromDB}
              whatsBeingEdited={this.props.route.params.whatsBeingEdited}
              updateWrapperComponent={this.props.route.params.updateWrapperComponent}
              updateDisplayComponent={this.props.route.params.updateBillDisplayComponent}
              loggedInUserID={this.props.route.params.loggedInUserID}
              isThisPlanned={this.props.route.params.isThisPlanned} 
            />
            :
            <EditBillFormDisplay
              navigation={this.props.route.params.navigation}
              incomeName={ this.props.route.params.incomeName}
              incomeDate={ this.props.route.params.incomeDate}
              incomeAmount={ this.props.route.params.incomeAmount}
              incomeID={ this.props.route.params.incomeID}
              handleExpenseEditFormSubmit={ this.props.route.params.handleExpenseEditFormSubmit}
              incomeDataFromDB={ this.props.route.params.currentIncomeFromDB}
              whatsBeingEdited={ this.props.route.params.whatsBeingEdited}
              updateWrapperComponent={ this.props.route.params.updateWrapperComponent}
              updateDisplayComponent={ this.props.route.params.updateIncomeDisplayComponent}
              switcherClicked={ this.props.route.params.switcherClicked}
            />
          }
        </ImageBackground> 
      </Container>
      
    );
  }
}

  export default SettingsScreen;