import React, { Component} from "react";
import { ActivityIndicator, View, ScrollView } from 'react-native';
import { Container, Header, Content, Card, CardItem, Text, Body } from "native-base";
import BillDisplay from "../PayBills/billDisplay";
import style from '../../Styles/Styles';


class MonthlyBillWrapper extends Component {

  componentDidMount() {
    // this.props.fetchData();
    
  }

  updateUnplannedBillWrapperComponent = () => {
    this.componentDidMount();
  }
  
  render(){
      return (
          <Content padder style={ style.unplanned_section }>
              <View style={{marginTop: 6, marginBottom: 1, marginLeft: 7}}> 
                <Text style={{fontSize: 15, color: '#4A0784', fontFamily: 'Laila-SemiBold'}}> This month's bills </Text>
              </View> 
                <BillDisplay />
                <BillDisplay />
                <BillDisplay />
          </Content>
      );
    }
  }

  export default MonthlyBillWrapper;