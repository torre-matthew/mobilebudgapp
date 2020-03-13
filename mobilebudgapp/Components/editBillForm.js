import React, { Component } from 'react';
import { View, Dimensions, TouchableOpacity, Picker } from 'react-native';
import { Container, Content, Form, Item, Input, Text } from 'native-base';
import style from "../Styles/Styles";

class EditBillFormDisplay extends Component {
    state = {
        date: "",
        name: "",
        amount: "",
        incomeDataFromDB: []
        }

componentDidMount(){
    this.editLogic();
}

// This function changes the contents of the edit form depending on if it's a bill or an income entry that's being edited.
editLogic = () => {
    switch (this.props.whatsBeingEdited) {
        case "bill":
            this.setState({
                date: this.props.dueDate,
                name: this.props.billName,
                amount: this.props.billAmount,
                incomeDataFromDB: this.props.incomeDataFromDB
            });
            break;
        case "income":
            this.setState({
                date: this.props.incomeDate,
                name: this.props.incomeName,
                amount: this.props.incomeAmount,
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
                                <Input defaultValue={this.state.date} placeholder='Due Date' onChange={this.props.handleDueDate} />
                            </Item>
                            <Item>
                                <Input defaultValue={this.state.name} placeholder='Bill/Expense' onChangeText={this.props.handleBillName} />
                            </Item>
                            <Item>
                                <Input defaultValue={this.state.amount} keyboardType='numeric' placeholder="Amount" onChangeText={this.props.handleBillAmount} />
                            </Item>
                            {this.state.editing = "bill" ?
                            <Item>
                            <Picker
                            prompt="Select Funding Source"
                            selectedValue={this.state.income}
                            style={{height: 50, width: 500}}
                            onValueChange={(itemValue, itemIndex) => {this.setState({income: itemValue})}
                            }>
                             <Picker.Item label="None" value="" />
                                {this.state.incomeDataFromDB.map(income => 
                                    <Picker.Item 
                                        label={income.name + " - " + "$" + income.amount + " recieved " + income.date} 
                                        value={income._id} 
                                        key={income.name + "-" + income.amount}
                                        />
                                    )}                        
                            </Picker>
                            </Item>
                            : '' 
                            }
                            <View style={{ alignItems: 'center' }}>
                            <TouchableOpacity
                                onPressIn={this.props.handleExpenseEditFormSubmit} 
                                onPress={this.props.closeModalOnSubmit}
                                style={style.button_style_form}>
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