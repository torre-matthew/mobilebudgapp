import React, { Component } from "react";
import { View, Modal, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Container, Header, Content, Card, CardItem, Text, Body } from "native-base";
import EditBillFormDisplay from "./editBillForm";
import style from "../Styles/Styles";
import ApiMethods from '../utilities/apiMethods';
import QuickActionDrawer from "./quickActionDrawer";
import * as Font from 'expo-font';


class UnplannedBillDisplay extends Component {
  state = {
    modalVisible: false,
    whatsBeingEdited: "",
    fundingSourceName: "",
    fundingSourceAmount: "",
    colorIfPaid: "",
    textColorIfPaid: "",
    markAsPaidButtonText: "",
    paidDisplayText: "",
    paidBillDescriptionTextInModal: "",
    showDrawer: false,
    billIsPaid: this.props.billIsPaid,
    fontsLoaded: false
  };

  componentDidMount() {
    this.getFundingSourceInfo(this.props.billID);
    this.changeDisplayWhenMarkedAsPaid();
    this.loadFonts();
  }

  updateBillDisplayComponent = () => {
    this.componentDidMount();
    this.props.updateWrapperComponent();
  }

  loadFonts = async () => {
    await Font.loadAsync({
            'SpecialElite-Regular': require('../assets/fonts/SpecialElite-Regular.ttf'),
            'Laila-SemiBold': require('../assets/fonts/Laila-SemiBold.ttf'),
            'Quicksand-SemiBold': require('../assets/fonts/Quicksand-SemiBold.ttf'),
          });
    this.setState({fontsLoaded:true});
  }

  setDrawerVisible = () => {
    if (this.state.showDrawer) { 
      this.setState({showDrawer: false, whatsBeingEdited: "bill"});
      } else {
        this.setState({showDrawer: true, whatsBeingEdited: "bill"});
      }
  }

  splitEntry = (billID) => {
    Alert.alert(
      'Split ' + this.props.billName + '?',
      'I will create a new entry and evenly divide the amounts between this item and the newly created one?',
      [ 
        {text: 'Nevermind', style: 'cancel'},
        {text: 'Ok', onPress: () => {
          ApiMethods.splitEntry(billID).then(data => {return data}).catch(err => console.log(err));
          this.updateBillDisplayComponent();
        }, 
      },
        ],
      {cancelable: false},
    );
  }

  markAsUnplanned = () => {
    ApiMethods.editExpense(this.props.billID, this.props.billName, this.props.dueDate, this.props.billAmount, false, "", this.props.loggedInUserID)
            .then(res => {
                if (res.data.nModified === 0) {
                    alert('Sorry, there was a problem. Please try again');
                } else {
                    this.componentDidMount();
                    this.props.updateWrapperComponent();
                    // Alert.alert('', 'Successfully updated',[{text: 'OK'}] );
                }
                })
            .catch(err => console.log(err));

  }

  markAsPaid = (id, bool) => {
    switch (bool) {
      case true:
        ApiMethods.markExpenseAsPaid(id, false)
          .then(data => {
            this.setState({markAsPaidButtonText: "Mark as paid", paidBillDescriptionTextInModal: "This is currently unpaid", billIsPaid: false}, () => {this.updateBillDisplayComponent()})
          })
          .catch(err => console.log(err));
          break;
      case false:
        ApiMethods.markExpenseAsPaid(id, true)
          .then(data => {
            // this.updateBillDisplayComponent();
            this.setState({markAsPaidButtonText: "Mark as unpaid", paidBillDescriptionTextInModal: "This has been paid", billIsPaid: true}, () => {this.updateBillDisplayComponent()})
          })
          .catch(err => console.log(err));
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

  deleteExpense = (idToDelete) => {
    ApiMethods.deleteExpense(idToDelete)
    .then(res => {
      if (res.data.deletedCount === 0) {
        alert('Sorry, ' + idToDelete + ' could not be deleted');

      } else if (this.props.billIsPlanned) {
        alert('You have successfully deleted ' + this.props.billName);

          ApiMethods
            .updateAfterSpendingAmount(this.props.billFundingSourceID)
            .then(data => {
              ApiMethods
                .updateIncomeOnUserRecord(this.props.loggedInUserID)
                .then(data => {
                  this.props.updateWrapperComponent();
                  })
                .catch(err => console.log(err));
              })
            .catch(err => console.log(err))
          
            this.componentDidMount();
            this.props.updateWrapperComponent();
            this.props.navigation.navigate('Main');
      } else {
        alert('You have successfully deleted ' + this.props.billName);
        
        ApiMethods.updateIncomeOnUserRecord(this.props.loggedInUserID)
        .then(data => {
          this.props.updateWrapperComponent();
        })
        .catch(err => console.log(err));

        this.componentDidMount();
        this.props.updateWrapperComponent();
        this.props.navigation.navigate('Main');
      }
    })
    .catch(err => console.log(err));
  }

  getFundingSourceInfo = (expenseID) => {
    if (this.props.billIsPlanned) {
        ApiMethods.getExpenseByID(expenseID)
          .then(data => {
            ApiMethods.getIncomeByID(data.data[0].fundingSource)
              .then(data => {
                  this.setState({
                    fundingSourceName: data.data[0].name,
                    fundingSourceAmount: "$" + data.data[0].afterSpendingAmount + " remains"
                    });                      
                  })
              .catch(err => console.log(err))
            })
          .catch(err => console.log(err));

    } else {
      this.setState({
        fundingSourceName: "",
        fundingSourceAmount: "not yet planned"
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
//#F5F5F5
  render () {

    if (this.state.fontsLoaded) {

      return (
        <View>
            <View>
              <View onTouchEnd={() => {this.setDrawerVisible()}} style={{ flex: 1, alignSelf: 'stretch', flexDirection: 'row', marginTop: 3 }}>
                <View style={{ flex: 1, alignSelf: 'flex-start', backgroundColor: '#f8f8ff', flexGrow: 3, paddingLeft: 5, paddingTop: 15, paddingBottom: 15, borderTopLeftRadius: 5, borderStyle: 'solid', borderLeftColor: '#6f00ff', borderLeftWidth: 4 }}> 
                  <Text style={{fontSize: 16, fontFamily: 'Quicksand-SemiBold'}}> {this.props.billName} </Text>
                </View>
                <View style={{ flex: 1, alignItems:'center', backgroundColor: '#f8f8ff', flexGrow: 1, paddingTop: 15, paddingBottom: 15, borderTopRightRadius: 15, borderStyle: 'solid',}}> 
                  <Text style={{fontSize: 16}}> ${this.props.billAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} </Text>
                </View>
              </View>
              <View style={{ flex: 1, alignSelf: 'stretch', flexDirection: 'row', backgroundColor: '#f8f8ff', borderBottomLeftRadius: 5, borderBottomRightRadius: 15, borderStyle: 'solid', borderLeftColor: '#6f00ff', borderLeftWidth: 4}}>
                <View style={{ flex: 1, alignSelf: 'stretch', flexGrow: 3, paddingTop: 1, paddingBottom: 5, paddingLeft: 5,}}> 
                  <Text style={{fontSize: 10, fontFamily: 'SpecialElite-Regular'}}> Due: {this.props.dueDate} </Text>
                </View>
                <View style={{ flex: 1, alignSelf: 'stretch', flexGrow: 5, paddingTop: 1, paddingBottom: 5, paddingLeft: 5,}}> 
                  <Text style={{fontSize: 10}}> {this.state.fundingSourceName + ' ' + this.state.fundingSourceAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} </Text>
                </View>
                {this.props.showMarkAsPaid 
                ?
                <View style={{ flex: 1, alignSelf: 'stretch', flexGrow: 1, backgroundColor: this.state.colorIfPaid, paddingTop: 1, paddingBottom: 5, paddingLeft: 5, borderTopLeftRadius: 10, borderBottomLeftRadius: 10, borderBottomRightRadius: 10}}> 
                  <Text style={{color: this.state.textColorIfPaid, fontSize: 10}}> {this.state.paidDisplayText} </Text>
                </View>
                :
                <Text />
                }
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
               />
                :
                <View />
              }          
            </View>
          </View>
      );
    } else {
          return (
            <View><Text>Fonts are still loading</Text></View>
          )
        }

    }
  }


  export default UnplannedBillDisplay;