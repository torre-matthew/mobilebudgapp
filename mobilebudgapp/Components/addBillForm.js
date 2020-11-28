import React, { Component } from 'react';
import { View, Dimensions } from 'react-native';
import { Container, Button, Content, Form, Item, Input, Text } from 'native-base';
import DatePicker from "./datePicker";
import style from "../Styles/Styles";

function AddBillFormDisplay (props) {
    return (
      <Container style={{flex: 1}}>
        <Content>
            <View>
                <Form id="billForm">
                    <Item>
                        <DatePicker 
                            handleDueDate={props.handleDueDate} />
                    </Item>
                    <Item>
                        <Input placeholder='Bill/Expense' onChangeText={props.handleBillName} />
                    </Item>
                    <Item>
                        <Input keyboardType='decimal-pad' placeholder="Amount" onChangeText={props.handleBillAmount} />
                    </Item>
                    <View style={{ alignItems: 'center' }}>
                        <Button style={style.button_style} onPressIn={props.handleFormSubmit} onPress={props.closeModalOnSubmit}>
                            <Text style={{color: style.button_style.color, fontFamily: 'Laila-SemiBold'}}>Submit</Text>
                        </Button>
                    </View>
                </Form>
            </View>
        </Content>
      </Container>
    );
}

export default AddBillFormDisplay;


// onPress={props.getUnPlannedExpenseDataFromDBAndCloseModal}