import React, { Component } from 'react';
import { ActivityIndicator, Platform, StyleSheet, Text, View, ScrollView, RefreshControl } from 'react-native';
import { Container, Button, Content, Form, Item, Input} from 'native-base';
import SummaryWrapper from './summaryWrapper';
import UnplannedBillWrapper from './unplannedBillWrapper';
import PlannedBillWrapper from './plannedBillWrapper';
import { thisExpression } from '@babel/types';
import AppHeader from './appheader';
import ApiMethods from '../utilities/apiMethods';


const style = require("../Styles/Styles");

function wait(timeout) {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}

export default class MainPage extends Component {
  state = {
    due_date: '',
    bill_name: '',
    amount_due: '',
    currentUnPlannedExpensesFromDB: [],
    currentPlannedExpensesFromDB: [],
    income_name: '',
    income_date: '',
    income_amount: '',
    currentIncomeFromDB: [],
    afterSpendingData: [],
    monthData: [],
    currentMonthID: this.props.currentMonthID,
    currentMonth: this.props.currentMonth,
    currentTotalIncome: 0,
    afterSpendingIncomeTotal: 0,
    recentlyAdded: false,
    afterSpendingClicked: false,
    refreshing: false,
    signedIn: false,
    loggedInUsersEmail: this.props.loggedInUsersEmail,
    loggedInUserID: "",
    photoUrl: "",
    spinnerSize: 20,
    spinnerOpacity: 1,
    showSpinner: true
  };

  componentDidMount(){
    this.getLoggedInUserIdByEmail(this.state.loggedInUsersEmail);
  }

  fetchData = () => {
    this.getPlannedExpenseDataFromDB();
    this.getIncomeDataFromDB();
    this.getUnPlannedExpenseDataFromDB();
    this.getMonthDataFromDB();
    this.getTotalIncome();
    setTimeout(() => {this.setState({spinnerSize: 0, spinnerOpacity: 0, showSpinner: false})}, 4500);
  }

  onRefresh = () => {
    this.setState({refreshing: true});
    wait(200).then(() => {
      this.setState({spinnerSize: 20, spinnerOpacity: 1, showSpinner: true})
      this.fetchData();
      this.setState({refreshing: false});
    });
  }

  updateComponent = () => {
    this.setState({state: this.state});
  }

  getLoggedInUserIdByEmail = (email) => {
    ApiMethods.getUserByEmail(email)
    .then(data => 
          this.setState({
            loggedInUserID: data.data[0]._id 
          }, 
          
          () => {
            this.fetchData();
          })
        )
    .catch(err => console.log(err))
  }

  getIncomeDataFromDB = () => {
    return ApiMethods
            .getIncomeByUserID(this.state.loggedInUserID, this.state.currentMonthID)
            .then(income => {
              
                this.setState({
                  currentIncomeFromDB: income.data
                  },
                    () => {
                      this.getTotalIncome();
                  })
              })
            .catch(err => console.log(err))
  }

  getUnPlannedExpenseDataFromDB = () => {
    return ApiMethods.getAllUnPlannedExpenses(this.state.loggedInUserID).then(expenses => {
              this.setState({
                currentUnPlannedExpensesFromDB: expenses.data
              });
            })
            .catch(err => console.log(err));
  }

  selectNewMonth = (month, monthID) => {
    this.setState({currentMonth: month, currentMonthID: monthID}, () => {this.fetchData();});
  }

  getMonthDataFromDB = () => {
    return ApiMethods.getMonthData()
    .then(monthDataArrayFromDB => {
      this.setState({
        monthData: monthDataArrayFromDB.data
      });
    })
    .catch(err => console.log(err));
  }

  getPlannedExpenseDataFromDB = () => {
    return ApiMethods.getAllPlannedExpenses(this.state.loggedInUserID)
    .then(expenses => {
      this.setState({
        currentPlannedExpensesFromDB: expenses.data
      });
    })
    .catch(err => console.log(err));
  }

  updateExpensesOnUserRecord = () => {
    ApiMethods.updateExpensesOnUserRecord(this.state.loggedInUserID).then(data => res.json(data)).catch(err => console.log(err));
  }

  handleIncomeName = text => {
    
    this.setState({
      income_name: text
    });
  };

  handleIncomeDate = (incomeDate) => {
    
    this.setState({
      income_date: incomeDate.toString().substr(4, 12)
    });
  };

  handleIncomeAmount = text => {
    
    this.setState({
      income_amount: text
    });
  };
  
  handleDueDate = (dueDate) => {
    
    this.setState({
      due_date: dueDate.toString().substr(4, 12),
    });
  };
  
  
  handleBillName = text => {
    
    this.setState({
      bill_name: text,
    });
  };

  handleBillAmount = text => {
    
    this.setState({
      amount_due: text,
    });
  };

  getTotalIncome = () => {
    if (!this.state.afterSpendingClicked) {
      let totalIncome = 0;
      this.state.currentIncomeFromDB.forEach(element => {
      totalIncome += parseFloat(element.amount);
      });

      this.setState({
        currentTotalIncome: totalIncome
      });

      return totalIncome;

    } else {
      let totalIncome = 0;
      let totalSpent = 0;
      let afterSpendingIncomeTotal = 0;
      
      this.state.currentIncomeFromDB.forEach(element => {
        totalIncome += parseFloat(element.amount);
        });
      
      
      this.state.currentPlannedExpensesFromDB.forEach(element => {
      totalSpent += parseFloat(element.amountOfExpense);
      });

      afterSpendingIncomeTotal = totalIncome - totalSpent;

      this.setState({
        afterSpendingIncomeTotal: afterSpendingIncomeTotal 
      });

      return afterSpendingIncomeTotal;
    }
  }

  handleFormSubmit = event => {
    // Preventing the default behavior of the form submit (which is to refresh the page)
    event.preventDefault();
    ApiMethods
    .addExpense(this.state.bill_name, this.state.due_date, this.state.amount_due, this.state.loggedInUserID, this.state.currentMonthID)
    .then(data => res.json(data))
    .catch(err => console.log(err))
  };

  handleAddIncomeFormSubmit = event => {
    // Preventing the default behavior of the form submit (which is to refresh the page)
    event.preventDefault();

    ApiMethods.addIncome(this.state.income_name, this.state.income_date, this.state.income_amount, this.state.loggedInUserID, this.state.currentMonthID)
    .then(data => res.json(data))
    .catch(err => console.log(err));

    this.getTotalIncome();
  }

  displayAfterSpendingData = (switcher) => {

    if (switcher === 'after') {
      this.setState({
        afterSpendingClicked: true
      },
      () => {
        this.getTotalIncome();
      });
    } else {
      this.setState({
        afterSpendingClicked: false
      },
      () => {
        this.getTotalIncome();
      });
    }
  };

  render() {
    return (
        <Container  style={style.container}>
          <AppHeader />
          <ScrollView
          refreshControl={
            <RefreshControl 
              refreshing={this.state.refreshing} 
              onRefresh={this.onRefresh}/>
          }
          >
            <View>
              <SummaryWrapper 
                incomeDataFromDB={!this.state.afterSpendingClicked ? this.state.currentIncomeFromDB : this.state.afterSpendingData}
                displayAfterSpendingData={this.displayAfterSpendingData}
                handleIncomeAmount={this.handleIncomeAmount}
                handleIncomeDate={this.handleIncomeDate}
                handleIncomeName={this.handleIncomeName}
                handleAddIncomeFormSubmit={this.handleAddIncomeFormSubmit}
                currentTotalIncome={!this.state.afterSpendingClicked ? this.state.currentTotalIncome : this.state.afterSpendingIncomeTotal}
                switcherClicked={this.state.afterSpendingClicked}
                switcherStyle={this.state.switcherClickedStyle}
                incomeDataFromDB={this.state.currentIncomeFromDB}
                loggedInUserID={this.state.loggedInUserID}
                fetchData={this.fetchData}
                spinnerSize={this.state.spinnerSize}
                spinnerOpacity={this.state.spinnerOpacity}
                showSpinner={this.state.showSpinner}
                monthData={this.state.monthData}
                currentMonth={this.state.currentMonth}
                currentMonthID={this.state.currentMonthID}
                selectNewMonth={this.selectNewMonth}
              />
              <UnplannedBillWrapper
                expenseDataFromDB={this.state.currentUnPlannedExpensesFromDB}
                incomeDataFromDB={this.state.currentIncomeFromDB}
                getUnPlannedExpenseDataFromDB={this.getUnPlannedExpenseDataFromDB}
                handleBillAmount={this.handleBillAmount}
                handleDueDate={this.handleDueDate}
                updateComponent={this.updateComponent}
                updateExpensesOnUserRecord={this.updateExpensesOnUserRecord}
                handleBillName={this.handleBillName} 
                handleFormSubmit={this.handleFormSubmit}
                loggedInUserID={this.state.loggedInUserID}
                fetchData={this.fetchData}
                spinnerSize={this.state.spinnerSize}
                spinnerOpacity={this.state.spinnerOpacity}
                showSpinner={this.state.showSpinner}
                currentMonth={this.state.currentMonth}
                currentMonthID={this.state.currentMonthID}
              />
              <PlannedBillWrapper
                expenseDataFromDB={this.state.currentPlannedExpensesFromDB}
                incomeDataFromDB={this.state.currentIncomeFromDB}
                handleBillAmount={this.handleBillAmount}
                handleDueDate={this.handleDueDate}
                handleBillName={this.handleBillName} 
                handleFormSubmit={this.handleFormSubmit}
                loggedInUserID={this.state.loggedInUserID}
                fetchData={this.fetchData}
                updateExpensesOnUserRecord={this.updateExpensesOnUserRecord}
                spinnerSize={this.state.spinnerSize}
                spinnerOpacity={this.state.spinnerOpacity}
                showSpinner={this.state.showSpinner}
                currentMonth={this.state.currentMonth}
                currentMonthID={this.state.currentMonthID}
              />
            </View>
          </ScrollView>
        </Container>
    );
  }
}
