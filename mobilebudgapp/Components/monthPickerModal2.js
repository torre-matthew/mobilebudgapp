import React, {Component} from 'react';
import {Modal, Text, TouchableHighlight, View, Alert, Dimensions, ScrollView, TouchableOpacity} from 'react-native';
// import { TouchableOpacity } from 'react-native-gesture-handler';
import MonthDisplay from "./monthDisplay";
import style from "../Styles/Styles";
import { FontAwesome5 } from '@expo/vector-icons';
import ApiMethods from '../utilities/apiMethods';

class MonthPickerModal extends Component {
  state = {
    modalVisible: false,
    monthData: [],
  };

  componentDidMount() {
    this.getMonthDataFromDB();
  }

  getMonthDataFromDB = () => {
    return ApiMethods.getMonthData()
    .then(monthDataArrayFromDB => {
      this.setState({
        monthData: monthDataArrayFromDB.data
      });
    })
    .catch(err => console.log(err));
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  closeModal = () => {
    this.setModalVisible(!this.state.modalVisible);
  }

  render() {
    return (
      <View style={{marginBottom: '8%'}}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={this.closeModal}>
            <Text style={{fontSize: 18, textAlign: 'center', margin: 20, fontFamily: 'Laila-SemiBold'}}> Select Month </Text>
          <ScrollView>
            {
              this.state.monthData.map(monthData => 
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
        <TouchableOpacity onPress={() => {this.setModalVisible(true)}} style={{ flex: 1, flexDirection: 'row'}}>        
          <Text style={{fontSize: 15, fontFamily: 'Laila-SemiBold'}}> {this.props.currentMonth} </Text>
          <Text style={{fontSize: 15, fontFamily: 'Laila-SemiBold'}}> {this.props.currentYear} </Text>
          <FontAwesome5 name="caret-down" size={20} />
        </TouchableOpacity>
      </View>
    );
  }
}

export default MonthPickerModal;