import React, { Component } from "react";
import { View } from 'react-native';
import { Container, Header, Content, Card, CardItem, Text, Body } from "native-base";
import PlannedBillDisplay from './plannedBillDisplay';
import UnPlannedBillDisplay from './unplannedBillDisplay';
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
                <UnPlannedBillDisplay
                  key={expense._id}
                  dueDate={expense.dateOfExpense}
                  billName={expense.nameOfExpense}
                  billAmount={expense.amountOfExpense}
                  billID={expense._id}
                  billIsPlanned={expense.isPlanned}
                  billFundingSourceID={expense.fundingSource}
                  incomeDataFromDB={this.props.incomeDataFromDB}
                  handleBillAmount={this.props.handleBillAmount}
                  handleDueDate={this.props.handleDueDate}
                  handleBillName={this.props.handleBillName}
                />
                )}
          </Content>
      );
    }
  }

  export default PlannedBillWrapper;