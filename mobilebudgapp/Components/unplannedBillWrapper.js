import React, { Component} from "react";
import { ActivityIndicator, View, ScrollView } from 'react-native';
import UnplannedBillDisplay from './billDisplay';
import { Container, Header, Content, Card, CardItem, Text, Body } from "native-base";
// import AddBillModal from "./addBillModal";
import style from "../Styles/Styles";
import EmptyStateDisplay from "./unplannedBillWrapperEmptyState";
import BillSwitcher from "./billSwitcher";

class UnplannedBillWrapper extends Component {

  componentDidMount() {
    this.props.fetchData();
  }

  updateUnplannedBillWrapperComponent = () => {
    this.componentDidMount();
  }
  

  render(){
      return (
          <Content padder style={ style.unplanned_section }>
              <View style={{marginTop: 6, marginBottom: 1, marginLeft: 7}}> 
                <Text style={{fontSize: 15, color: '#4A0784', fontFamily: 'Laila-SemiBold'}}> Bills and Expenses: </Text>
              </View>
            <BillSwitcher
              switcherLogic={this.props.switcherLogic}
              plannedClicked={this.props.plannedClicked} 
            />
            {this.props.showSpinner 
              ?
              <ActivityIndicator style={{ opacity: this.props.spinnerOpacity }} animating={this.props.showSpinner} size={this.props.spinnerSize} color="#40DBCE"/>
              :
            this.props.expenseDataFromDB.map(expense => 
            <UnplannedBillDisplay
              key={expense._id}
              dueDate={expense.dateOfExpense}
              billName={expense.nameOfExpense}
              billAmount={expense.amountOfExpense}
              billID={expense._id}
              billIsPlanned={expense.isPlanned}
              billIsPaid={expense.isPaid}
              forBillTracker={expense.forBillTracker}
              billFundingSourceID={expense.fundingSource}
              billCategoryName={expense.categoryName}
              billCategoryID={expense.categoryID}
              incomeDataFromDB={this.props.incomeDataFromDB}
              handleBillAmount={this.props.handleBillAmount}
              handleDueDate={this.props.handleDueDate}
              handleBillName={this.props.handleBillName}
              loggedInUserID={this.props.loggedInUserID}
              updateWrapperComponent={this.updateUnplannedBillWrapperComponent}
              showMarkAsPaid={this.props.plannedClicked}
              fetchData={this.props.fetchData}
              isThisPlanned={this.props.plannedClicked}
              navigation={this.props.navigation}
              showDrawerAndOverLayLogic={this.props.showDrawerAndOverLayLogic}
              hideDrawerAndOverLayLogic={this.props.hideDrawerAndOverLayLogic}
              show={this.props.show}
              componentUpdateSwitch={this.props.componentUpdateSwitch}
              refresh={this.props.refresh}
            />
            )
          }
            {/* <EmptyStateDisplay /> */}
            {/* <AddBillModal
              handleBillAmount={this.props.handleBillAmount}
              handleDueDate={this.props.handleDueDate}
              handleBillName={this.props.handleBillName}
              handleFormSubmit={this.props.handleFormSubmit}
              fetchData={this.props.fetchData}
              getUnPlannedExpenseDataFromDB={this.props.getUnPlannedExpenseDataFromDB}
              updateWrapperComponent={this.updateUnplannedBillWrapperComponent}
              updateExpensesOnUserRecord={this.props.updateExpensesOnUserRecord}
            /> */}
          </Content>
      );
    }
  }

  export default UnplannedBillWrapper;