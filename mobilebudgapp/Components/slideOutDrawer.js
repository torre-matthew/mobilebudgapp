import React, { Component} from "react";
import { View, StyleSheet, TouchableOpacity, Picker, Text } from 'react-native';
import BackGroundImage from "../Styles/images/turquise indigo gradient.png";
import style from "../Styles/Styles";
import CategoryDisplay from "./categoryDisplay";

const qadStyle = StyleSheet.create({

container_hide: {
  position: 'absolute',
  zIndex: 0,
  opacity: 0, 
  width: '0%', 
  height: '100%', 
  alignSelf: 'flex-end',
  marginTop: '0%',
  marginRight: 0, 
  backgroundColor: '#BCBCC2',
  borderBottomLeftRadius: 0,
  borderTopLeftRadius: 0, 
  borderBottomRightRadius: 0
},
container_show: {
  position: 'absolute',
  zIndex: 2,
  opacity: 1, 
  width: '60%', 
  height: '90%', 
  alignSelf: 'flex-end',
  marginTop: '10%',
  marginRight: 10, 
  backgroundColor: '#F5F5F5',
  borderBottomLeftRadius: 10,
  borderTopLeftRadius: 10, 
  borderBottomRightRadius: 10
},

})

class SlideOutDrawer extends Component {

  render(){
      return (
        <View style={this.props.show ? qadStyle.container_show : qadStyle.container_hide}>
          
          {this.props.arrayOfCategories.map(categories => 
            <CategoryDisplay 
              key={categories._id}
              categoryName={categories.categoryName} />
          )}
        </View>
      );
    }
  }

  export default SlideOutDrawer;