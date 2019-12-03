import React, { Component } from "react";
import { View, Modal, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Container, Header, Content, Card, CardItem, Text, Body } from "native-base";
import EditBillFormDisplay from "./editBillForm";
import IncomeDisplay from "./incomeDisplay";
import FundingSourceDisplay from "./fundingSourceDisplay";
import style from "../Styles/Styles";
import ApiMethods from '../utilities/apiMethods';


class UnplannedBillDisplay extends Component {
  state = {
    modalVisible: false,
  };

  setModalVisible = (visible) => {
    this.setState({modalVisible: visible});
  }

  closeModal = () => {
    this.setModalVisible(!this.state.modalVisible);
  }

  showConfirmationAlert = (idToDelete) => {

  Alert.alert(
    'Delete Expense',
    'Are you sure you?',
    [
      {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
      {text: 'OK', onPress: () => {ApiMethods.deleteExpense(idToDelete); console.log(idToDelete);}},
    ],
    {cancelable: false},
  );

}

  render () {
      return (
        <View>
            <Modal
              animationType="slide"
              transparent={false}
              visible={this.state.modalVisible}
              onRequestClose={this.closeModal}>
                <ScrollView>
                <EditBillFormDisplay 
                  dueDate={this.props.dueDate}
                  billName={this.props.billName}
                  billAmount={this.props.billAmount}
                />
                <View style={{ flex: 1, alignSelf: 'flex-start', paddingLeft: 5, paddingTop: 15, paddingBottom: 15 }}> 
                  <Text style={{fontSize: 18 }}> Select Funding Source </Text>
                </View>
                {this.props.incomeDataFromDB.map(income => 
                <FundingSourceDisplay
                key={income.name + "-" + income.amount + "-" + Math.floor((Math.random() * 100000) + 1)}
                incomeName={income.name}
                incomeDate={income.date}
                incomeAmount={income.amount}
                />
                )}
                <TouchableOpacity
                  onPress={() => {this.showConfirmationAlert(this.props.billID)}}
                  style={style.button_style_form}>
                    <Text style={{fontSize: 10 }}> Delete Expense </Text>
                </TouchableOpacity>
                </ScrollView>
            </Modal>
            <View>
              <View onTouchEnd={() => {this.setModalVisible(true);}} style={{ flex: 1, alignSelf: 'stretch', flexDirection: 'row', marginTop: 10 }}>
                <View style={{ flex: 1, alignSelf: 'flex-start', backgroundColor: '#F6F6EE', flexGrow: 3, paddingLeft: 5, paddingTop: 15, paddingBottom: 15, borderTopLeftRadius: 15 }}> 
                  <Text style={{fontSize: 18 }}> {this.props.billName} </Text>
                </View>
                <View style={{ flex: 1, alignItems:'center', backgroundColor: '#F6F6EE', flexGrow: 1, paddingTop: 15, paddingBottom: 15, borderTopRightRadius: 15 }}> 
                  <Text style={{fontSize: 18 }}> ${this.props.billAmount} </Text>
                </View>
              </View>
              <View style={{ flex: 1, alignSelf: 'stretch', flexDirection: 'row', backgroundColor: '#CECECE', borderBottomLeftRadius: 15, borderBottomRightRadius: 15 }}>
                <View style={{ flex: 1, alignSelf: 'stretch', flexGrow: 3, paddingTop: 1, paddingBottom: 5, paddingLeft: 5,}}> 
                  <Text style={{fontSize: 12 }}> Due: {this.props.dueDate} </Text>
                </View>
              </View>
            </View>
          </View>
      );
    }
  }

  export default UnplannedBillDisplay;