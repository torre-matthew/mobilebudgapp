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
    categoryIcon: "question-circle",
    categoryIconColor: "grey"
  };

  componentDidMount() {
    this.getFundingSourceInfo(this.props.billID);
    this.changeDisplayWhenMarkedAsPaid();
    this.categoryIconLogic();
  }

  updateBillDisplayComponent = () => {
    this.componentDidMount();
    this.props.updateWrapperComponent();
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

  moveToNextMonth = (billID) => {
    Alert.alert(
      'Move ' + this.props.billName + ' to next month?',
      '',
      [ 
        {text: 'Nevermind', style: 'cancel'},
        {text: 'Ok', onPress: () => {
          ApiMethods.moveToNextMonth(billID).then(data => {return data}).catch(err => console.log(err));
          this.updateBillDisplayComponent();
        }, 
      },
        ],
      {cancelable: false},
    );
  }

selectFundingSource = (fundingSourceID) => {
  Alert.alert(
    'Plan ' + this.props.billName + ' with this income?',
    '',
    [ 
      {text: 'Nevermind', style: 'cancel'},
      {text: 'Ok', onPress: () => {
        ApiMethods.editExpense(this.props.billID, this.props.billName, this.props.dueDate, this.props.billAmount, true, fundingSourceID, this.props.loggedInUserID)
            .then(res => {
                if (res.data.nModified === 0) {
                    alert('Sorry, there was a problem. Please try again');
                } else {
                    this.updateBillDisplayComponent();
                    this.props.navigation.navigate('Main');
                }
                })
            .catch(err => console.log(err));
      }, 
    },
      ],
    {cancelable: false},
  );

  }



  markAsUnplanned = () => {

    Alert.alert(
      'Not ready to plan ' + this.props.billName + '?',
      'I will move this back to unplanned bills and expenses.',
      [ 
        {text: 'Nevermind', style: 'cancel'},
        {text: 'Ok', onPress: () => {
          ApiMethods.editExpense(this.props.billID, this.props.billName, this.props.dueDate, this.props.billAmount, false, "", this.props.loggedInUserID)
            .then(res => {
                if (res.data.nModified === 0) {
                    alert('Sorry, there was a problem. Please try again');
                } else {
                    this.componentDidMount();
                    this.props.updateWrapperComponent();
                }
                })
            .catch(err => console.log(err));
        }, 
      },
        ],
      {cancelable: false},
    );

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

categoryIconLogic = () => {
  switch (this.props.billCategoryName) {
    case "Bills and Utilities":
      case "Bills and Utilities":
        this.setState({
          categoryIcon: Categories.billsAndUtilities.icon,
          categoryIconColor: Categories.billsAndUtilities.iconColor
          });
        break;
      case "Debt":
        this.setState({
          categoryIcon: Categories.debt.icon,
          categoryIconColor: Categories.debt.iconColor
          });
        break;
      case "Housing":
        this.setState({
          categoryIcon: Categories.housing.icon,
          categoryIconColor: Categories.housing.iconColor
          });
        break;
      case "Non Recurring Expense":
        this.setState({
          categoryIcon: Categories.nonRecurringExpense.icon,
          categoryIconColor: Categories.nonRecurringExpense.iconColor
          });
        break;
      case "Personal Spending":
        this.setState({
          categoryIcon: Categories.personalSpending.icon,
          categoryIconColor: Categories.personalSpending.iconColor
          });
        break;
      case "Savings":
      this.setState({
        categoryIcon: Categories.savings.icon,
        categoryIconColor: Categories.savings.iconColor
        });
        break;
      case "Subscriptions & Memberships":
      this.setState({
        categoryIcon: Categories.subscriptionsAndMemberships.icon,
        categoryIconColor: Categories.subscriptionsAndMemberships.iconColor
        });
        break;
    }
}
//#F5F5F5
  render () {
      return (
        <View>
            <View>
              <View onTouchEnd={() => {this.setDrawerVisible()}} style={{ flex: 1, alignSelf: 'stretch', flexDirection: 'row', marginTop: 3 }}>
                <View style={{ flex: 1, alignSelf: 'flex-start', backgroundColor: '#f8f8ff', flexGrow: 0.5, paddingLeft: 8, paddingTop: 10, paddingBottom: 5, borderTopLeftRadius: 5, borderStyle: 'solid', borderLeftColor: this.state.categoryIconColor, borderLeftWidth: 4 }}> 
                  <FontAwesome5 name={this.state.categoryIcon} size={16} color={this.state.categoryIconColor} />
                </View>
                <View style={{ flex: 1, alignSelf: 'flex-start', backgroundColor: '#f8f8ff', flexGrow: 6, paddingTop: 10, paddingBottom: 5}}> 
                  <Text style={{fontSize: 14, fontFamily: "Laila-SemiBold"}}> {this.props.billName.substring(0, 75)} </Text>
                </View>
                <View style={{ flex: 1, alignItems:'flex-start', backgroundColor: '#f8f8ff', flexGrow: 2, paddingTop: 10, paddingBottom: 5, borderTopRightRadius: 15}}> 
                  <Text style={{fontSize: 14, fontFamily: "Laila-SemiBold"}}> ${this.props.billAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} </Text>
                </View>
              </View>
              <View style={{ flex: 1, alignSelf: 'stretch', flexDirection: 'row', backgroundColor: '#f8f8ff', borderBottomLeftRadius: 5, borderBottomRightRadius: 15, borderStyle: 'solid', borderLeftColor: this.state.categoryIconColor, borderLeftWidth: 4}}>
                <View style={{ flex: 1, alignSelf: 'stretch', flexGrow: 3, paddingTop: 1, paddingBottom: 5, paddingLeft: 5,}}> 
                  <Text style={{fontSize: 10, fontFamily: "Laila-SemiBold"}}> Due: {this.props.dueDate} </Text>
                </View>
                <View style={{ flex: 1, alignSelf: 'stretch', flexGrow: 5, paddingTop: 1, paddingBottom: 5, paddingLeft: 5,}}> 
                  <Text style={{fontSize: 10, fontFamily: "Laila-SemiBold"}}> {this.state.fundingSourceName + ' ' + this.state.fundingSourceAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} </Text>
                </View>
                {this.props.showMarkAsPaid 
                ?
                <View style={{ flex: 1, alignSelf: 'stretch', flexGrow: 1, backgroundColor: this.state.colorIfPaid, paddingTop: 1, paddingBottom: 5, paddingLeft: 5, borderTopLeftRadius: 10, borderBottomLeftRadius: 10, borderBottomRightRadius: 10}}> 
                  <Text style={{color: this.state.textColorIfPaid, fontSize: 10, fontFamily: "Laila-SemiBold"}}> {this.state.paidDisplayText} </Text>
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