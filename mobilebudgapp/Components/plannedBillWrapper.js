import React, { Component } from "react";
import { View } from 'react-native';
import { Container, Header, Content, Card, CardItem, Text, Body } from "native-base";
import PlannedBillDisplay from './plannedBillDisplay';
import style from "../Styles/Styles";

class PlannedBillWrapper extends Component {

  componentDidMount() {
    this.props.fetchData();
  }
  render() {
      return (
          <Content padder style={style.unplanned_section}>
            <View> 
              <Text style={style.secondary_header}> Planned Bills and Expenses </Text>
            </View>
            {this.props.expenseDataFromDB.map(expense => 
                <PlannedBillDisplay
                  key={expense.nameOfExpense + "-" + expense.amountOfExpense + "-" + Math.floor((Math.random() * 100000) + 1)}
                  dueDate={expense.dateOfExpense}
                  billName={expense.nameOfExpense}
                  billAmount={expense.amountOfExpense}
                  billID={expense._id}
                  incomeDataFromDB={this.props.incomeDataFromDB}
                  handleBillAmount={this.props.handleBillAmount}
                  handleDueDate={this.props.handleDueDate}
                  handleBillName={this.props.handleBillName}
                  handleExpenseEditFormSubmit={this.props.handleExpenseEditFormSubmit}
                />
                )}
          </Content>
      );
    }
  }

  export default PlannedBillWrapper;