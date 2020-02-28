import React, { Component } from 'react';
import { View, Dimensions, TouchableOpacity, Picker } from 'react-native';
import { Container, Content, Form, Item, Input, Text } from 'native-base';
import FundingSourceDisplay from "./fundingSourceDisplay";
import style from "../Styles/Styles";

function EditBillFormDisplay (props) {
    return (
            <Content>
                <View style={{marginTop: 55}}>
                    <Form id="billForm">
                        <Item>
                            <Input defaultValue={props.dueDate} placeholder='Due Date' onChange={props.handleDueDate} />
                        </Item>
                        <Item>
                            <Input defaultValue={props.billName} placeholder='Bill/Expense' onChangeText={props.handleBillName} />
                        </Item>
                        <Item>
                            <Input defaultValue={props.billAmount} keyboardType='numeric' placeholder="Amount" onChangeText={props.handleBillAmount} />
                        </Item>
                        <Item>
                        <Picker
                        prompt="Select Funding Source"
                        selectedValue={this.state.fundingSource}
                        style={{height: 50, width: 500}}
                        onValueChange={(itemValue, itemIndex) =>
                            this.setState({fundingSource: itemValue})
                        }>
                            {props.incomeDataFromDB.map(income => 
                                <Picker.Item 
                                    label={income.name + " - " + "$" + income.amount + " on " + income.date} 
                                    value={income.name} 
                                    key={income.name + "-" + income.amount + "-" + Math.floor((Math.random() * 100000) + 1)}
                                    />
                                )}                        
                        </Picker>
                        </Item>
                        <View style={{ alignItems: 'center' }}>
                        <TouchableOpacity
                            onPressIn={props.handleExpenseEditFormSubmit} 
                            onPress={props.closeModalOnSubmit}
                            style={style.button_style_form}>
                            <Text> Submit </Text>
                        </TouchableOpacity>
                        </View>
                    </Form>
                </View>
            </Content>
    );
}

export default EditBillFormDisplay;