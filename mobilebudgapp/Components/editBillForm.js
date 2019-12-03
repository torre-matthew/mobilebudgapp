import React, { Component } from 'react';
import { View, Dimensions } from 'react-native';
import { Container, Content, Form, Item, Input, Text } from 'native-base';
import { TouchableOpacity } from 'react-native-gesture-handler';
import style from "../Styles/Styles";

function EditBillFormDisplay (props) {
    return (
            <Content>
                <View style={{marginTop: 55}}>
                    <Form id="billForm">
                        <Item>
                            <Input defaultValue={props.dueDate} placeholder='Due Date' onChangeText={props.handleDueDate} />
                        </Item>
                        <Item>
                            <Input defaultValue={props.billName} placeholder='Bill/Expense' onChangeText={props.handleBillName} />
                        </Item>
                        <Item>
                            <Input defaultValue={props.billAmount} keyboardType='numeric' placeholder="Amount" onChangeText={props.handleBillAmount} />
                        </Item>
                        <View style={{ alignItems: 'center' }}>
                        <TouchableOpacity
                            onPressIn={props.handleFormSubmit} 
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