import React, { Component } from "react";
import { View, Modal, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Container, Header, Content, Card, CardItem, Text, Body } from "native-base";
import style from "../Styles/Styles";
import ApiMethods from '../utilities/apiMethods';


  class PlannedBillWrapperEmptyState extends Component {
    state = {
      modalVisible: false
    };
  
    setModalVisible = (visible) => {
      this.setState({
        modalVisible: visible,
        whatsBeingEdited: "bill"
      });
    }
  
    closeModal = () => {
      this.setModalVisible(!this.state.modalVisible);
    }
  
    render () {
        return (
            <View>
              <View style={{alignItems: 'center', paddingLeft: 5, paddingRight: 5, paddingTop: 5 }}> 
              <Text style={{fontSize: 15, fontFamily: 'Laila-SemiBold'}}> Start adding items to your budget. </Text>
              </View>
            </View>    
        )
      }
    }
  
    export default PlannedBillWrapperEmptyState;