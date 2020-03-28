import React, { Component } from "react";
import { View, Modal, ScrollView, TouchableOpacity, Alert  } from 'react-native';
import { Container, Header, Content, Card, CardItem, Text, Body } from "native-base";
import EditBillFormDisplay from "./editBillForm";
import style from "../Styles/Styles";
import ApiMethods from '../utilities/apiMethods';

class IncomeDisplay extends Component {
  state = {
    modalVisible: false,
    whatsBeingEdited: "",
    incomeAmountToDisplay: 0,
    shouldIRemount: false,
  };

  componentDidMount() {
  }

  updateIncomeDisplayComponent = () => {
    this.componentDidMount();
  }

  setModalVisible = (visible) => {
    this.setState({
      modalVisible: visible,
      whatsBeingEdited: "income"
    });
  }

  closeModal = () => {
    this.setModalVisible(!this.state.modalVisible);
  }

  getUpdatedAfterSpendingAmounts = () => {
      ApiMethods.updateAfterSpendingAmount(this.props.incomeID)
      .then(data => res.json(data))
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
                />
                <TouchableOpacity
                  onPress={() => {ApiMethods.deleteIncome(this.props.incomeID).then(res => {
                    
                    if (res.data.deletedCount === 0) {
                      alert('Sorry, ' + this.props.incomeName + ' could not be deleted');
                    } else {
                      alert('You have successfully deleted ' + this.props.incomeName);
                        this.props.updateWrapperComponent();
                        this.closeModal();
                    }
                  })
                  .catch(err => console.log(err)); 
                    }}
                  style={style.button_style_form}>
                    <Text style={{fontSize: 12 }}> Delete Income </Text>
                </TouchableOpacity>
                </ScrollView>
            </Modal>
              <View>
                <View onTouchEnd={() => {this.setModalVisible(true);}} style={{ flex: 1, alignSelf: 'stretch', flexDirection: 'row', marginTop: 10 }}>
                  <View style={{ flex: 1, alignSelf: 'flex-start', backgroundColor: '#F6F6EE', flexGrow: 3, paddingLeft: 5, paddingTop: 15, paddingBottom: 15, borderTopLeftRadius: 15 }}> 
                    <Text style={{fontSize: 18 }}> {this.props.incomeName} </Text>
                  </View>
                  <View style={{ flex: 1, alignItems:'center', backgroundColor: '#F6F6EE', flexGrow: 1, paddingTop: 15, paddingBottom: 15, borderTopRightRadius: 15 }}> 
                    <Text style={{fontSize: 18 }}> ${this.props.incomeAmount} </Text>
                  </View>
                </View>
                <View style={{ flex: 1, alignSelf: 'stretch', flexDirection: 'row', backgroundColor: '#CECECE', borderBottomLeftRadius: 15, borderBottomRightRadius: 15 }}>
                  <View style={{ flex: 1, alignSelf: 'stretch', flexGrow: 3, paddingTop: 1, paddingBottom: 5, paddingLeft: 5,}}> 
                    <Text style={{fontSize: 12 }}> Date: {this.props.incomeDate} </Text>
                  </View>
                </View>
              </View>
          </View>
      );
    }
  }

  export default IncomeDisplay;