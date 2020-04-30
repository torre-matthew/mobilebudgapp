import React, {Component} from 'react';
import {Modal, Text, TouchableHighlight, View, Alert, Dimensions} from 'react-native';
import AddIncomeFormDisplay from './addIncomeForm';
import { TouchableOpacity } from 'react-native-gesture-handler';
import style from "../Styles/Styles";

class AddEntryModal extends Component {
  state = {
    modalVisible: false,
  };

  setModalVisible(visible) {
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
        <AddIncomeFormDisplay 
          handleIncomeAmount={this.props.handleIncomeAmount}
          handleIncomeDate={this.props.handleIncomeDate}
          handleIncomeName={this.props.handleIncomeName}
          handleAddIncomeFormSubmit={this.props.handleAddIncomeFormSubmit}
          closeModalOnSubmit={this.closeModal}
          loggedInUserID={this.props.loggedInUserID}
        />
        </Modal>
        <TouchableOpacity
          onPress={() => {this.setModalVisible(true)}}
          style={style.button_style}
          >
          <Text> Add Income </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default AddEntryModal;