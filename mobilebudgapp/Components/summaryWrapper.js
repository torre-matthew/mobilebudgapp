import React, { Component } from "react";
import { ActivityIndicator, Dimensions, TouchableOpacity, Alert } from 'react-native';
import { Container, Header, Content, Card, CardItem, Text, Body, View } from "native-base";
import TotalCashFlowDisplay from './totalCashFlowDisplay';
import IncomeDisplay from './incomeDisplay';
import AddEntryModal from "./addIncomeModal";
import MonthPickerModal from "./monthPickerModal";
import IncomeSummarySwitcher from "./incomeSummarySwitcher";
import style from "../Styles/Styles";
import ApiMethods from '../utilities/apiMethods';

class SummaryWrapper extends Component {

    componentDidMount() {
        this.props.fetchData();
    }
    
    updateSummaryWrapperComponent = () => {
        this.componentDidMount();
      }

    render() {
        return (
                <Content padder style={style.summary_section}>
                    {this.props.showSpinner
                        ?
                        <ActivityIndicator style={{ opacity: this.props.spinnerOpacity }} animating={this.props.showSpinner} size={this.props.spinnerSize} color="#40DBCE"/>
                        :
                    <MonthPickerModal 
                        monthData={this.props.monthData} 
                        currentMonth={this.props.currentMonth}
                        currentMonthID={this.props.currentMonthID}
                        selectNewMonth={this.props.selectNewMonth}
                        fetchData={this.props.fetchData}
                        />
                    }   
                    <View>
                        <Text style={style.summary_section_header_secondary}> Income Summary </Text>
                    </View>
                    <IncomeSummarySwitcher 
                        switcherClicked={this.props.switcherClicked}
                        switcherStyle={this.props.switcherClickedStyle}
                        displayAfterSpendingData={this.props.displayAfterSpendingData}
                    />
                    <TotalCashFlowDisplay 
                        currentTotalIncome={this.props.currentTotalIncome}
                        spinnerSize={this.props.spinnerSize}
                        spinnerOpacity={this.props.spinnerOpacity}
                        showSpinner={this.props.showSpinner}
                    />
                    {this.props.showSpinner 
                        ?
                        <ActivityIndicator style={{ opacity: this.props.spinnerOpacity }} animating={this.props.showSpinner} size={this.props.spinnerSize} color="#40DBCE"/>
                        :
                    this.props.incomeDataFromDB.map(income => 
                    <IncomeDisplay
                        key={income._id}
                        incomeName={income.name}
                        incomeDate={income.date}
                        incomeAmount={this.props.switcherClicked ? income.afterSpendingAmount : income.amount}
                        incomeID={income._id}
                        handleIncomeAmount={this.props.handleIncomeAmount}
                        handleIncomeDate={this.props.handleIncomeDate}
                        handleIncomeName={this.props.handleIncomeName}
                        incomeDataFromDB={this.props.currentIncomeFromDB}
                        updateWrapperComponent={this.updateSummaryWrapperComponent}
                        switcherClicked={this.props.switcherClicked}
                        loggedInUserID={this.props.loggedInUserID}
                        fetchData={this.props.fetchData}
                    />
                    )
                }

                    <AddEntryModal
                    handleIncomeAmount={this.props.handleIncomeAmount}
                    handleIncomeDate={this.props.handleIncomeDate}
                    handleIncomeName={this.props.handleIncomeName}
                    handleAddIncomeFormSubmit={this.props.handleAddIncomeFormSubmit}
                    updateWrapperComponent={this.updateSummaryWrapperComponent}
                    loggedInUserID={this.props.loggedInUserID}
                    fetchData={this.props.fetchData}
                    currentMonthID={this.props.currentMonthID}
                    />
                </Content>
        );
    }
  }

  export default SummaryWrapper;