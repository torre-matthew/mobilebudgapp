import React, { Component} from "react";
import { View } from 'react-native';
import UnplannedBillDisplay from './unplannedBillDisplay';
import { Container, Header, Content, Card, CardItem, Text, Body } from "native-base";
import AddBillModal from "./addBillModal";
import style from "../Styles/Styles";

class UnplannedBillWrapper extends Component {

  componentDidMount() {
    this.props.fetchData();
    
  }

  updateUnplannedBillWrapperComponent = () => {
    this.componentDidMount();
    this.props.updateExpensesOnUserRecord();
  }

  render(){
      return (
          <Content padder style={ style.unplanned_section }>
            <View> 
              <Text style={style.secondary_header}> Unplanned Bills and Expenses </Text>
            </View>
            {this.props.expenseDataFromDB.map(expense => 
            <UnplannedBillDisplay
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
              updateWrapperComponent={this.updateUnplannedBillWrapperComponent}
            />
            )}

            <AddBillModal
              handleBillAmount={this.props.handleBillAmount}
              handleDueDate={this.props.handleDueDate}
              handleBillName={this.props.handleBillName}
              handleFormSubmit={this.props.handleFormSubmit}
              fetchData={this.props.fetchData}
              getUnPlannedExpenseDataFromDB={this.props.getUnPlannedExpenseDataFromDB}
              updateWrapperComponent={this.updateUnplannedBillWrapperComponent}
              updateExpensesOnUserRecord={this.props.updateExpensesOnUserRecord}
            />
          </Content>
      );
    }
  }

  export default UnplannedBillWrapper;