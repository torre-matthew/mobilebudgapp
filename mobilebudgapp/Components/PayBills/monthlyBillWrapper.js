import React, { Component} from "react";
import { ActivityIndicator, View, ScrollView } from 'react-native';
import { Container, Header, Content, Card, CardItem, Text, Body } from "native-base";
import BillDisplay from "../PayBills/billDisplay";
import ApiMethods from '../../utilities/apiMethods';
import style from '../../Styles/Styles';


class MonthlyBillWrapper extends Component {
  render(){
      return (
          <Content padder style={ style.unplanned_section }>
              <View style={{marginTop: 6, marginBottom: 1, marginLeft: 7}}> 
                <Text style={{fontSize: 18, color: '#4A0784', fontFamily: 'Laila-SemiBold'}}> Bill Tracker for {this.props.currentMonth + " " + this.props.currentYear} </Text>
              </View> 
              {this.props.billTrackerItemsFromDB.map(billTrackerItems => 
                <BillDisplay 
                  billID={billTrackerItems._id}
                  billName={billTrackerItems.nameOfExpense}
                  billAmount={billTrackerItems.amountOfExpense}
                  billDate={billTrackerItems.dateOfExpense}
                  isPaid={billTrackerItems.isPaid}
                  billCategoryID={billTrackerItems.categoryID}
                  billCategoryName={billTrackerItems.categoryName}
                  />
              )
              }
                
          </Content>
      );
    }
  }

  export default MonthlyBillWrapper;