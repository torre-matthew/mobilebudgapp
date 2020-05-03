import React, {Component} from 'react';
import {Modal, Text, TouchableHighlight, View, Alert, Dimensions} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import MonthDisplay from "./monthDisplay";
import style from "../Styles/Styles";

class MonthPickerModal extends Component {
  state = {
    modalVisible: false,
  };

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  closeModal = () => {
    this.setModalVisible(!this.state.modalVisible);
  }

  render() {
    return (
      <View style={{marginTop: 10}}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={this.closeModal}>
            <MonthDisplay />
        </Modal>
        <TouchableOpacity
          onPress={() => {this.setModalVisible(true)}}
          >
          <Text style={style.summary_section_header}> May </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default MonthPickerModal;