import React, { Component} from "react";
import { View, StyleSheet, TouchableOpacity, TouchableHighlight, ScrollView, Picker, Text } from 'react-native';
import BackGroundImage from "../Styles/images/turquise indigo gradient.png";
import style from "../Styles/Styles";
import Animation from "../utilities/animation";
import { FontAwesome5 } from '@expo/vector-icons';
import { Container } from "native-base";

const qadStyle = StyleSheet.create({

container_hide: {
  position: 'absolute',
  zIndex: 2,
  opacity: 0, 
  width: '0%', 
  height: '0%',
  backgroundColor: '#f8f8ff',
  borderTopRightRadius: 0,
  borderTopLeftRadius: 0, 
  borderBottomRightRadius: 0,
  left: '0%', 
  top: '0%'
},
container_show: {
  position: 'absolute',
  zIndex: 2,
  opacity: 1, 
  width: '97%', 
  height: '55%',
  backgroundColor: '#f8f8ff',
  borderTopRightRadius: 20,
  borderTopLeftRadius: 20,
  left: '1.5%', 
  top: '45%'
},

})

class QuickActionDrawer extends Component {
  state = {
  }

  render(){
      return (
        <Container style={this.props.show ? qadStyle.container_show : qadStyle.container_hide}>
          <TouchableHighlight onPress={() => {this.props.goToEditScreen()}}>
            <View style={{ flex: 1, alignItems: 'flex-end', alignSelf: 'stretch', paddingBottom: 25, paddingTop: 10, paddingRight: 10, borderTopRightRadius: 20, borderTopLeftRadius: 20}}>
                <FontAwesome5 name={"edit"} size={18} color={this.props.billCategoryIconColor} />
            </View>
          </TouchableHighlight>
          <ScrollView>
          <View style={{alignSelf: 'stretch', paddingBottom: 10, paddingTop: 10, marginBottom: 15, backgroundColor: this.props.billCategoryIconColor}}>
            <View>
              <Text style={{fontSize: 22, alignSelf: 'center', paddingLeft: 20, paddingRight: 40, fontFamily: 'Laila-SemiBold', color: "#F5F5F5"}}> {this.props.billName} </Text> 
            </View>
            <View>
              <Text style={{fontSize: 22, alignSelf: 'center', paddingLeft: 20, paddingRight: 40, fontFamily: 'Laila-SemiBold', color: "#F5F5F5"}}> ${this.props.billAmount} </Text> 
            </View>
            <View style={{marginLeft: 20, flexDirection: 'row', alignSelf: 'center'}}>
              <FontAwesome5 name={this.props.billCategoryIconName} size={17} color={"#F5F5F5"} />
              <Text style={{fontSize: 15, alignSelf: 'center', paddingLeft: 5, paddingRight: 40, fontFamily: 'Laila-SemiBold', color: "#F5F5F5"}}> {this.props.billCategoryName} </Text> 
            </View>
          </View>
            <View style={{marginLeft: 20}}> 
              <TouchableHighlight onPress={() => {this.props.navigation.navigate('Select Funding Source', {
                        billID: this.props.billID,
                        fundingSourceID: this.props.selectedFundingSourceID,
                        incomeDataFromDB: this.props.incomeDataFromDB,
                        selectFundingSource: this.props.selectFundingSourceFunction
                      })}}>
                <View style={{ flex: 1, alignSelf: 'stretch', flexDirection: "row", marginBottom: 25}}>
                  <FontAwesome5 name={"hand-pointer"} size={20} color={'#6E6E6E'} />
                  <Text style={{fontSize: this.props.show ? 12 : 0, marginLeft: 20, fontFamily: 'Laila-SemiBold', color: '#6E6E6E'}}> Choose funding source </Text>
                </View>
                </TouchableHighlight>
                <TouchableHighlight onPress={() => {this.props.showCategoriesDrawer();}}>
                  <View style={{ flex: 1, alignSelf: 'stretch', flexDirection: "row", marginBottom: 25}}>
                    <FontAwesome5 name={"shapes"} size={20} color={'#6E6E6E'} />
                    <Text style={{fontSize: this.props.show ? 12 : 0, marginLeft: 20, fontFamily: 'Laila-SemiBold', color: '#6E6E6E'}}> Choose Category </Text>
                  </View>
                </TouchableHighlight>
                <TouchableHighlight onPress={() => {this.props.moveToNextMonth();}}>
                  <View style={{ flex: 1, alignSelf: 'stretch', flexDirection: "row", marginBottom: 25}}>
                    <FontAwesome5 name={"arrow-circle-right"} size={20} color={'#6E6E6E'} />
                    <Text style={{fontSize: this.props.show ? 12 : 0, marginLeft: 20, fontFamily: 'Laila-SemiBold', color: '#6E6E6E'}}> Move to next month </Text>
                  </View>
                </TouchableHighlight>
                <TouchableHighlight onPress={() => {this.props.splitEntry()}}>
                  <View style={{ flex: 1, alignSelf: 'stretch', flexDirection: "row", marginBottom: 25}}>
                    <FontAwesome5 name={"cut"} size={20} color={'#6E6E6E'} />
                    <Text style={{fontSize: this.props.show ? 12 : 0, marginLeft: 20, fontFamily: 'Laila-SemiBold', color: '#6E6E6E'}}> Split </Text>
                  </View>
                  
                </TouchableHighlight>

            {this.props.billIsPlanned
                ?
              <View>
                <TouchableHighlight onPress={() => {this.props.markAsPaid()}}>
                  <View style={{ flex: 1, alignSelf: 'stretch', flexDirection: "row", marginBottom: 25}}>
                    <FontAwesome5 name={"check-circle"} size={20} color={this.props.billIsPaid ? '#4A0784' : '#6E6E6E'} />
                    <Text style={{fontSize: this.props.show ? 12 : 0, marginLeft: 20, fontFamily: 'Laila-SemiBold', color: '#6E6E6E'}}> {this.props.billIsPaid ? "Unmark as paid" : "Mark as paid"}</Text>
                  </View>
                </TouchableHighlight>
                <TouchableHighlight onPress={() => {this.props.markAsUnplanned()}}>
                  <View style={{ flex: 1, alignSelf: 'stretch', flexDirection: "row", marginBottom: 25}}>
                    <FontAwesome5 name={"edit"} size={20} color={'#6E6E6E'} />
                    <Text style={{fontSize: this.props.show ? 12 : 0, marginLeft: 20, fontFamily: 'Laila-SemiBold', color: '#6E6E6E'}}> Back to unplanned </Text>
                  </View>
                </TouchableHighlight>
              </View>
                :
              <Text></Text> }
            </View>
          </ScrollView>
        </Container>
      );
    }
  }

  export default QuickActionDrawer;