import React, { Component } from 'react';
import { View, Dimensions, TouchableOpacity, Picker, Alert } from 'react-native';
import { Container, Button, Content, Form, Item, Input, Text } from 'native-base';
import style from "../Styles/Styles";
import DatePicker from "./datePicker";
import ApiMethods from '../utilities/apiMethods';

class EditBillFormDisplay extends Component {
    state = {
        currentDate: "",
        newDate: "",
        currentName: "",
        newName:"",
        currentAmount: "",
        newAmount:"",
        incomeDataFromDB: [],
        isPlanned: "",
        fundingSourceID:"",
        newFundingSourceID:"",
        fundingSourceDisplay:"",
        chosenPickerValue:"",
        amountEditable: true,
        unEditableAmountMessage: ""
        }

componentDidMount() {
    this.editLogic();

    if (this.props.switcherClicked && this.props.whatsBeingEdited === "income") {
        this.setState({amountEditable: false, unEditableAmountMessage: " - not editable"})
    } else {
        this.setState({amountEditable: true})
    }
}

showExpenseConfirmationAlert = (id, name, date, amount, isPlanned, fundingSource, loggedInUserID) => {

    Alert.alert(
      'Edit Confirmation',
      'Name: ' + name + ' Date: ' + date + ' Amount: ' + amount,
      [ 
        {text: 'Nevermind', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: "Yes, that's correct", onPress: () => {
            ApiMethods.editExpense(id, name, date, amount, isPlanned, fundingSource, loggedInUserID)
            .then(res => {
                if (res.data.nModified === 0) {
                    alert('Sorry, there was a problem. Please try again');
                } else {
                    this.props.closeModalOnSubmit();
                    this.props.updateWrapperComponent();
                    // Alert.alert('', 'Successfully updated',[{text: 'OK'}] );
                }
                })
            .catch(err => console.log(err));
            }
        },
        ],
      {cancelable: false},
    );
  }

  showIncomeConfirmationAlert = (id, name, date, amount) => {

    Alert.alert(
      'Edit Confirmation',
      'Name: ' + name + ' Date: ' + date + ' Amount: ' + amount,
      [ 
        {text: 'Nevermind', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: "Yes, that's correct", onPress: () => {
            ApiMethods.editIncome(id, name, date, amount).then(res => {
              if (res.data.nModified === 0) {
                alert('Sorry, there was a problem. Please try again');
              } else {
                  this.props.closeModalOnSubmit();
                  this.props.updateWrapperComponent();
                // Alert.alert('', 'Successfully updated',[{text: 'OK'}] );
              }
            });
            }
        },
        ],
      {cancelable: false},
    );
  }


chooseFundingSource = (value, index) => {

    if (value === "none") {
        this.setState(
            {
            chosenPickerValue: value,
            isPlanned: false,
            fundingSourceID: "",
            newFundingSourceID: "",
            })        
    } else {
        this.setState({
            chosenPickerValue: value,
            fundingSourceID: value,
            isPlanned: true
            })
    }
}

editField = (text, input) => {

    switch (input) {
        case "date":
            this.setState({
                newDate: text,
              });
            break;
        case "name":
            this.setState({
                newName: text,
              });
            break;
        case "amount":
            this.setState({
                newAmount: text,
              });
    }
  };

handleExpenseEditFormSubmit = (event, id, nameChecker, dateChecker, amountChecker, isPlanned, fundingSource, loggedInUserID) => {
    event.preventDefault();

    let name;
    let date;
    let amount;

    if (dateChecker === "") {
        date = this.state.currentDate
    } else {
        date = dateChecker
    }

    if (nameChecker === "") {
        name = this.state.currentName
    } else {
        name = nameChecker
    }

    if (amountChecker === "") {
        amount = this.state.currentAmount
    } else {
        amount = amountChecker
    }
    
    this.showExpenseConfirmationAlert(id, name, date, amount, isPlanned, fundingSource, loggedInUserID);

  };

  handleIncomeEditFormSubmit = (event, id, nameChecker, dateChecker, amountChecker) => {
    event.preventDefault();

    let name;
    let date;
    let amount;

    if (dateChecker === "") {
        date = this.state.currentDate
    } else {
        date = dateChecker
    }

    if (nameChecker === "") {
        name = this.state.currentName
    } else {
        name = nameChecker
    }

    if (amountChecker === "") {
        amount = this.state.currentAmount
    } else {
        amount = amountChecker
    }
 
    this.showIncomeConfirmationAlert(id, name, date, amount);

  };

// This function changes the contents of the edit form depending on if it's a bill or an income entry that's being edited.
editLogic = () => {
    switch (this.props.whatsBeingEdited) {
        case "bill":
            this.setState({
                currentDate: this.props.dueDate,
                currentName: this.props.billName,
                currentAmount: this.props.billAmount,
                incomeDataFromDB: this.props.incomeDataFromDB,
                isPlanned: this.props.billIsPlanned,
                fundingSourceID: this.props.billFundingSourceID
            });
            break;
        case "income":
            this.setState({
                currentDate: this.props.incomeDate,
                currentName: this.props.incomeName,
                currentAmount: this.props.incomeAmount,
                incomeDataFromDB: []
            });
    }
}

    render () {
        return (
                <Content>
                    <View style={{marginTop: 55}}>
                        <Form id="billForm">
                            <Item>
                                <DatePicker defaultValue={this.state.currentDate} editDueDate={this.editField} />
                            </Item>
                            <Item>
                                <Input defaultValue={this.state.currentName} placeholder='Bill/Expense' onChangeText={(text) => this.editField(text, "name")} />
                            </Item>
                            <Item>
                                <Input defaultValue={this.state.currentAmount + this.state.unEditableAmountMessage} keyboardType='numeric' editable={this.state.amountEditable} placeholder="Amount" onChangeText={(text) => this.editField(text, "amount")} />
                            </Item>
                            {this.props.whatsBeingEdited === "bill" ?
                            <Item>
                            <Picker
                            prompt="Select Funding Source"
                            selectedValue={this.state.chosenPickerValue}
                            style={{height: 50, width: 400}}
                            onValueChange={(itemValue, itemIndex) => this.chooseFundingSource(itemValue, itemIndex)} >
                             <Picker.Item 
                                label={this.props.fundingSourceName + " " + this.props.fundingSourceAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " (current)"} 
                                value={this.props.billFundingSourceID} 
                                key={this.props.billFundingSourceID} />
                                {this.state.incomeDataFromDB.map(income => 
                                    <Picker.Item
                                        label={income.name + ": " + "$" + income.afterSpendingAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " remains"} 
                                        value={income._id} 
                                        key={income._id}
                                        />
                                    )}                        
                            </Picker>
                            </Item>
                            :<Text></Text>
                            }
                            <View style={{ alignItems: 'center' }}>
                            <TouchableOpacity
                                onPress={this.props.whatsBeingEdited === "bill" 
                                ? 
                                (event) => this.handleExpenseEditFormSubmit(event, this.props.billID, this.state.newName, this.state.newDate, this.state.newAmount, this.state.isPlanned, this.state.fundingSourceID, this.props.loggedInUserID)
                                :
                                (event) => this.handleIncomeEditFormSubmit(event, this.props.incomeID, this.state.newName, this.state.newDate, this.state.newAmount)
                                }
                                style={style.button_style}>
                                <Text> Submit </Text>
                            </TouchableOpacity>
                            </View>
                        </Form>
                    </View>
                </Content>
        );
    }
}

export default EditBillFormDisplay;