import React, { Component } from "react";
import { View, Modal, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Container, Header, Content, Card, CardItem, Text, Body } from "native-base";
import EditBillFormDisplay from "./editBillForm";
import IncomeDisplay from "./incomeDisplay";
import style from "../Styles/Styles";
import ApiMethods from '../utilities/apiMethods';


class UnplannedBillDisplay extends Component {
  state = {
    modalVisible: false,
    whatsBeingEdited: "",
    fundingSourceName: "",
    fundingSourceAmount: "",
    showMarkAsPaid: this.props.showMarkAsPaid,
    colorIfPaid: "",
    textColorIfPaid: "",
    markAsPaidButtonText: "",
    paidDisplayText: "",
    paidBillDescriptionTextInModal: ""
  };

  componentDidMount() {
    this.getFundingSourceInfo(this.props.billID);
    this.changeDisplayWhenMarkedAsPaid();
  }

  updateBillDisplayComponent = () => {
    this.componentDidMount();
    this.props.updateWrapperComponent();
  }

  setModalVisible = (visible) => {
    this.setState({
      modalVisible: visible,
      whatsBeingEdited: "bill"
    });
  }

  closeModal = () => {
    this.setModalVisible(!this.state.modalVisible);
    this.componentDidMount();
    this.props.updateWrapperComponent();
  }

  markAsUnplanned = () => {
    ApiMethods.editExpense(this.props.billID, this.props.billName, this.props.dueDate, this.props.billAmount, false, "", this.props.loggedInUserID)
            .then(res => {
                if (res.data.nModified === 0) {
                    alert('Sorry, there was a problem. Please try again');
                } else {
                    this.closeModal();
                    this.props.updateWrapperComponent();
                    // Alert.alert('', 'Successfully updated',[{text: 'OK'}] );
                }
                })
            .catch(err => console.log(err));

  }

  markAsPaid = (id, bool) => {
    switch (bool) {
      case true:
        ApiMethods.markExpenseAsPaid(id, false)
          .then(data => {
            this.updateBillDisplayComponent();
            this.setState({markAsPaidButtonText: "Mark as paid", paidBillDescriptionTextInModal: "This is currently unpaid"})
          })
          .catch(err => console.log(err));
          break;
      case false:
        ApiMethods.markExpenseAsPaid(id, true)
          .then(data => {
            this.updateBillDisplayComponent();
            this.setState({markAsPaidButtonText: "Mark as upaid", paidBillDescriptionTextInModal: "This has been paid"});
          })
          .catch(err => console.log(err));
    }
  }

  changeDisplayWhenMarkedAsPaid = () => {
    switch (this.props.billIsPaid) {
      case true:
        this.setState({
          colorIfPaid: "#474198", 
          textColorIfPaid: "#F5F5F5", 
          markAsPaidButtonText: "Mark as unpaid",
          paidBillDescriptionTextInModal: "This has been paid",
          paidDisplayText: "Paid"
        })
          break;
      case false:
        this.setState({
          colorIfPaid: "#E5F3F3",
          textColorIfPaid: "black",
          markAsPaidButtonText: "Mark as paid",
          paidBillDescriptionTextInModal: "This is currently unpaid",
          paidDisplayText: ""
        })
    }
  }

  deleteExpense = (idToDelete) => {
    ApiMethods.deleteExpense(idToDelete)
    .then(res => {
      if (res.data.deletedCount === 0) {
        alert('Sorry, ' + idToDelete + ' could not be deleted');

      } else if (this.props.billIsPlanned) {
        alert('You have successfully deleted ' + this.props.billName);

          ApiMethods
            .updateAfterSpendingAmount(this.props.billFundingSourceID)
            .then(data => {
              ApiMethods
                .updateIncomeOnUserRecord(this.props.loggedInUserID)
                .then(data => {
                  this.props.updateWrapperComponent();
                  })
                .catch(err => console.log(err));
              })
            .catch(err => console.log(err))
          
          this.closeModal();
      } else {
        alert('You have successfully deleted ' + this.props.billName);
        
        ApiMethods.updateIncomeOnUserRecord(this.props.loggedInUserID)
        .then(data => {
          this.props.updateWrapperComponent();
        })
        .catch(err => console.log(err));

        this.closeModal();
      }
    })
    .catch(err => console.log(err));
  }

  getFundingSourceInfo = (expenseID) => {
    if (this.props.billIsPlanned) {
        ApiMethods.getExpenseByID(expenseID)
          .then(data => {
            ApiMethods.getIncomeByID(data.data[0].fundingSource)
              .then(data => {
                  this.setState({
                    fundingSourceName: data.data[0].name,
                    fundingSourceAmount: "$" + data.data[0].afterSpendingAmount + " remains"
                    });                      
                  })
              .catch(err => console.log(err))
            })
          .catch(err => console.log(err));

    } else {
      this.setState({
        fundingSourceName: "",
        fundingSourceAmount: "not yet planned"
      });
    }
  }

  showConfirmationAlert = (idToDelete) => {

  Alert.alert(
    'Delete Expense ' + idToDelete,
    'Are you sure?',
    [ 
      {text: 'Nevermind', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
      {text: 'Yes, I am', onPress: () => {this.deleteExpense(idToDelete)},
      },
      ],
    {cancelable: false},
  );
}

  render () {
      return (
        <View>
            <Modal
              style={{flex: 1}}
              animationType="fade"
              transparent={false}
              visible={this.state.modalVisible}
              onRequestClose={this.closeModal}>
                <View style={{flex: 1}}>
                <ScrollView>
                <View style={{flex: 1, justifyContent: 'flex-end'}}>
                  <EditBillFormDisplay 
                    dueDate={this.props.dueDate}
                    billName={this.props.billName}
                    billAmount={this.props.billAmount}
                    billID={this.props.billID}
                    billIsPlanned={this.props.billIsPlanned}
                    billFundingSourceID={this.props.billFundingSourceID}
                    fundingSourceName={this.state.fundingSourceName}
                    fundingSourceAmount={this.state.fundingSourceAmount}
                    closeModalOnSubmit={this.closeModal}
                    incomeDataFromDB={this.props.incomeDataFromDB}
                    whatsBeingEdited={this.state.whatsBeingEdited}
                    updateWrapperComponent={this.props.updateWrapperComponent}
                    updateDisplayComponent={this.updateBillDisplayComponent}
                    loggedInUserID={this.props.loggedInUserID}
                    isThisPlanned={this.props.isThisPlanned}
                  />
                </View>
                <View style={{flex: 1, justifyContent: 'flex-end'}}>
                <View style={{ flex: 1, alignSelf: 'stretch'}}>
                <TouchableOpacity
                  onPress={() => {}}
                  style={style.button3_small_light_style}>
                    <Text style={{fontSize: 12, color: '#4A0784'}}> Split </Text>
                </TouchableOpacity>
                </View>
                <View style={{ flex: 1, alignSelf: 'stretch'}}>
                <TouchableOpacity
                  onPress={() => {}}
                  style={style.button3_small_light_style}>
                    <Text style={{fontSize: 12, color: '#4A0784'}}> Move </Text>
                </TouchableOpacity>
                </View>
                {this.state.showMarkAsPaid 
                ?
                <View style={{ flex: 1, marginTop: 100}}>
                <View style={{ flex: 1, alignSelf: 'stretch'}}>
                <TouchableOpacity
                  onPress={() => {this.markAsUnplanned()}}
                  style={style.button3_small_light_style}>
                    <Text style={{fontSize: 12, color: '#4A0784'}}> Move back to unplanned </Text>
                </TouchableOpacity>
                </View>
                <View style={{ flex: 1, alignSelf: 'stretch'}}>
                <TouchableOpacity
                  onPress={() => {this.markAsPaid(this.props.billID, this.props.billIsPaid)}}
                  style={this.props.billIsPaid ? style.button2_dark_style : style.button3_small_light_style}>
                    <Text style={{fontSize: 12, color: this.props.billIsPaid ? '#F5F5F5' : '#4A0784'}}> {this.state.markAsPaidButtonText} </Text>
                </TouchableOpacity>
                </View>
                </View>
                :
                <Text />
                }
                <View style={{marginTop: 100}}>
                <TouchableOpacity
                  onPress={() => {this.showConfirmationAlert(this.props.billID);}}
                  style={style.button2_light_style}>
                <Text style={{color: 'red' }}> Delete Expense </Text>
                </TouchableOpacity>
                </View>
                </View>
                </ScrollView>
                </View>
            </Modal>
            <View>
              <View onTouchEnd={() => {this.setModalVisible(true)}} style={{ flex: 1, alignSelf: 'stretch', flexDirection: 'row', marginTop: 10 }}>
                <View style={{ flex: 1, alignSelf: 'flex-start', backgroundColor: '#F5F5F5', flexGrow: 3, paddingLeft: 5, paddingTop: 15, paddingBottom: 15, borderTopLeftRadius: 15 }}> 
                  <Text style={{fontSize: 18 }}> {this.props.billName} </Text>
                </View>
                <View style={{ flex: 1, alignItems:'center', backgroundColor: '#F5F5F5', flexGrow: 1, paddingTop: 15, paddingBottom: 15, borderTopRightRadius: 15 }}> 
                  <Text style={{fontSize: 18 }}> ${this.props.billAmount} </Text>
                </View>
              </View>
              <View style={{ flex: 1, alignSelf: 'stretch', flexDirection: 'row', backgroundColor: '#E5F3F3', borderBottomLeftRadius: 15, borderBottomRightRadius: 15}}>
                <View style={{ flex: 1, alignSelf: 'stretch', flexGrow: 3, paddingTop: 1, paddingBottom: 5, paddingLeft: 5,}}> 
                  <Text style={{fontSize: 12 }}> Due: {this.props.dueDate} </Text>
                </View>
                <View style={{ flex: 1, alignSelf: 'stretch', flexGrow: 5, paddingTop: 1, paddingBottom: 5, paddingLeft: 5,}}> 
                  <Text style={{fontSize: 12 }}> {this.state.fundingSourceName + ' ' + this.state.fundingSourceAmount} </Text>
                </View>
                {this.state.showMarkAsPaid 
                ?
                <View style={{ flex: 1, alignSelf: 'stretch', flexGrow: 1, backgroundColor: this.state.colorIfPaid, paddingTop: 1, paddingBottom: 5, paddingLeft: 5, borderTopLeftRadius: 10, borderBottomLeftRadius: 10, borderBottomRightRadius: 10}}> 
                  <Text style={{color: this.state.textColorIfPaid, fontSize: 12 }}> {this.state.paidDisplayText} </Text>
                </View>
                :
                <Text />
                }
              </View>
            </View>
          </View>
      );
    }
  }

  export default UnplannedBillDisplay;