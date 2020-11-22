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
    billDisplayOpacity: 1
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
        
          <View style={{flex: 1, flexDirection: 'row', marginTop: 20, opacity: this.state.billDisplayOpacity, borderTopColor: this.state.categoryIconColor, borderTopWidth: 5, borderRadius: 10}}>
            <View onTouchEnd={this.markAsPaid} style={{ flex: 1, flexGrow: 1, justifyContent: 'center', backgroundColor: '#f8f8ff', padding: 18}}> 
              {this.state.isPaid ?
              <FontAwesome name="check-square-o" size={30} color="black" />
              :
              <FontAwesome name="square-o" size={30} color="black" />
              }
            </View>
            <View style={{flex: 1, flexGrow: 8,}}>
              <View  style={{ flex: 1, alignSelf: 'stretch'}}>
                <View style={{ flex: 1, alignItems: 'center', backgroundColor: '#f8f8ff'}}> 
                  <FontAwesome5 name={this.state.categoryIcon} size={18} color={this.state.categoryIconColor} />
                  <Text style={{fontSize: 18, fontFamily: "Laila-SemiBold"}}> {this.props.billName} </Text>
                </View>
              </View>
                <View style={{ flex: 1, alignItems:'center', backgroundColor: '#f8f8ff'}}> 
                  <Text style={{fontSize: 18, fontFamily: "Laila-SemiBold", color: this.state.categoryIconColor}}> ${this.props.billAmount} </Text>
              </View>
                <View style={{ flex: 1, alignItems: 'center', backgroundColor: '#f8f8ff' }}> 
                  <Text style={{fontSize: 12, fontFamily: "Laila-SemiBold"}}> Due: {this.props.billDate} </Text>
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