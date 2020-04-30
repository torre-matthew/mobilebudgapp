import React, { Component } from 'react';
import { View, Dimensions } from 'react-native';
import { Container, Button, Content, Form, Item, Input, Text } from 'native-base';
import style from "../Styles/Styles";

function AddBillFormDisplay (props) {
    return (
      <Container>
            <Content>
                <View style={{marginTop: 55}}>
                    <Form id="billForm">
                        <Item>
                            <Input placeholder='Due Date' onChangeText={props.handleDueDate} />
                        </Item>
                        <Item>
                            <Input placeholder='Bill/Expense' onChangeText={props.handleBillName} />
                        </Item>
                        <Item>
                            <Input keyboardType='numeric' placeholder="Amount" onChangeText={props.handleBillAmount} />
                        </Item>
                        <View style={{ alignItems: 'center' }}>
                            <Button style={style.button_display} onPressIn={props.handleFormSubmit} onPress={props.closeModalOnSubmit}>
                                <Text>Submit</Text>
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