import React, { Component } from "react";
import { View, Modal, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Container, Header, Content, Card, CardItem, Text, Body } from "native-base";
import style from "../Styles/Styles";
import ApiMethods from '../utilities/apiMethods';
import { FontAwesome5 } from '@expo/vector-icons';


class CategoryDisplay extends Component {
  state = {
    categoryIcon: "",
    categoryIconColor: ""
  };

  componentDidMount() {
    this.categoryIconLogic();

  }

  // #8C1184 Pinkish Purple
  // #4036F5 blue
  // #7DBF7A shade of green 
  // #F20544 kind of red
  // #F26B6B kind of salmon
  // #B0BFFF kind of lavender
  // #F2872E kind of orange

  categoryIconLogic = () => {
    switch (this.props.categoryName) {
      case "Bills and Utilities":
        this.setState({
          categoryIcon: "plug",
          categoryIconColor: "#8C1184"
          });
        break;
      case "Debt":
        this.setState({
          categoryIcon: "file-invoice-dollar",
          categoryIconColor: "#4036F5"
          });
        break;
      case "Housing":
        this.setState({
          categoryIcon: "home",
          categoryIconColor: "#7DBF7A"
          });
        break;
      case "Non Recurring Expense":
        this.setState({
          categoryIcon: "money-check-alt",
          categoryIconColor: "#F20544"
          });
        break;
      case "Personal Spending":
        this.setState({
          categoryIcon: "hand-holding-usd",
          categoryIconColor: "#F26B6B"
          });
        break;
      case "Savings":
      this.setState({
        categoryIcon: "piggy-bank",
        categoryIconColor: "#B0BFFF"
        });
        break;
      case "Subscriptions & Memberships":
      this.setState({
        categoryIcon: "funnel-dollar",
        categoryIconColor: "#F2872E"
        });
        break;
      }
  }

  render () {  
    return (
          <View onTouchEnd={() => {this.props.addCategory(this.props.billID, this.props.categoryID, this.props.categoryName)}} style={{position: 'relative', flexDirection: 'row', margin: 8}}>
            <View style={{flex: 1, flexGrow: 1, backgroundColor: '#F5F5F5', paddingLeft: 10, paddingTop: 10, paddingBottom: 10, borderTopLeftRadius: 10, borderBottomLeftRadius: 10, elevation: 5}}> 
              <FontAwesome5 name={this.state.categoryIcon} size={15} color={this.state.categoryIconColor} />
            </View>
            <View style={{flex: 1, flexGrow: 10, backgroundColor: '#F5F5F5', paddingTop: 10, paddingBottom: 10, borderTopRightRadius: 10, borderBottomRightRadius: 10, elevation: 5}}> 
              <Text style={{fontSize: 12, textAlign: 'left', fontFamily: 'Laila-SemiBold'}}> {this.props.categoryName} </Text>
            </View>
          </View>
      );
    }
  }

  export default CategoryDisplay;