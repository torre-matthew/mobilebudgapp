import React, { Component} from "react";
import { ActivityIndicator, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Container, Header, Content, Card, CardItem, Text, Body } from "native-base";
import style from "../Styles/Styles";

const qadStyle = StyleSheet.create({

container_visible: {
  flex: 1, 
  opacity: 1, 
  width: '50%', 
  height: 250, 
  alignSelf: 'center',
  marginRight: 10, 
  flexDirection: 'row'
},
container_hide: {
  flex: 0, 
  opacity: 0, 
  width: 0, 
  height: 0, 
  alignSelf: 'stretch', 
  flexDirection: 'row'
}

})

class QuickActionDrawer extends Component {

  state = {
    // showDrawer: this.props.showDrawer,
    // drawerStyle: ""
  }



  componentDidMount() {
  }

  render(){
      return (
        <View style={qadStyle.container_visible}>
          <View style={{ flex: 1, alignSelf: 'flex-end', backgroundColor: '#4394B5', borderBottomLeftRadius: 10, borderBottomRightRadius: 10}}> 
            <View style={{ flex: 1, alignSelf: 'stretch'}}>
              <TouchableOpacity
                onPress={() => {}}
                style={style.button_small_quick_actions}>
                <Text style={{fontSize: 12, color: '#4A0784'}}> Split </Text>
              </TouchableOpacity>
            </View>
            <View style={{ flex: 1, alignSelf: 'stretch'}}>
              <TouchableOpacity
                onPress={() => {}}
                style={style.button_small_quick_actions}>
                <Text style={{fontSize: 12, color: '#4A0784'}}> Move to next month</Text>
              </TouchableOpacity>
            </View>
            <View style={{ flex: 1, alignSelf: 'stretch'}}>
              <TouchableOpacity
                onPress={() => {this.props.markAsUnplanned()}}
                style={style.button_small_quick_actions}>
                <Text style={{fontSize: 12, color: '#4A0784'}}> Back to unplanned </Text>
              </TouchableOpacity>
            </View>
            <View style={{ flex: 1, alignSelf: 'stretch'}}>
              <TouchableOpacity
                onPress={() => {this.props.markAsPaid(this.props.billID, this.props.billIsPaid)}}
                style={this.props.billIsPaid ? style.button_small_quick_actions_dark : style.button_small_quick_actions}>
                <Text style={{fontSize: 12, color: this.props.billIsPaid ? '#F5F5F5' : '#4A0784'}}> {this.props.markAsPaidButtonText} </Text>
              </TouchableOpacity>
            </View>
            <View style={{ flex: 1, alignSelf: 'stretch'}}>
              <TouchableOpacity
                onPress={() => {this.props.navigation.navigate('Edit Entry', {
                  navigation: this.props.navigation,
                  dueDate: this.props.dueDate,
                  billName: this.props.billName,
                  billAmount: this.props.billAmount,
                  billID: this.props.billID,
                  billIsPlanned: this.props.billIsPlanned,
                  billFundingSourceID: this.props.billFundingSourceID,
                  fundingSourceName: this.props.fundingSourceName,
                  fundingSourceAmount: this.props.fundingSourceAmount,
                  closeModalOnSubmit: this.propscloseModalOnSubmit,
                  incomeDataFromDB: this.props.incomeDataFromDB,
                  whatsBeingEdited: this.props.whatsBeingEdited,
                  updateWrapperComponent: this.props.updateWrapperComponent,
                  updateDisplayComponent: this.props.updateBillDisplayComponent,
                  loggedInUserID: this.props.loggedInUserID,
                  deleteExpense: this.props.deleteExpense,
                  isThisPlanned: this.props.isThisPlanned })}
                }
                style={style.button_small_quick_actions}>
                <Text style={{fontSize: 12, color: '#4A0784'}}> Edit </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      );
    }
  }

  export default QuickActionDrawer;