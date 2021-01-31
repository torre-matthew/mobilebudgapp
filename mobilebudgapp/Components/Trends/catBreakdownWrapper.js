import React, { Component} from "react";
import { ActivityIndicator, View, ScrollView } from 'react-native';
import { Container, Header, Content, Card, CardItem, Text, Body } from "native-base";
import style from '../../Styles/Styles';


class CatBreakDownWrapper extends Component {

  
  render(){
      return (
          <Content padder style={ style.unplanned_section }>
              <View style={{marginTop: 6, marginBottom: 1, marginLeft: 7}}> 
                <Text style={{fontSize: 15, color: '#4A0784', fontFamily: 'Laila-SemiBold'}}> Average Per Month Last 3 Months: </Text>
                <Text style={{fontSize: 15, color: '#4A0784', fontFamily: 'Laila-SemiBold'}}> {this.props.threeMonthAveragePerMonth} </Text>
              </View>
              <View style={{marginTop: 6, marginBottom: 1, marginLeft: 7}}> 
                <Text style={{fontSize: 15, color: '#4A0784', fontFamily: 'Laila-SemiBold'}}> Average Per Month Last 6 Months: </Text>
                <Text style={{fontSize: 15, color: '#4A0784', fontFamily: 'Laila-SemiBold'}}> {this.props.sixMonthAveragePerMonth} </Text>
              </View>
          </Content>
      );
    }
  }

  export default CatBreakDownWrapper;