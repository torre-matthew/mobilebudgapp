import React, { Component } from "react";
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Container, Header, Content, Card, CardItem, Text, Body } from "native-base";
import { FontAwesome5 } from '@expo/vector-icons';
import style from "../Styles/Styles";
import ApiMethods from '../utilities/apiMethods';
import MonthPickerModal2 from '../Components/monthPickerModal2';
import AddIncomeForm from "../Components/addIncomeForm";
import AddBillForm from "../Components/addBillForm";
import { FontAwesome } from '@expo/vector-icons';
import EditEntryScreen from "./editEntryScreen";


const addEntryScreenStyles = StyleSheet.create({

  income_button_inactive: {
    backgroundColor: '#F5F5F5',
    borderRadius: 60,
    width: '90%',
    alignSelf: 'center',
    alignItems: 'center',
    padding: 10,
    elevation: 5,
    shadowColor: '#4A0784',
    marginTop: 15,
    marginBottom: 15
  },

  income_button_active: {
    backgroundColor: '#40DBCE',
    borderRadius: 60,
    width: '90%',
    alignSelf: 'center',
    alignItems: 'center',
    padding: 10,
    elevation: 5,
    shadowColor: '#4A0784',
    marginTop: 15,
    marginBottom: 15
  },

  billExpense_button_inactive: {
    backgroundColor: '#F5F5F5',
    borderRadius: 60,
    width: '90%',
    alignSelf: 'center',
    alignItems: 'center',
    padding: 10,
    elevation: 5,
    shadowColor: '#4A0784',
    marginTop: 15,
    marginBottom: 15
  },

  billExpense_button_active: {
    backgroundColor: 'red',
    borderRadius: 60,
    width: '90%',
    alignSelf: 'center',
    alignItems: 'center',
    padding: 10,
    elevation: 5,
    shadowColor: '#4A0784',
    marginTop: 15,
    marginBottom: 15
  },
  
  })

class AddEntryScreen extends Component {

  state = {
    income_name: '',
    income_date: '',
    income_amount: '',
    due_date: '',
    bill_name: '',
    amount_due: '',
    monthData: [],
    loggedInUserID: '',
    showIncomeForm: false,
    showBillExpenseForm: false,
    month: '',
    monthID: '',
    forBillTracker: false
  }

  componentDidMount(){
    this.getMonthDataFromDB();
    this.setState({
      month: this.props.route.params.currentMonth,
      monthID: this.props.route.params.currentMonthID  
    });
  }

  getMonthDataFromDB = () => {
    return ApiMethods.getMonthData()
    .then(monthDataArrayFromDB => {
      this.setState({
        monthData: monthDataArrayFromDB.data
      });
    })
    .catch(err => console.log(err));
  }

  handleIncomeName = text => {
    this.setState({
      income_name: text
    });
  };

  selectNewMonth = (month, monthID) => {
    this.setState({
      month: month,
      monthID: monthID
    })
  }
  handleIncomeDate = (incomeDate) => {
    
    this.setState({
      income_date: incomeDate
    });
  };

  handleIncomeAmount = text => {
    
    this.setState({
      income_amount: text
    });
  };
  
  handleDueDate = (dueDate) => {
    
    this.setState({
      due_date: dueDate,
    });
  };
  
  
  handleBillName = text => {
    
    this.setState({
      bill_name: text,
    });
  };

  handleBillAmount = text => {
    
    this.setState({
      amount_due: text,
    });
  };

  addToBillTracker = () => {
    switch (this.state.forBillTracker) {
      case true:
        this.setState({forBillTracker: false})
        break;
      case false:
        this.setState({forBillTracker: true})
    }
  }

  handleFormSubmit = async (event) => {
    await ApiMethods.addExpense(this.state.bill_name, this.state.due_date, this.state.amount_due, this.props.route.params.currentUserID, this.state.monthID, this.state.forBillTracker);
    await this.props.route.params.getUnPlannedExpenseDataFromDB(this.props.route.params.currentUserID, this.state.monthID);
    await this.props.navigation.navigate('Budget');
    
  };

  handleAddIncomeFormSubmit = async (event) => {
    await ApiMethods.addIncome(this.state.income_name, this.state.income_date, this.state.income_amount, this.props.route.params.currentUserID, this.state.monthID)
    await this.props.route.params.getIncomeDataFromDB(this.props.route.params.currentUserID, this.state.monthID);
    await this.props.navigation.navigate('Budget');
  }

 render() {

   const {navigation} = this.props;

    return (
      <Container style={{flex: 1}}>
            <View style={{height: '10%', flexDirection: 'row', marginTop: '10%', marginBottom: '2%'}}>
              <View style={{flexGrow: 5}}>
                <TouchableOpacity
                  onPress={() => {this.setState({showIncomeForm: true, showBillExpenseForm: false})}}
                  style={this.state.showIncomeForm ? addEntryScreenStyles.income_button_active : addEntryScreenStyles.income_button_inactive}>
                    <Text style={{fontSize: 15, fontFamily: 'Laila-SemiBold', color: this.state.showIncomeForm ? '#F5F5F5' : '#40DBCE'}}> Income </Text>
                </TouchableOpacity>
              </View>
              <View style={{flexGrow: 4}}>
                <TouchableOpacity
                  onPress={() => {this.setState({showBillExpenseForm: true, showIncomeForm: false})}}
                  style={this.state.showBillExpenseForm ? addEntryScreenStyles.billExpense_button_active : addEntryScreenStyles.billExpense_button_inactive}>
                    <Text style={{fontSize: 15, fontFamily: 'Laila-SemiBold', color: this.state.showBillExpenseForm ? '#F5F5F5' : 'red'}}> Budget Item </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{marginBottom: '2%', marginTop: '5%', height: '5%', alignSelf: 'center'}}>
              <MonthPickerModal2 
                monthData={this.state.monthData} 
                currentMonth={this.state.month}
                currentYear={this.state.currentYear}
                currentMonthID={this.state.monthID}
                selectNewMonth={this.selectNewMonth}
                fetchData={this.fetchData} />
            </View>
            {
              this.state.showIncomeForm 
              ?
              <View style={{height: '60%', justifyContent: 'center'}}>
                <AddIncomeForm
                  handleIncomeAmount={this.handleIncomeAmount}
                  handleIncomeDate={this.handleIncomeDate}
                  handleIncomeName={this.handleIncomeName}
                  handleAddIncomeFormSubmit={this.handleAddIncomeFormSubmit}
                />
              </View>
              :
              <Text />           
            }
            {
              this.state.showBillExpenseForm 
              ?
              <View style={{height: '60%'}}>
                <View onTouchEnd={this.addToBillTracker} style={{marginTop: 15, flexDirection: 'row', alignSelf: 'center'}}>
                  {this.state.forBillTracker ?
                    <FontAwesome name="check-square-o" size={20} color="black" />
                    :
                    <FontAwesome name="square-o" size={20} color="black" />
                  }
                <Text style={{fontSize: 16, fontFamily: 'Laila-SemiBold', marginLeft: 5}}>
                  Add to bill tracker checklist 
                </Text> 
              </View>
              <AddBillForm
                handleBillAmount={this.handleBillAmount}
                handleDueDate={this.handleDueDate}
                handleBillName={this.handleBillName}
                handleFormSubmit={this.handleFormSubmit} />
              </View>
              :
              <Text />           
            }
      </Container>
      
    );
  }
}

  export default AddEntryScreen;