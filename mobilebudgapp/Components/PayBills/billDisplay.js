import React, { Component } from "react";
import { View, Modal, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Container, Header, Content, Card, CardItem, Text, Body } from "native-base";
import EditBillFormDisplay from "../editBillForm";
import style from "../../Styles/Styles";
import ApiMethods from '../../utilities/apiMethods';
import Categories from '../../utilities/categories';
import QuickActionDrawer from "../quickActionDrawer";
import { FontAwesome5 } from '@expo/vector-icons';
import * as Font from 'expo-font';


class BillDisplay extends Component {
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
    categoryIcon: "",
    categoryIconColor: ""
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
    switch (this.state.billIsPaid) {
      case true:
        this.setState({
          colorIfPaid: "#4A0784", 
          textColorIfPaid: "#F5F5F5", 
          markAsPaidButtonText: "Mark as unpaid",
          paidBillDescriptionTextInModal: "This has been paid",
          paidDisplayText: "Paid"
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
                    fundingSourceAmount: "$" + data.data[0].afterSpendingAmount + " remains"
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
              <View  style={{ flex: 1, alignSelf: 'stretch', marginTop: 40 }}>
                <View style={{ flex: 1, alignItems: 'center', backgroundColor: '#f8f8ff', paddingTop: 10, paddingBottom: 5, paddingRight: 5}}> 
                  <Text style={{fontSize: 20, fontFamily: "Laila-SemiBold"}}> Bill name here </Text>
                </View>
              </View>
              <View  style={{ flex: 1, alignSelf: 'stretch', flexDirection: 'row'}}>
                <View style={{ flex: 1, alignItems:'center', backgroundColor: '#f8f8ff', flexGrow: 2, paddingTop: 10, paddingBottom: 5, borderTopRightRadius: 15}}> 
                  <Text style={{fontSize: 20, fontFamily: "Laila-SemiBold", color: this.state.categoryIconColor}}> ${"55.98"} </Text>
                </View>
              </View>
              <View style={{ flex: 1, alignSelf: 'stretch', flexDirection: 'row', backgroundColor: '#f8f8ff', borderBottomLeftRadius: 5, borderBottomRightRadius: 15, borderStyle: 'solid', borderLeftColor: this.state.categoryIconColor}}>
                <View style={{ flex: 1, alignSelf: 'stretch', backgroundColor: '#f8f8ff', flexGrow: 0.55, paddingLeft: 10, paddingTop: 10, paddingBottom: 5, borderTopLeftRadius: 5, borderStyle: 'solid', borderLeftColor: this.state.categoryIconColor }}> 
                  <FontAwesome5 name={this.state.categoryIcon} size={15} color={this.state.categoryIconColor} />
                </View>
                <View style={{ flex: 1, alignItems: 'center', flexGrow: 3, paddingTop: 1, paddingBottom: 5, paddingLeft: 5,}}> 
                  <Text style={{fontSize: 15, fontFamily: "Laila-SemiBold"}}> Due: {"12/15/19"} </Text>
                </View>
                <View style={{ flex: 1, alignSelf: 'stretch', flexGrow: 1, backgroundColor: this.state.colorIfPaid, paddingTop: 1, paddingBottom: 5, paddingLeft: 5, borderTopLeftRadius: 10, borderBottomLeftRadius: 10, borderBottomRightRadius: 10}}> 
                  <Text style={{color: this.state.textColorIfPaid, fontSize: 10, fontFamily: "Laila-SemiBold"}}> {this.state.paidDisplayText} </Text>
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


  export default BillDisplay;