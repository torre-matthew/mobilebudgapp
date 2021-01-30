import React, { Component } from "react";
import { View, Modal, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Container, Header, Content, Card, CardItem, Text, Body } from "native-base";
import EditBillFormDisplay from "../editBillForm";
import style from "../../Styles/Styles";
import ApiMethods from '../../utilities/apiMethods';
import Categories from '../../utilities/categories';
import QuickActionDrawer from "../quickActionDrawer";
import { FontAwesome5 } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import * as Font from 'expo-font';


class BillDisplay extends Component {
  state = {
    isPaid: this.props.isPaid,
    categoryIcon: "",
    categoryIconColor: "",
    billDisplayOpacity: 1,
  };

  componentDidMount() {
    this.setCategoryDisplay(); 
    this.setBillDisplay();  
  }

  markAsPaid = () => {
    switch (this.state.isPaid) {
      case true:
        this.setState({isPaid: false, billDisplayOpacity: 1})
        ApiMethods.markExpenseAsPaid(this.props.billID, false);
        break;
      case false:
        this.setState({isPaid: true, billDisplayOpacity: .5});
        ApiMethods.markExpenseAsPaid(this.props.billID, true);
  }
}

setCategoryDisplay = () => {
  this.setState({
    categoryIcon: Categories.categoryIconLogic(this.props.billCategoryName).icon,
    categoryIconColor: Categories.categoryIconLogic(this.props.billCategoryName).iconColor,
  });
}

setBillDisplay = () => {
  switch (this.state.isPaid) {
    case true:
      this.setState({billDisplayOpacity: .5})
      break;
    case false:
      this.setState({billDisplayOpacity: 1});
  }
} 
  render () {
      return (
        
          <View style={{flex: 1, flexDirection: 'row', marginTop: 10, opacity: this.state.billDisplayOpacity}}>
            <View onTouchEnd={this.markAsPaid} style={{ flex: 1, flexGrow: 1, padding: 5, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f8f8ff', borderTopLeftRadius: 10, borderBottomLeftRadius: 10}}> 
              {this.state.isPaid ?
              <FontAwesome name="check-square-o" size={30} color="black" />
              :
              <FontAwesome name="square-o" size={30} color="black" />
              }
            </View>
            <View style={{flex: 1, flexGrow: 8}}>
              <View  style={{ flex: 1, alignSelf: 'stretch'}}>
                <View style={{ flex: 1, backgroundColor: '#f8f8ff', padding: 3, justifyContent: 'center', alignItems: 'center', borderTopRightRadius: 10}}> 
                  <Text style={{fontSize: 15, fontFamily: "Laila-SemiBold"}}> {this.props.billName} </Text>
                </View>
              </View>
              <View style={{ flex: 1, flexGrow: 6, backgroundColor: '#f8f8ff', justifyContent: 'center', alignItems: 'center'}}> 
                  <Text style={{fontSize: 15, fontFamily: "Laila-SemiBold", color: this.state.categoryIconColor}}> ${this.props.billAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} </Text>
              </View>
              <View style={{flex: 1, flexDirection: 'row',backgroundColor: '#f8f8ff', borderBottomRightRadius: 10}}>
                <View style={{ flex: 1, flexGrow: .5, justifyContent: 'center', alignItems: 'flex-end', padding: 2}}> 
                    <FontAwesome5 name='calendar-alt' size={10} />
                </View>
                <View style={{ flex: 1, flexGrow: 3, padding: 2, justifyContent: 'center', alignItems: 'flex-start', backgroundColor: '#f8f8ff'}}> 
                  <Text style={{fontSize: 10, fontFamily: "Laila-SemiBold"}}> { new Date(this.props.billDate).toDateString().substr(4, 12)} </Text>
                </View>
                <View style={{ flex: 1, flexDirection:'row', flexGrow: 6, padding: 3, justifyContent: 'flex-start', alignItems: 'center', backgroundColor: '#f8f8ff', borderBottomRightRadius: 10, borderTopRightRadius: 10}}> 
                  <FontAwesome5 name={this.state.categoryIcon} size={12} color={this.state.categoryIconColor} />
                  <Text style={{fontSize: 10, color: this.state.categoryIconColor, fontFamily: "Laila-SemiBold"}}> {this.props.billCategoryName} </Text>
                </View>
                <TouchableOpacity onPress={() => {this.props.removeFromBillTracker(this.props.billID)}} style={{ flex: 1, flexGrow: 1, padding: 5, justifyContent: 'center', alignItems: 'flex-end', backgroundColor: '#f8f8ff', borderBottomRightRadius: 10, borderTopRightRadius: 10, borderBottomLeftRadius: 10, borderTopLeftRadius: 10}}> 
                  <FontAwesome5 name="times-circle" size={20} />
                </TouchableOpacity>
              </View>
              {this.state.showDrawer
                ? 
               <QuickActionDrawer 
                  navigation={this.props.navigation}
                  dueDate={this.props.dueDate}
                  billName={this.props.billName}
                  billAmount={this.props.billAmount}
                  billID={this.props.billID}
                  billIsPlanned={this.props.billIsPlanned}
                  billFundingSourceID={this.props.billFundingSourceID}
                  billCategoryName={this.props.billCategoryName}
                  billCategoryID={this.props.billCategoryID}
                  fetchData={this.props.fetchData}
                  fundingSourceID={this.state.fundingSourceID}
                  fundingSourceName={this.state.fundingSourceName}
                  fundingSourceAmount={this.state.fundingSourceAmount}
                  incomeDataFromDB={this.props.incomeDataFromDB}
                  whatsBeingEdited={this.state.whatsBeingEdited}
                  updateWrapperComponent={this.props.updateWrapperComponent}
                  updateDisplayComponent={this.updateBillDisplayComponent}
                  loggedInUserID={this.props.loggedInUserID}
                  isThisPlanned={this.props.isThisPlanned}
                  markAsPaid={this.markAsPaid}
                  markAsPaidButtonText={this.state.markAsPaidButtonText}
                  markAsUnplanned={this.markAsUnplanned}
                  billIsPaid={this.state.billIsPaid}
                  deleteExpense={this.showConfirmationAlert}
                  showMarkAsPaid={this.props.showMarkAsPaid}
                  splitEntry={this.splitEntry}
                  moveToNextMonth={this.moveToNextMonth}
                  selectFundingSource={this.selectFundingSource}
                  hideDrawerAndOverLayLogic={this.props.hideDrawerAndOverLayLogic}
               />
                :
                <View />
              }          
            </View>
            </View>
      );
    }
  }


  export default BillDisplay;