import React, { Component } from "react";
import { ActivityIndicator, View, Button, ImageBackground, Alert, Image } from 'react-native';
import { Container, Header, Content, Card, CardItem, Text, Body } from "native-base";
import { TouchableOpacity } from 'react-native-gesture-handler';
import LoginScreenStyles from "../Styles/loginSreenStyles";
import style from "../Styles/Styles";
import ApiMethods from '../utilities/apiMethods';
import MainScreen from "./mainScreen";
import BackGroundImage from "../Styles/images/app background 3.png";
import AppFooter from '../Components/appfooter';
import AppHeader from '../Components/appheader';
import MonthlyBillWrapper from '../Components/PayBills/monthlyBillWrapper';

class BillTrackerScreen extends Component {

  state = {
    billTrackerItemsFromDB: [],
    loggedInUserID: "",
    month: this.props.route.params.currentMonth,
    monthID: this.props.route.params.currentMonthID
  }

  componentDidMount() {
    this.getLoggedInUserIdByEmail(this.props.route.params.loggedInUsersEmail);
  }

  selectNewMonth = (month, monthID) => {
    this.setState({
      month: month,
      monthID: monthID
    }, () => {this.getBillTrackerItems();})
  }

  updateUnplannedBillWrapperComponent = () => {
    this.componentDidMount();
  }

  getBillTrackerItems = (loggedInUserID, monthID) => {
    ApiMethods
      .getBillTrackerItems(this.state.loggedInUserID, this.state.monthID)
      .then(billTrackerItems => {
          this.setState({
            billTrackerItemsFromDB: billTrackerItems.data
          })
        })
      .catch(err => console.log(err))
  }

  getLoggedInUserIdByEmail = async (email) => {
    await ApiMethods.getUserByEmail(email)
          .then(data => 
                this.setState({
                  loggedInUserID: data.data[0]._id 
                }))
          .catch(err => console.log(err))

    await this.getBillTrackerItems(this.state.loggedInUserID, this.state.monthID);
  }

  removeFromBillTracker = (billID) => {
    ApiMethods.removeFromBillTracker(billID)
              .then(data => {
                // alert(this.props.billName + ' has been removed from your bill tracker.');
                this.getBillTrackerItems(this.state.loggedInUserID, this.state.monthID)
              })
              .catch(err => console.log(err))
  }

 render() {

   const {navigation} = this.props;

    return (
      <Container>
        <ImageBackground
            source={BackGroundImage}
            style={{width: '100%', height: '100%'}} > 
        <AppHeader 
            photoURL={this.state.photoUrl}
            navigation={this.props.navigation}
            signOut={this.props.signOut} />
        <MonthlyBillWrapper 
          billTrackerItemsFromDB={this.state.billTrackerItemsFromDB}
          currentMonth={this.state.month}
          currentYear={this.props.route.params.currentYear}
          selectNewMonth={this.selectNewMonth}
          removeFromBillTracker={this.removeFromBillTracker}
          getLoggedInUserIdByEmail={this.getLoggedInUserIdByEmail}
          loggedInUsersEmail={this.props.route.params.loggedInUsersEmail}
        />
        <AppFooter 
              navigation={this.props.navigation} 
              screen={"bills"} />
        </ImageBackground> 
      </Container>
      
    );
  }
}

  export default BillTrackerScreen;