import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, ScrollView, RefreshControl } from 'react-native';
import { Container, Button, Content, Form, Item, Input} from 'native-base';
import SummaryWrapper from './Components/summaryWrapper';
import UnplannedBillWrapper from './Components/unplannedBillWrapper';
import PlannedBillWrapper from './Components/plannedBillWrapper';
import { thisExpression } from '@babel/types';
import AppHeader from './Components/appheader';
import ApiMethods from './utilities/apiMethods';



const style = require("./Styles/Styles");


const afterSpendingData = [
  {
    date: '10/1',
    name: 'Paycheck 1',
    amount: '50'
  },
  {
    date: '10/15',
    name: 'Paycheck 2',
    amount: '250'
  },
]

function wait(timeout) {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}

export default class App extends Component {
  state = {
    due_date: '',
    edited_bill_due_date: '',
    bill_name: '',
    edited_bill_name: '',
    amount_due: '',
    edited_bill_amount: '',
    currentUnPlannedExpensesFromDB: [],
    currentPlannedExpensesFromDB: [],
    income_name: '',
    income_date: '',
    income_amount: '',
    currentIncomeFromDB: [],
    afterSpendingData: afterSpendingData,
    currentTotalIncome: 0,
    afterSpendingIncomeTotal: 0,
    recentlyAdded: false,
    afterSpendingClicked: false,
    refreshing: false
  };

  componentDidMount(){
    this.fetchData();
  }

  fetchData = () => {
    this.getTotalIncome();
    this.getIncomeDataFromDB();
    this.getUnPlannedExpenseDataFromDB();
    this.getPlannedExpenseDataFromDB();
  }

  onRefresh = () => {
    this.setState({refreshing: true});
    wait(200).then(() => {
      this.fetchData();
      this.setState({refreshing: false});
    });
  }

  getIncomeDataFromDB = () => {
    ApiMethods.getIncome().then(income => {
      this.setState({
        currentIncomeFromDB: income.data
      });
    });
    this.getTotalIncome();
  }

  getUnPlannedExpenseDataFromDB = () => {
    ApiMethods.getAllUnPlannedExpenses().then(expenses => {
      this.setState({
        currentUnPlannedExpensesFromDB: expenses.data
      });
    });
  }

  getPlannedExpenseDataFromDB = () => {
    ApiMethods.getAllPlannedExpenses().then(expenses => {
      this.setState({
        currentPlannedExpensesFromDB: expenses.data
      });
    });
  }

  handleIncomeName = text => {
    
    this.setState({
      income_name: text
    });
  };

  handleIncomeDate = text => {
    
    this.setState({
      income_date: text
    });
  };

  handleIncomeAmount = text => {
    
    this.setState({
      income_amount: text
    });
  };
  
  
  handleDueDate = text => {
    
    this.setState({
      due_date: text,
      edited_bill_due_date: text,
    });
  };
  
  
  handleBillName = text => {
    
    this.setState({
      bill_name: text,
      edited_bill_name: text,
    });
  };

  handleBillAmount = text => {
    
    this.setState({
      amount_due: text,
      edited_bill_amount: text,
    });
  };

  getTotalIncome = () => {

    if (!this.state.afterSpendingClicked) {
      let total = 0;
      this.state.currentIncomeFromDB.forEach(element => {
      total += parseFloat(element.amount);
      });

      this.setState({
        currentTotalIncome: total 
      });
    } else {
      let total = 0;
      this.state.afterSpendingData.forEach(element => {
      total += parseFloat(element.amount);
      });

      this.setState({
        afterSpendingIncomeTotal: total 
      });

    }
  }

  handleFormSubmit = event => {
    // Preventing the default behavior of the form submit (which is to refresh the page)
    event.preventDefault();
    ApiMethods.addExpense(this.state.bill_name, this.state.due_date, this.state.amount_due );
  };

  handleExpenseEditFormSubmit = (event, id) => {
    // Preventing the default behavior of the form submit (which is to refresh the page)
    event.preventDefault();
    ApiMethods.editExpense(id, this.state.edited_bill_name, this.state.edited_bill_due_date, this.state.edited_bill_amount);
  };

  handleAddIncomeFormSubmit = event => {
    // Preventing the default behavior of the form submit (which is to refresh the page)
    event.preventDefault();
    ApiMethods.addIncome(this.state.income_name, this.state.income_date, this.state.income_amount);
    this.getTotalIncome();
  };

  displayAfterSpendingData = (switcher) => {

    if (switcher === 'after') {
      this.setState({
        afterSpendingClicked: true
      });
    } else {
      this.setState({
        afterSpendingClicked: false
      });

    }
    
    this.getTotalIncome();
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
              switcherClicked={this.switcherClicked}
              switcherStyle={this.state.switcherClickedStyle}
              incomeDataFromDB={this.state.currentIncomeFromDB}
            />
            <UnplannedBillWrapper
              expenseDataFromDB={this.state.currentUnPlannedExpensesFromDB}
              incomeDataFromDB={this.state.currentIncomeFromDB}
              handleBillAmount={this.handleBillAmount}
              handleDueDate={this.handleDueDate}
              handleBillName={this.handleBillName} 
              handleFormSubmit={this.handleFormSubmit}
              fetchData={this.fetchData}
              handleExpenseEditFormSubmit={this.handleExpenseEditFormSubmit}
            />
            <PlannedBillWrapper
              expenseDataFromDB={this.state.currentPlannedExpensesFromDB}
              incomeDataFromDB={this.state.currentIncomeFromDB}
              handleBillAmount={this.handleBillAmount}
              handleDueDate={this.handleDueDate}
              handleBillName={this.handleBillName} 
              handleFormSubmit={this.handleFormSubmit}
              fetchData={this.fetchData}
              handleExpenseEditFormSubmit={this.handleExpenseEditFormSubmit} 
            />
          </View>
        </ScrollView>
      </Container>
    );
  }
}


