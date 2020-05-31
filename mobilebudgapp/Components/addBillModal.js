import React, {Component} from 'react';
import {Modal, Text, TouchableHighlight, View, Alert, Dimensions} from 'react-native';
import FormDisplay from './addIncomeForm';
import AddBillFormDisplay from './addBillForm';
import { TouchableOpacity } from 'react-native-gesture-handler';
import style from "../Styles/Styles";

class AddBillModal extends Component {
  
    state = {
      modalVisible: false,
    };

    setModalVisible = (visible) => {
      this.setState({modalVisible: visible});
    }

    closeModal = () => {
      this.setModalVisible(!this.state.modalVisible);
      this.props.updateWrapperComponent();
      this.props.fetchData();
    }

    render() {
      return (
        <View style={{marginTop: 10}}>
          <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.modalVisible}
            onRequestClose={this.closeModal}>
          <AddBillFormDisplay 
            handleBillAmount={this.props.handleBillAmount}
            handleDueDate={this.props.handleDueDate}
            handleBillName={this.props.handleBillName}
            handleFormSubmit={this.props.handleFormSubmit}
            closeModalOnSubmit={this.closeModal}
            fetchData={this.props.fetchData}
          />
          </Modal>
          <TouchableOpacity
            onPress={() => {this.setModalVisible(true)}}
            style={style.button_style}
          >
          <Text style={{color: style.button_style.color, fontFamily: 'Laila-SemiBold'}}> Add Bill/Expense </Text>
        </TouchableOpacity>
        </View>
      );
    }

}

export default AddBillModal;