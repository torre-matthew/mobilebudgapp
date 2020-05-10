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
              <Text style={{fontSize: 15 }}> 3  </Text>
            </View>
            <View style={{alignItems: 'center', paddingLeft: 5, paddingRight: 5, paddingTop: 5 }}> 
              <Text style={{fontSize: 15 }}> Finally, planned bills and expenses appear here.  </Text>
            </View>
            <View style={{alignItems: 'center', paddingLeft: 5, paddingRight: 5, paddingTop: 1 }}> 
              <Text style={{fontSize: 15 }}> You can also track bills as you pay them.</Text>
            </View>
          </View>    
        )
      }
    }
  
    export default PlannedBillWrapperEmptyState;