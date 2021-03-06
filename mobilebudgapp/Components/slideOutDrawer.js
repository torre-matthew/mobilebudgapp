import React, { Component} from "react";
import { View, StyleSheet, TouchableOpacity, ScrollView, Picker, Text } from 'react-native';
import BackGroundImage from "../Styles/images/turquise indigo gradient.png";
import style from "../Styles/Styles";
import CategoryDisplay from "./categoryDisplay";

const qadStyle = StyleSheet.create({

container_hide: {
  position: 'absolute',
  zIndex: 0,
  opacity: 0, 
  width: '0%', 
  height: '0%',
  marginLeft: 0, 
  backgroundColor: '#BCBCC2',
  borderBottomLeftRadius: 0,
  borderTopLeftRadius: 0, 
  borderBottomRightRadius: 0
},
container_show: {
  position: 'absolute',
  zIndex: 4,
  opacity: 1, 
  marginTop: '14%',
  width: '60%', 
  height: '93%', 
  marginLeft: '40%',
  backgroundColor: '#f8f8ff',
  borderBottomLeftRadius: 10,
  borderTopLeftRadius: 10, 
  borderBottomRightRadius: 10
},

})

class SlideOutDrawer extends Component {
  state = {
    showDrawer: this.props.show
  }

  render(){
      return (
        <View style={this.props.show ? qadStyle.container_show : qadStyle.container_hide}>
          <View style={{margin: 10}}>
            <Text style={{fontSize: 15, textAlign: 'center', fontFamily: 'Laila-SemiBold'}}> Select Category</Text> 
          </View>
          <ScrollView>
          {this.props.arrayOfCategories.map(categories => 
            <CategoryDisplay 
              key={categories._id}
              categoryName={categories.categoryName}
              categoryID={categories._id}
              currentCategoryID={this.props.currentCategoryID}
              addCategory={this.props.addCategory} 
              billID={this.props.billID} 
              loggedInUserID={this.props.loggedInUserID}
              currentMonthID={this.props.currentMonthID}
              />
          )}
          </ScrollView>
        </View>
      );
    }
  }

  export default SlideOutDrawer;