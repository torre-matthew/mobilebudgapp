import React, { Component } from "react";
import { View, Modal, ScrollView, TouchableOpacity, Alert  } from 'react-native';
import { Container, Header, Content, Card, CardItem, Text, Body } from "native-base";
import EditBillFormDisplay from "./editBillForm";
import style from "../Styles/Styles";
import ApiMethods from '../utilities/apiMethods';
import * as Font from 'expo-font';

class IncomeDisplay extends Component {
  state = {
    modalVisible: false,
    whatsBeingEdited: "income",
    amountToDisplay: 0,
  };

  componentDidMount() {
    this.props.fetchData();
  }

  updateIncomeDisplayComponent = () => {
    this.componentDidMount();
  }

  setModalVisible = (visible) => {

    this.props.navigation.navigate('Edit Entry', {
      navigation: this.props.navigation,
      incomeName: this.props.incomeName,
      incomeDate: this.props.incomeDate,
      incomeAmount: this.props.incomeAmount,
      incomeID: this.props.incomeID,
      handleExpenseEditFormSubmit: this.props.handleExpenseEditFormSubmit,
      closeModalOnSubmit: this.closeModal,
      incomeDataFromDB: this.props.currentIncomeFromDB,
      whatsBeingEdited: this.state.whatsBeingEdited,
      updateWrapperComponent: this.props.updateWrapperComponent,
      updateDisplayComponent: this.updateIncomeDisplayComponent,
      switcherClicked: this.props.switcherClicked,
      deleteIncome: this.deleteIncome
    })
  }

  closeModal = () => {
    this.setModalVisible(!this.state.modalVisible);
  }

  deleteIncome = () => {
    ApiMethods.deleteIncome(this.props.incomeID).then(res => {
                    
      if (res.data.deletedCount === 0) {
        alert('Sorry, ' + this.props.incomeName + ' could not be deleted');
      } else {
        alert('You have successfully deleted ' + this.props.incomeName);
          this.props.updateWrapperComponent();
          ApiMethods.updateIncomeOnUserRecord(this.props.loggedInUserID).then(data => {}).catch(err => console.log(err));
          this.props.navigation.navigate('Budget');
      }
    })
    .catch(err => console.log(err));

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
                  incomeName={this.props.incomeName}
                  incomeDate={this.props.incomeDate}
                  incomeAmount={this.props.incomeAmount}
                  incomeID={this.props.incomeID}
                  handleExpenseEditFormSubmit={this.props.handleExpenseEditFormSubmit}
                  closeModalOnSubmit={this.closeModal}
                  incomeDataFromDB={this.props.currentIncomeFromDB}
                  whatsBeingEdited={this.state.whatsBeingEdited}
                  updateWrapperComponent={this.props.updateWrapperComponent}
                  updateDisplayComponent={this.updateIncomeDisplayComponent}
                  switcherClicked={this.props.switcherClicked}
                />
                <TouchableOpacity
                  onPress={() => {ApiMethods.deleteIncome(this.props.incomeID).then(res => {
                    
                    if (res.data.deletedCount === 0) {
                      alert('Sorry, ' + this.props.incomeName + ' could not be deleted');
                    } else {
                      alert('You have successfully deleted ' + this.props.incomeName);
                        this.props.updateWrapperComponent();
                        ApiMethods.updateIncomeOnUserRecord(this.props.loggedInUserID).then(data => {}).catch(err => console.log(err));
                        this.closeModal();
                    }
                  })
                  .catch(err => console.log(err)); 
                    }}
                  style={style.button2_light_style}>
                    <Text style={{fontSize: 12 }}> Delete Income </Text>
                </TouchableOpacity>
                </ScrollView>
            </Modal>
              <View>
                <View onTouchEnd={() => {this.setModalVisible(true);}} style={{ flex: 1, alignSelf: 'stretch', flexDirection: 'row', marginTop: 5 }}>
                  <View style={{ flex: 1, alignItems:'flex-start', justifyContent: 'center', backgroundColor: '#f8f8ff', borderLeftColor: '#4658A1', flexGrow: 6, paddingLeft: 5, paddingTop: 15, paddingBottom: 15, borderTopLeftRadius: 5, borderStyle: 'solid', borderLeftWidth: 4 }}> 
                    <Text style={{fontSize: 14, fontFamily: "Laila-SemiBold"}}> {this.props.incomeName} </Text>
                  </View>
                  <View style={{ flex: 1, alignItems:'flex-end', backgroundColor: '#f8f8ff', flexGrow: 4, borderTopRightRadius: 15, paddingRight: 5, paddingTop: 15, paddingBottom: 15,}}> 
                    <Text style={{fontSize: 14, fontFamily: "Laila-SemiBold"}}> ${this.props.incomeAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} </Text>
                    {/* {this.props.switcherClicked
                     ?
                     <Text style={{fontSize: 8 }}> Remaining </Text>
                     :
                     <Text style={{fontSize: 8 }}> Recieved </Text>
                    } */}
                  </View>
                </View>
                <View style={{ flex: 1, alignSelf: 'stretch', flexDirection: 'row', backgroundColor: '#f8f8ff', borderLeftColor: '#4658A1', borderBottomLeftRadius: 5, borderBottomRightRadius: 15, borderStyle: 'solid', borderLeftWidth: 4 }}>
                  <View style={{ flex: 1, alignSelf: 'stretch', paddingLeft: 5, flexGrow: 3, paddingLeft: 5, paddingBottom: 5,}}> 
                    <Text style={{fontSize: 10, fontFamily: "Laila-SemiBold"}}> { new Date(this.props.incomeDate).toDateString().substr(4, 12)} </Text>
                  </View>
                </View>
              </View>
          </View>
      );
    }
  }

  export default IncomeDisplay;