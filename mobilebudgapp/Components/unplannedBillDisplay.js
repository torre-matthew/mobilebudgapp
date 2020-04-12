import React, { Component } from "react";
import { View, Modal, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Container, Header, Content, Card, CardItem, Text, Body } from "native-base";
import EditBillFormDisplay from "./editBillForm";
import IncomeDisplay from "./incomeDisplay";
import style from "../Styles/Styles";
import ApiMethods from '../utilities/apiMethods';


class UnplannedBillDisplay extends Component {
  state = {
    modalVisible: false,
    whatsBeingEdited: "",
    fundingSourceName: "",
    fundingSourceAmount: ""
  };

  componentDidMount() {
    this.getFundingSourceInfo(this.props.billID);
  }

  updateBillDisplayComponent = () => {
    this.componentDidMount();
  }

  setModalVisible = (visible) => {
    this.setState({
      modalVisible: visible,
      whatsBeingEdited: "bill"
    });
  }

  closeModal = () => {
    this.setModalVisible(!this.state.modalVisible);
  }

  deleteExpense = (idToDelete) => {
    ApiMethods.deleteExpense(idToDelete)
    .then(res => {
      if (res.data.deletedCount === 0) {
        alert('Sorry, ' + idToDelete + ' could not be deleted');
      } else {
        alert('You have successfully deleted ' + this.props.billName);
        this.props.updateWrapperComponent();
        this.closeModal();
      }
    })
    .catch(err => console.log(err));
  }

  getFundingSourceInfo = (expenseID) => {
    ApiMethods.getExpenseByID(expenseID)
    .then(data => ApiMethods.getIncomeByID(data.data[0].fundingSource))
                      .then(data => {
                        this.setState({
                          fundingSourceName: data.data[0].name,
                          fundingSourceAmount: data.data[0].amount
                        });                      
                      })
                      .catch(err => {console.log("Unplanned Expense - Income Collection being queried without _id")
                        if (err) {
                          this.setState({
                            fundingSourceName: "Not planned",
                            fundingSourceAmount: ""
                          });
                        }
                      })         
    .catch(err => console.log(err));
  }

  showConfirmationAlert = (idToDelete) => {

  Alert.alert(
    'Delete Expense ' + idToDelete,
    'Are you sure?',
    [ 
      {text: 'Nevermind', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
      {text: 'Yes, I am', onPress: () => {this.deleteExpense(idToDelete)},
      },
      ],
    {cancelable: false},
  );
}

  render () {
      return (
        <View>
            <Modal
              animationType="fade"
              transparent={false}
              visible={this.state.modalVisible}
              onRequestClose={this.closeModal}>
                <ScrollView>
                <EditBillFormDisplay 
                  dueDate={this.props.dueDate}
                  billName={this.props.billName}
                  billAmount={this.props.billAmount}
                  billID={this.props.billID}
                  billIsPlanned={this.props.billIsPlanned}
                  billFundingSourceID={this.props.billFundingSourceID}
                  closeModalOnSubmit={this.closeModal}
                  incomeDataFromDB={this.props.incomeDataFromDB}
                  whatsBeingEdited={this.state.whatsBeingEdited}
                  updateWrapperComponent={this.props.updateWrapperComponent}
                  updateDisplayComponent={this.updateBillDisplayComponent}
                />
                <TouchableOpacity
                  onPress={() => {this.showConfirmationAlert(this.props.billID);}}
                  style={style.button_style_form}>
                    <Text style={{fontSize: 12 }}> Delete Expense </Text>
                </TouchableOpacity>
                </ScrollView>
            </Modal>
            <View>
              <View onTouchEnd={() => {this.setModalVisible(true)}} style={{ flex: 1, alignSelf: 'stretch', flexDirection: 'row', marginTop: 10 }}>
                <View style={{ flex: 1, alignSelf: 'flex-start', backgroundColor: '#F5F5F5', flexGrow: 3, paddingLeft: 5, paddingTop: 15, paddingBottom: 15, borderTopLeftRadius: 15 }}> 
                  <Text style={{fontSize: 18 }}> {this.props.billName} </Text>
                </View>
                <View style={{ flex: 1, alignItems:'center', backgroundColor: '#F5F5F5', flexGrow: 1, paddingTop: 15, paddingBottom: 15, borderTopRightRadius: 15 }}> 
                  <Text style={{fontSize: 18 }}> ${this.props.billAmount} </Text>
                </View>
              </View>
              <View style={{ flex: 1, alignSelf: 'stretch', flexDirection: 'row', backgroundColor: '#E5F3F3', borderBottomLeftRadius: 15, borderBottomRightRadius: 15 }}>
                <View style={{ flex: 1, alignSelf: 'stretch', flexGrow: 3, paddingTop: 1, paddingBottom: 5, paddingLeft: 5,}}> 
                  <Text style={{fontSize: 12 }}> Due: {this.props.dueDate} </Text>
                </View>
                <View style={{ flex: 1, alignSelf: 'stretch', flexGrow: 3, paddingTop: 1, paddingBottom: 5, paddingLeft: 5,}}> 
                  <Text style={{fontSize: 12 }}> Paid With: {this.state.fundingSourceName + ' ' + this.state.fundingSourceAmount} </Text>
                </View>
              </View>
            </View>
          </View>
      );
    }
  }

  export default UnplannedBillDisplay;