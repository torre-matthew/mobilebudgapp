import React, { Component} from "react";
import { View } from 'react-native';
import UnplannedBillDisplay from './unplannedBillDisplay';
import { Container, Header, Content, Card, CardItem, Text, Body } from "native-base";
import AddBillModal from "./addBillModal";
import style from "../Styles/Styles";

function UnplannedBillWrapper (props) {
    return (
        <Content padder style={ style.unplanned_section }>
          <View> 
            <Text style={style.secondary_header}> Unplanned Bills and Expenses </Text>
          </View>
          {props.expenseDataFromDB.map(expense => 
          <UnplannedBillDisplay
            key={expense.nameOfExpense + "-" + expense.amountOfExpense + "-" + Math.floor((Math.random() * 100000) + 1)}
            dueDate={expense.dateOfExpense}
            billName={expense.nameOfExpense}
            billAmount={expense.amountOfExpense}
            billID={expense._id}
            incomeDataFromDB={props.incomeDataFromDB}
          />
          )}

          <AddBillModal
            handleBillAmount={props.handleBillAmount}
            handleDueDate={props.handleDueDate}
            handleBillName={props.handleBillName}
            handleFormSubmit={props.handleFormSubmit}
          />
        </Content>
    );
  }

  export default UnplannedBillWrapper;