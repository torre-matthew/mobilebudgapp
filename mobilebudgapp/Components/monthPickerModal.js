import React, {Component} from 'react';
import {Modal, Text, TouchableHighlight, View, Alert, Dimensions, ScrollView, ViewBase} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
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
          style={{ flex: 1, alignSelf: 'center', marginTop: 5, marginBottom: 5, backgroundColor: 'white', elevation: 2, borderRadius: 10, borderWidth: 1, borderStyle: 'solid', borderColor: 'white' }}
          >        
          <Text style={{fontSize: 30, paddingLeft: 80, paddingRight: 80, paddingTop: 15, paddingBottom: 15}}> {this.props.currentMonth} </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default MonthPickerModal;