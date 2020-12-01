import React, { Component} from "react";
import { ActivityIndicator, View, ScrollView } from 'react-native';
import { Container, Header, Content, Card, CardItem, Text, Body } from "native-base";
import BillDisplay from "../PayBills/billDisplay";
import ApiMethods from '../../utilities/apiMethods';
import MonthPickerModal2 from '../monthPickerModal2';
import style from '../../Styles/Styles';


class MonthlyBillWrapper extends Component {
  render(){
      return (
          <Content padder style={ style.unplanned_section }>
              <View style={{flex: 1, flexDirection: 'row', marginTop: 6, marginBottom: 1, marginLeft: 7}}> 
                <Text style={{fontSize: 15, color: '#4A0784', fontFamily: 'Laila-SemiBold'}}> Bill Tracker for</Text>
                <MonthPickerModal2 
                  selectNewMonth={this.props.selectNewMonth}
                  currentMonth={this.props.currentMonth}
                  currentYear={this.props.currentYear}               
                  />
              </View> 
              {this.props.billTrackerItemsFromDB.map(billTrackerItems => 
                <BillDisplay 
                  key={billTrackerItems._id}
                  billID={billTrackerItems._id}
                  billName={billTrackerItems.nameOfExpense}
                  billAmount={billTrackerItems.amountOfExpense}
                  billDate={billTrackerItems.dateOfExpense}
                  isPaid={billTrackerItems.isPaid}
                  billCategoryID={billTrackerItems.categoryID}
                  billCategoryName={billTrackerItems.categoryName}
                  removeFromBillTracker={this.props.removeFromBillTracker}
                  getLoggedInUserIdByEmail={this.props.getLoggedInUserIdByEmail}
                  loggedInUsersEmail={this.props.loggedInUsersEmail}
                  />
              )
              }
                
          </Content>
      );
    }
  }

  export default MonthlyBillWrapper;