import React, { Component } from "react";
import { ActivityIndicator, View, Button, ImageBackground, Alert, Image, TouchableOpacity } from 'react-native';
import { Container, Header, Content, Card, CardItem, Text, Body } from "native-base";
import LoginScreenStyles from "../Styles/loginSreenStyles";
import { FontAwesome5 } from '@expo/vector-icons';
import style from "../Styles/Styles";
import ApiMethods from '../utilities/apiMethods';
import Categories from '../utilities/categories';
import MainScreen from "./budgetScreen";
import BackGroundImage from "../Styles/images/whiteWall.png";
import EditBillFormDisplay from "../Components/editBillForm";
import SlideOutDrawer from "../Components/slideOutDrawer";
import EditEntryScreenOverLay from "../Components/overlays/editEntryScreenOverLay";

class EditEntryScreen extends Component {

  state = {
    whatsBeingEdited: this.props.route.params.whatsBeingEdited,
    showDrawer: false,
    showOverLay: false,
  }

  componentDidMount(){
  }

  showDrawerAndOverLay = () => {
    this.setState({
      showDrawer: true,
      showOverLay: true
    })
  }

  hideDrawerAndOverLay = () => {
    this.setState({
      showDrawer: false,
      showOverLay: false
    })
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
            //Editing Bill/Expense
            <View style={{flex: 1, position: 'absolute', zIndex: 0, alignSelf: 'stretch', width: '100%', marginTop: '15%'}}>
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
              <View style={{flex:1, position: 'relative', zIndex: 0, alignSelf: 'stretch'}}>
              <TouchableOpacity
                onPress={() => {this.props.route.params.deleteExpense(this.props.route.params.billID)}}
                style={style.button2_light_style}>
                <Text style={{fontSize: 12, color: 'red', fontFamily: 'Laila-SemiBold', fontWeight: 'bold'}}> Delete </Text>
              </TouchableOpacity>
              </View>
            </View>
            :
            //Editing Income
            <View style={{flex: 1, alignSelf: 'stretch', marginTop: '15%'}}>
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
              <View style={{flex: 1, alignSelf: 'stretch', justifyContent: 'flex-end'}}>
                <TouchableOpacity
                    onPress={() => {this.props.route.params.deleteIncome(this.props.route.params.incomeID)}}
                    style={style.button2_light_style}>
                  <Text style={{fontSize: 12, fontFamily: 'Laila-SemiBold', color: 'red'}}> Delete </Text>
                </TouchableOpacity>
              </View>
            </View>
          }
        </ImageBackground> 
      </Container>
      
    );
  }
}

  export default EditEntryScreen;