import React, { Component } from 'react';
import { View, Dimensions } from 'react-native';
import { Container, Button, Content, Form, Item, Input, Text } from 'native-base';
import style from "../Styles/Styles";

function AddIncomeFormDisplay (props) {
    return (
      <Container>
            <Content>
                <View style={{marginTop: 55}}>
                    <Form id="billForm">
                        <Item>
                            <Input placeholder='Income' onChangeText={props.handleIncomeName} />
                        </Item>
                        <Item>
                            <Input placeholder='Date' onChangeText={props.handleIncomeDate} />
                        </Item>
                        <Item>
                            <Input keyboardType='numeric' placeholder="Amount" onChangeText={props.handleIncomeAmount} />
                        </Item>
                        <View style={{ alignItems: 'center' }}>
                            <Button style={style.button_display} onPressIn={props.handleAddIncomeFormSubmit} onPress={props.closeModalOnSubmit}>
                                <Text>Submit</Text>
                            </Button>
                        </View>
                    </Form>
                </View>
            </Content>
      </Container>
    );
}

export default AddIncomeFormDisplay;