import React, { Component } from "react";
import { ActivityIndicator, View } from 'react-native';
import { Container, Header, Content, Card, CardItem, Text, Body } from "native-base";
import PlannedBillDisplay from './unplannedBillWrapperEmptyState';
import PlannedBillWrapperEmptyState from "./plannedBillWrapperEmptyState";
import UnPlannedBillDisplay from './billDisplay';
import style from "../Styles/Styles";

class PlannedBillWrapper extends Component {

  componentDidMount() {
    this.props.fetchData();
  }

  updatePlannedBillWrapperComponent = () => {
    this.componentDidMount();
  }
  render() {
      return (
          <Content padder style={style.unplanned_section}>
            <View> 
              <Text style={style.secondary_header}> Planned Bills and Expenses </Text>
            </View>
            {/* <PlannedBillWrapperEmptyState /> */}
            {this.props.showSpinner 
              ?
              <ActivityIndicator style={{ opacity: this.props.spinnerOpacity }} animating={this.props.showSpinner} size={this.props.spinnerSize} color="#40DBCE"/>
              :
              this.props.expenseDataFromDB.map(expense => 
                <UnPlannedBillDisplay
                  key={expense._id}
                  dueDate={expense.dateOfExpense}
                  billName={expense.nameOfExpense}
                  billAmount={expense.amountOfExpense}
                  billID={expense._id}
                  billIsPlanned={expense.isPlanned}
                  billIsPaid={expense.isPaid}
                  billFundingSourceID={expense.fundingSource}
                  incomeDataFromDB={this.props.incomeDataFromDB}
                  handleBillAmount={this.props.handleBillAmount}
                  handleDueDate={this.props.handleDueDate}
                  handleBillName={this.props.handleBillName}
                  loggedInUserID={this.props.loggedInUserID}
                  updateWrapperComponent={this.updatePlannedBillWrapperComponent}
                  showMarkAsPaid={true}
                  fetchData={this.props.fetchData}
                  isThisPlanned={true}
                />
                )
              }
          </Content>
      );
    }
  }

  export default PlannedBillWrapper;