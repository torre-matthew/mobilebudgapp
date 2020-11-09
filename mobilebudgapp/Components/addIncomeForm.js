import React, { Component } from 'react';
import { View, Dimensions } from 'react-native';
import { Container, Button, Content, Form, Item, Input, Text } from 'native-base';
import DatePicker from "./datePicker";
import style from "../Styles/Styles";

function AddIncomeFormDisplay (props) {
    return (
      <Container style={{flex: 0, width: '95%', marginLeft: '1%'}}>
            <Content>
                <View>
                    <Form id="billForm">
                        <Item>
                            <Input placeholder='Income' onChangeText={props.handleIncomeName} />
                        </Item>
                        <Item>
                            <DatePicker handleDueDate={props.handleIncomeDate} />
                        </Item>
                        <Item>
                            <Input keyboardType='numeric' placeholder="Amount" onChangeText={props.handleIncomeAmount} />
                        </Item>
                        <View>
                            <Button style={style.button_style} onPressIn={props.handleAddIncomeFormSubmit} onPress={props.closeModalOnSubmit}>
                                <Text style={{color: style.button_style.color, fontFamily: 'Laila-SemiBold'}}>Submit</Text>
                            </Button>
                        </View>
                    </Form>
                </View>
            </Content>
      </Container>
    );
}

export default AddIncomeFormDisplay;