import React, { Component } from "react";
import { Container, Header, Content, Card, CardItem, Text, Body, View } from "native-base";
import TotalCashFlowDisplay from './totalCashFlowDisplay';
import IncomeDisplay from './incomeDisplay';
import AddEntryModal from "./addIncomeModal";
import IncomeSummarySwitcher from "./incomeSummarySwitcher";
import style from "../Styles/Styles";

function SummaryWrapper (props) {
    return (
            <Content padder style={style.summary_section}>
                <View> 
                    <Text style={style.summary_section_header}> April </Text>
                    <Text style={style.summary_section_header_secondary}> Income Summary </Text>
                </View>
                <IncomeSummarySwitcher 
                    switcherClicked={props.switcherClicked}
                    switcherStyle={props.switcherClickedStyle}
                    displayAfterSpendingData={props.displayAfterSpendingData}
                />
                <TotalCashFlowDisplay 
                    currentTotalIncome={props.currentTotalIncome}
                />
                {/* {props.incomeData.map(income => 
                <IncomeDisplay
                key={income.income_name + "-" + income.income_amount + "-" + Math.floor((Math.random() * 100000) + 1)}
                incomeName={income.income_name}
                incomeDate={income.income_date}
                incomeAmount={income.income_amount}
                />
                )} */}
                {props.incomeDataFromDB.map(income => 
                <IncomeDisplay
                key={income.name + "-" + income.amount + "-" + Math.floor((Math.random() * 100000) + 1)}
                incomeName={income.name}
                incomeDate={income.date}
                incomeAmount={income.amount}
                />
                )}

                <AddEntryModal
                handleIncomeAmount={props.handleIncomeAmount}
                handleIncomeDate={props.handleIncomeDate}
                handleIncomeName={props.handleIncomeName}
                handleAddIncomeFormSubmit={props.handleAddIncomeFormSubmit}
                />
            </Content>
    );
  }

  export default SummaryWrapper;