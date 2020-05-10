import React, { Component } from "react";
import { View, Modal, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Container, Header, Content, Card, CardItem, Text, Body } from "native-base";
import style from "../Styles/Styles";
import ApiMethods from '../utilities/apiMethods';


  class UnPlannedBillWrapperEmptyState extends Component {
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
            <View style={{alignItems: 'center', paddingLeft: 5, paddingRight: 5, paddingTop: 5, paddingBottom: 5, margin: 5 }}> 
                <Text style={{fontSize: 15 }}> 2 </Text>
              </View>
              <View style={{alignItems: 'center', paddingLeft: 5, paddingRight: 5, paddingTop: 5, paddingBottom: 5, margin: 5 }}> 
                <Text style={{fontSize: 15 }}> Then add your monthly bills and expenses here.</Text>
              </View>
              <View style={{alignItems: 'center', paddingLeft: 5, paddingRight: 5, paddingTop: 5 }}> 
                <Text style={{fontSize: 15 }}> Plan your month by funding each item with</Text>
              </View>
              <View style={{alignItems: 'center', paddingLeft: 5, paddingRight: 5, paddingTop: 1 }}> 
                <Text style={{fontSize: 15 }}> income from above.</Text>
              </View>
            </View>    
        )
      }
    }
  
    export default UnPlannedBillWrapperEmptyState;