import React, {Component} from 'react';
import {Modal, Text, TouchableHighlight, View, Alert, Dimensions, ScrollView} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { FontAwesome } from '@expo/vector-icons';
import MonthDisplay from "./monthDisplay";
import style from "../Styles/Styles";
import ApiMethods from '../utilities/apiMethods';

class MonthPickerModal extends Component {
  state = {
    modalVisible: false,
  };

  componentDidMount() {
  }

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
            <Text style={{fontSize: 18, textAlign: 'center', margin: 20}}> Select Month </Text>
          <ScrollView>
            {
              this.props.monthData.map(monthData => 
              <MonthDisplay 
                month={monthData.month} 
                year={monthData.year}
                key={monthData._id}
                monthID={monthData._id} 
                selectMonth={this.selectMonth}
                selectNewMonth={this.props.selectNewMonth}
                closeModal={this.closeModal}
                fetchData={this.props.fetchData}
                />
              )
            }
          </ScrollView>
        </Modal>
        
        <TouchableOpacity
          onPress={() => {this.setModalVisible(true)}}
          >
          <Text style={style.summary_section_header}> {this.props.currentMonth} </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default MonthPickerModal;