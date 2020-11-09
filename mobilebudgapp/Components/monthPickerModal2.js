import React, {Component} from 'react';
import {Modal, Text, TouchableHighlight, View, Alert, Dimensions, ScrollView, ViewBase} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import MonthDisplay from "./monthDisplay";
import style from "../Styles/Styles";
import { FontAwesome5 } from '@expo/vector-icons';
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
      <View style={{marginBottom: '8%'}}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={this.closeModal}>
            <Text style={{fontSize: 18, textAlign: 'center', margin: 20, fontFamily: 'Laila-SemiBold'}}> Select Month </Text>
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
        <View onTouchEnd={() => {this.setModalVisible(true)}} style={style.button2_light_style, { flex: 1, flexDirection: 'row', alignSelf: 'center'}}>        
          <Text style={{fontSize: 20, fontFamily: 'Laila-SemiBold'}}> for </Text>
          <Text style={{fontSize: 20, fontFamily: 'Laila-SemiBold'}}> {this.props.currentMonth} </Text>
          <Text style={{fontSize: 20, paddingRight: 8, fontFamily: 'Laila-SemiBold'}}> {this.props.currentYear} </Text>
          <FontAwesome5 style={{alignSelf: 'center', paddingRight: 8}} name="caret-down" size={20} />
        </View>
      </View>
    );
  }
}

export default MonthPickerModal;