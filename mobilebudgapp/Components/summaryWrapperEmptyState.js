import React, { Component } from "react";
import { View, Modal, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Container, Header, Content, Card, CardItem, Text, Body } from "native-base";
import style from "../Styles/Styles";
import ApiMethods from '../utilities/apiMethods';


  class SummaryWrapperEmptyState extends Component {
    state = {
      modalVisible: false
    };
  
    setModalVisible = (visible) => {
      this.setState({
        modalVisible: visible,
      });
    }
  
    closeModal = () => {
      this.setModalVisible(!this.state.modalVisible);
    }
  
    render () {
        return (
            <View>
              <View style={{alignItems: 'center', paddingLeft: 5, paddingRight: 5, paddingTop: 5 }}> 
                <Text style={{fontSize: 15 }}> 1 </Text>
              </View>
            <View style={{alignItems: 'center', paddingLeft: 5, paddingRight: 5, paddingTop: 5 }}> 
              <Text style={{fontSize: 15 }}> for each time you'll be paid this month.  </Text>
            </View>
            <View style={{alignItems: 'center', paddingLeft: 5, paddingRight: 5, paddingTop: 1 }}> 
              <Text style={{fontSize: 15 }}> or </Text>
            </View>
          </View>    
        )
      }
    }
  
    export default SummaryWrapperEmptyState;