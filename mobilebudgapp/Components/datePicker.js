import React, { Component } from 'react';
import { View, Dimensions, TouchableOpacity, Picker, Alert } from 'react-native';
import { Container, Button, Content, Form, Item, Input, Text, DatePicker } from 'native-base';
import style from "../Styles/Styles";
import ApiMethods from '../utilities/apiMethods';


// toString().substr(4, 12)

class DatePickerComponent extends Component {
    constructor(props) {
        super(props);
        this.state = { chosenDate:"" };
        this.setDate = this.setDate.bind(this);
      }

setDate(newDate) {
    if (!this.props.editDueDate) {
        this.setState({ chosenDate: newDate }, () => {this.props.handleDueDate(this.state.chosenDate)});
    } else {
        this.setState({ chosenDate: newDate }, () => {this.props.editDueDate(this.state.chosenDate, "date")});
    }
}
render() {
        return (
            <Content>
                <DatePicker
                defaultDate={new Date()}
                minimumDate={new Date(2020, 1, 1)}
                maximumDate={new Date(2022, 12, 31)}
                locale={"en"}
                timeZoneOffsetInMinutes={undefined}
                modalTransparent={false}
                animationType={"slide"}
                androidMode={"default"}
                placeHolderText={this.props.defaultValue ? this.props.defaultValue : "Date"}
                textStyle={{ color: "black" }}
                placeHolderTextStyle={{ color: "black" }}
                onDateChange={this.setDate}
                disabled={false}
                />
            </Content>
        );
    }


}

export default DatePickerComponent;