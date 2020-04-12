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
    amountToDisplay: 0
  };

  componentDidMount() {
    this.props.fetchData();
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
              <View style={{ shadowOffset: {width: 10, height: 12}, shadowColor: '#4A0784', shadowOpacity: 30, shadowRadius: 16}}>
                <View onTouchEnd={() => {this.setModalVisible(true);}} style={{ flex: 1, alignSelf: 'stretch', flexDirection: 'row', marginTop: 10 }}>
                  <View style={{ flex: 1, alignSelf: 'flex-start', backgroundColor: '#F5F5F5', flexGrow: 3, paddingLeft: 5, paddingTop: 15, paddingBottom: 25, borderTopLeftRadius: 15 }}> 
                    <Text style={{fontSize: 18 }}> {this.props.incomeName} </Text>
                  </View>
                  <View style={{ flex: 1, alignItems:'center', backgroundColor: '#F5F5F5', flexGrow: 1, paddingTop: 15, paddingBottom: 15, borderTopRightRadius: 15 }}> 
                    <Text style={{fontSize: 18 }}> ${this.props.incomeAmount} </Text>
                    <Text style={{fontSize: 6 }}> Remaining </Text>
                  </View>
                </View>
                <View style={{ flex: 1, alignSelf: 'stretch', flexDirection: 'row', backgroundColor: '#DEF1F2', borderBottomLeftRadius: 15, borderBottomRightRadius: 15 }}>
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