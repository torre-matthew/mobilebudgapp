import React, { Component } from "react";
import { View, Modal, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Container, Header, Content, Card, CardItem, Text, Body } from "native-base";
import EditBillFormDisplay from "./editBillForm";
import style from "../Styles/Styles";
import ApiMethods from '../utilities/apiMethods';
import Categories from '../utilities/categories';
import QuickActionDrawer from "./quickActionDrawer";
import { FontAwesome5 } from '@expo/vector-icons';
import * as Font from 'expo-font';


class UnplannedBillDisplay extends Component {
  state = {
    modalVisible: false,
    whatsBeingEdited: "",
    fundingSourceID: "",
    fundingSourceName: "",
    fundingSourceAmount: "",
    colorIfPaid: "",
    textColorIfPaid: "",
    markAsPaidButtonText: "",
    paidDisplayText: "",
    paidBillDescriptionTextInModal: "",
    showDrawer: false,
    billIsPaid: this.props.billIsPaid,
    forBillTracker: this.props.forBillTracker,
    categoryIcon: "",
    categoryIconColor: "",
    componentUpdateSwitch: this.props.componentUpdateSwitch
  };

  componentDidMount() {
    this.getFundingSourceInfo(this.props.billID);
    this.changeDisplayWhenMarkedAsPaid();
    this.setCategoryDisplay();  
  }

  updateBillDisplayComponent = () => {
    this.componentDidMount();
    this.props.updateWrapperComponent();
  }

  setCategoryDisplay = () => {
    this.setState({
      categoryIcon: Categories.categoryIconLogic(this.props.billCategoryName).icon,
      categoryIconColor: Categories.categoryIconLogic(this.props.billCategoryName).iconColor,
    });
  }
  setDrawerVisible = () => {
    if (this.state.showDrawer) { 
      this.setState({showDrawer: false, whatsBeingEdited: "bill"});
      } else {
        this.setState({showDrawer: true, whatsBeingEdited: "bill"});
      }
  }


  changeDisplayWhenMarkedAsPaid = () => {
    switch (this.state.forBillTracker) {
      case true:
        this.setState({
          colorIfPaid: "#4A0784", 
          textColorIfPaid: "#F5F5F5", 
          markAsPaidButtonText: "Mark as unpaid",
          paidBillDescriptionTextInModal: "This has been paid",
          paidDisplayText: "In bill tracker"
        })
          break;
      case false:
        this.setState({
          colorIfPaid: "#f8f8ff",
          textColorIfPaid: "black",
          markAsPaidButtonText: "Mark as paid",
          paidBillDescriptionTextInModal: "This is currently unpaid",
          paidDisplayText: ""
        })
    }
  }

  getFundingSourceInfo = (expenseID) => {
    if (this.props.billIsPlanned) {
        ApiMethods.getExpenseByID(expenseID)
          .then(data => {
            ApiMethods.getIncomeByID(data.data[0].fundingSource)
              .then(data => {
                  this.setState({
                    fundingSourceID: data.data[0]._id, 
                    fundingSourceName: data.data[0].name,
                    fundingSourceAmount: "$" + data.data[0].afterSpendingAmount + " left"
                    });                      
                  })
              .catch(err => console.log(err))
            })
          .catch(err => console.log(err));

    } else {
      this.setState({
        fundingSourceID: "",
        fundingSourceName: "",
        fundingSourceAmount: ""
      });
    }
  }

  showConfirmationAlert = (idToDelete) => {

  Alert.alert(
    'Delete Expense ' + idToDelete,
    'Are you sure?',
    [ 
      {text: 'Nevermind', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
      {text: 'Yes, I am', onPress: () => {this.deleteExpense(idToDelete)},
      },
      ],
    {cancelable: false},
  );
}
  render () {
      return (
        <View>
            <View style={{position: 'relative', zIndex: 0}}>
              <View onTouchEnd={() => {this.props.showDrawerAndOverLayLogic(this.props.billID, this.props.billName, this.props.billAmount, this.props.billCategoryName, this.props.billCategoryID, this.state.categoryIcon, this.state.categoryIconColor, this.props.dueDate, this.state.fundingSourceID, this.state.fundingSourceName, this.state.fundingSourceAmount, this.props.billIsPaid, this.props.billIsPlanned, "bill", this.props.forBillTracker);}} style={{ flex: 1, alignSelf: 'stretch', flexDirection: 'row', marginTop: 3 }}>
                <View style={{ flex: 1, alignSelf: 'stretch', backgroundColor: '#f8f8ff', flexGrow: 1, paddingLeft: 10, paddingTop: 10, paddingBottom: 5, borderTopLeftRadius: 5, borderStyle: 'solid', borderLeftColor: this.state.categoryIconColor, borderLeftWidth: 4 }}> 
                  <FontAwesome5 name={this.state.categoryIcon} size={18} color={this.state.categoryIconColor} />
                </View>
                <View style={{ flex: 1, alignSelf: 'stretch', backgroundColor: '#f8f8ff', flexGrow: 9, paddingTop: 10, paddingBottom: 5, paddingRight: 5}}> 
                  <Text style={{fontSize: 15, fontFamily: "Laila-SemiBold"}}> {this.props.billName} </Text>
                </View>
                <View style={{ flex: 1, justifyContent: 'center', alignItems:'flex-end', backgroundColor: '#f8f8ff', flexGrow: 6, padding: 5, borderTopRightRadius: 15}}> 
                  <Text style={{fontSize: 15, fontFamily: "Laila-SemiBold", color: this.state.categoryIconColor}}> ${this.props.billAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} </Text>
                </View>
              </View>
              <View style={{ flex: 1, alignSelf: 'stretch', flexDirection: 'row', backgroundColor: '#f8f8ff', borderBottomLeftRadius: 5, borderBottomRightRadius: 15, borderStyle: 'solid', borderLeftColor: this.state.categoryIconColor, borderLeftWidth: 4}}>
                <View style={{ flex: 1, flexGrow: .5, alignItems: 'flex-end', paddingTop: 1, paddingBottom: 5, paddingLeft: 5,}}> 
                  <FontAwesome5 name='calendar-alt' size={12} />
                </View>
                <View style={{ flex: 1, flexGrow: 2, alignItems: 'flex-start', paddingTop: 1, paddingBottom: 5, paddingLeft: 5,}}> 
                  <Text style={{fontSize: 10, fontFamily: "Laila-SemiBold"}}> { new Date(this.props.dueDate).toDateString().substr(4, 12) } </Text>
                </View>
                <View style={{ flex: 1, alignSelf: 'stretch', flexGrow: 5, paddingTop: 1, paddingBottom: 5, paddingLeft: 5,}}> 
                  <Text style={{fontSize: 10, fontFamily: "Laila-SemiBold"}}> {this.state.fundingSourceName + ' ' + this.state.fundingSourceAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} </Text>
                </View>
                <View style={{ flex: 1, alignItems: 'center', flexGrow: .75, backgroundColor: this.state.colorIfPaid, padding: 3, borderTopLeftRadius: 10, borderBottomLeftRadius: 10, borderBottomRightRadius: 10}}> 
                  <FontAwesome5 name="list-alt" size={15} color='#f8f8ff' />
                </View>
              </View>
              {this.state.showDrawer
                ? 
               <QuickActionDrawer 
                  navigation={this.props.navigation}
                  dueDate={this.props.dueDate}
                  billName={this.props.billName}
                  billAmount={this.props.billAmount}
                  billID={this.props.billID}
                  billIsPlanned={this.props.billIsPlanned}
                  billFundingSourceID={this.props.billFundingSourceID}
                  billCategoryName={this.props.billCategoryName}
                  billCategoryID={this.props.billCategoryID}
                  fetchData={this.props.fetchData}
                  fundingSourceID={this.state.fundingSourceID}
                  fundingSourceName={this.state.fundingSourceName}
                  fundingSourceAmount={this.state.fundingSourceAmount}
                  incomeDataFromDB={this.props.incomeDataFromDB}
                  whatsBeingEdited={this.state.whatsBeingEdited}
                  updateWrapperComponent={this.props.updateWrapperComponent}
                  updateDisplayComponent={this.updateBillDisplayComponent}
                  loggedInUserID={this.props.loggedInUserID}
                  isThisPlanned={this.props.isThisPlanned}
                  markAsPaid={this.markAsPaid}
                  markAsPaidButtonText={this.state.markAsPaidButtonText}
                  markAsUnplanned={this.markAsUnplanned}
                  billIsPaid={this.state.billIsPaid}
                  deleteExpense={this.showConfirmationAlert}
                  showMarkAsPaid={this.props.showMarkAsPaid}
                  splitEntry={this.splitEntry}
                  moveToNextMonth={this.moveToNextMonth}
                  selectFundingSource={this.selectFundingSource}
                  hideDrawerAndOverLayLogic={this.props.hideDrawerAndOverLayLogic}
               />
                :
                <View />
              }          
            </View>
          </View>
      );
    }
  }


  export default UnplannedBillDisplay;