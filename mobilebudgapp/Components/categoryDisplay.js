import React, { Component } from "react";
import { View, Modal, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Container, Header, Content, Card, CardItem, Text, Body } from "native-base";
import style from "../Styles/Styles";
import ApiMethods from '../utilities/apiMethods';
import Categories from '../utilities/categories';
import { FontAwesome5 } from '@expo/vector-icons';


class CategoryDisplay extends Component {
  state = {
    categoryIcon: Categories.categoryIconLogic(this.props.categoryName).icon,
    categoryIconColor: Categories.categoryIconLogic(this.props.categoryName).iconColor,
    currentSelectedCategory: "",
    categoryTotal: ""
  };

  componentDidMount() {
    this.checkCurrentCategory();
    // this.setState({
    //   categoryTotal: ApiMethods.getCategoryTotalByMonth(this.props.loggedInUserID, this.props.currentMonthID, this.props.categoryID) 
    // });
  }

  checkCurrentCategory = () => {
    if (this.props.currentCategoryID === this.props.categoryID) {
      this.setState({
        currentSelectedCategory: true
      });
    } else {
      this.setState({
        currentSelectedCategory: false
      });
    }
  }

  render () {  
    return (
          <View onTouchEnd={() => {this.props.addCategory(this.props.billID, this.props.categoryID, this.props.categoryName)}} style={{position: 'relative', flexDirection: 'row', margin: 8}}>
            <View style={{flex: 1, flexGrow: 1, backgroundColor: '#F5F5F5', paddingLeft: 10, paddingTop: 10, paddingBottom: 10, borderTopLeftRadius: 10, borderBottomLeftRadius: 10, elevation: 5, backgroundColor: this.state.currentSelectedCategory ? this.state.categoryIconColor: '#F5F5F5'}}> 
              <FontAwesome5 name={this.state.categoryIcon} size={16} color={this.state.currentSelectedCategory ? '#F5F5F5' : this.state.categoryIconColor} />
            </View>
            <View style={{flex: 1, flexGrow: 10, backgroundColor: '#F5F5F5', paddingTop: 10, paddingBottom: 10, borderTopRightRadius: 10, borderBottomRightRadius: 10, elevation: 5, backgroundColor: this.state.currentSelectedCategory ? this.state.categoryIconColor : '#F5F5F5'}}> 
              <Text style={{fontSize: 12, textAlign: 'left', fontFamily: 'Laila-SemiBold', color: this.state.currentSelectedCategory ? '#F5F5F5' : 'black'}}> {this.props.categoryName} </Text>
              <Text style={{fontSize: 12, textAlign: 'left', fontFamily: 'Laila-SemiBold', color: this.state.currentSelectedCategory ? '#F5F5F5' : 'black'}}> {this.state.categoryTotal} </Text>
            </View>
          </View>
      );
    }
  }

  export default CategoryDisplay;