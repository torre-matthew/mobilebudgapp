import React, { Component} from "react";
import { ActivityIndicator, View, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { Container, Header, Content, Card, CardItem, Text, Body } from "native-base";
import BackGroundImage from "../Styles/images/turquise indigo gradient.png";
import style from "../Styles/Styles";

const qadStyle = StyleSheet.create({

container_small: {
  flex: 1, 
  opacity: 1, 
  width: '88%', 
  height: 140, 
  alignSelf: 'center',
  marginRight: 10, 
  backgroundColor: '#6f00ff',
  borderBottomLeftRadius: 10, 
  borderBottomRightRadius: 10,
},
container_large: {
  flex: 1, 
  opacity: 1, 
  width: '88%', 
  height: 170, 
  alignSelf: 'center',
  marginRight: 10, 
  backgroundColor: '#6f00ff',
  borderBottomLeftRadius: 10, 
  borderBottomRightRadius: 10
},

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
        <View style={this.props.showMarkAsPaid ? qadStyle.container_large : qadStyle.container_small}>
            <View style={{ flex: 1, flexDirection: "row", alignSelf: 'center', marginTop: 5}}> 
                <View style={{ flex: 1, alignSelf: 'stretch'}}>
                  <TouchableOpacity
                    onPress={() => {this.props.splitEntry(this.props.billID)}}
                    style={style.button_small_quick_actions}>
                    <Text style={{fontSize: 12, color: '#4A0784'}}> Split this item</Text>
                  </TouchableOpacity>
                </View>
                <View style={{ flex: 1, alignSelf: 'stretch'}}>
                  <TouchableOpacity
                    onPress={() => {}}
                    style={style.button_small_quick_actions}>
                    <Text style={{fontSize: 12, color: '#4A0784'}}> Move to next month</Text>
                  </TouchableOpacity>
                  </View>
                </View>
                {this.props.showMarkAsPaid
                  ?
                <View style={{ flex: 1, flexDirection: "row", alignSelf: 'center'}}>
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
                  </View>
                  :
                  <Text />          
                  }
                <View style={{ flex: 1, flexDirection: "row", alignSelf: 'center'}}> 
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