import React, { Component } from "react";
import { View, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native';
import { Container, Header, Content, Card, CardItem, Text, Body } from "native-base";
import { FontAwesome5 } from '@expo/vector-icons';
import style from "../Styles/Styles";
import ApiMethods from '../utilities/apiMethods';
import MonthPickerModal2 from '../Components/monthPickerModal2';
import AddIncomeForm from "../Components/addIncomeForm";
import AddBillForm from "../Components/addBillForm";
import BackGroundImage from "../Styles/images/app background 2.png";
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
    month: this.props.route.params.currentMonth,
    monthID: this.props.route.params.currentMonthID
  }

  componentDidMount(){
    this.getMonthDataFromDB();
    this.getLoggedInUserIdByEmail(this.props.route.params.loggedInUsersEmail);
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

  getLoggedInUserIdByEmail = (email) => {
    ApiMethods.getUserByEmail(email)
    .then(data => 
          this.setState({
            loggedInUserID: data.data[0]._id 
          })
        )
    .catch(err => console.log(err))
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
      income_date: incomeDate.toString().substr(4, 12)
    });
  };

  handleIncomeAmount = text => {
    
    this.setState({
      income_amount: text
    });
  };
  
  handleDueDate = (dueDate) => {
    
    this.setState({
      due_date: dueDate.toString().substr(4, 12),
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

  handleFormSubmit = event => {
    // Preventing the default behavior of the form submit (which is to refresh the page)
    // event.preventDefault();
    ApiMethods
    .addExpense(this.state.bill_name, this.state.due_date, this.state.amount_due, this.state.loggedInUserID, this.state.monthID)
    .then(data => res.json(data))
    .catch(err => console.log(err))

    this.props.navigation.navigate('Main');
  };

  handleAddIncomeFormSubmit = event => {
    // Preventing the default behavior of the form submit (which is to refresh the page)
    // event.preventDefault();

    ApiMethods.addIncome(this.state.income_name, this.state.income_date, this.state.income_amount, this.state.loggedInUserID, this.state.monthID)
    .then(data => res.json(data))
    .catch(err => console.log(err));

    this.props.navigation.navigate('Main');
  }

 render() {

   const {navigation} = this.props;

    return (
      <Container style={{position: 'relative'}}>
        <ImageBackground
            source={BackGroundImage}
            style={{width: '100%', height: '100%'}} >
            <View style={{position: 'relative', alignSelf: 'center', marginTop: '15%'}}>
              <Text style={{fontSize: 20, fontFamily: 'Laila-SemiBold'}}>
                Add new
              </Text> 
            </View>
            <View style={{height: '10%', marginTop: 15, flexDirection: 'row'}}>
              <View style={{flexGrow: 5}}>
                <TouchableOpacity
                  onPress={() => {this.setState({showIncomeForm: true, showBillExpenseForm: false})}}
                  style={this.state.showIncomeForm ? addEntryScreenStyles.income_button_active : addEntryScreenStyles.income_button_inactive}>
                    <Text style={{fontSize: 15, fontFamily: 'Laila-SemiBold', color: this.state.showIncomeForm ? '#F5F5F5' : '#40DBCE'}}> Income </Text>
                </TouchableOpacity>
              </View>
              <View style={{flexGrow: 0.125, marginTop: '5%'}}>
              <Text style={{fontSize: 20, fontFamily: 'Laila-SemiBold'}}>
                or
              </Text> 
            </View>
              <View style={{flexGrow: 4}}>
                <TouchableOpacity
                  onPress={() => {this.setState({showBillExpenseForm: true, showIncomeForm: false})}}
                  style={this.state.showBillExpenseForm ? addEntryScreenStyles.billExpense_button_active : addEntryScreenStyles.billExpense_button_inactive}>
                    <Text style={{fontSize: 15, fontFamily: 'Laila-SemiBold', color: this.state.showBillExpenseForm ? '#F5F5F5' : 'red'}}> Bill/Expense </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{marginBottom: 25, marginTop: 15}}>
              <MonthPickerModal2 
                monthData={this.state.monthData} 
                currentMonth={this.state.month}
                currentYear={this.props.route.params.currentYear}
                currentMonthID={this.state.monthID}
                selectNewMonth={this.selectNewMonth}
                fetchData={this.fetchData} />
              </View>
            {
              this.state.showIncomeForm 
              ?
              <View style={{height: '30%'}}>
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
                <AddBillForm
                  handleBillAmount={this.handleBillAmount}
                  handleDueDate={this.handleDueDate}
                  handleBillName={this.handleBillName}
                  handleFormSubmit={this.handleFormSubmit} />
              </View>
              :
              <Text />           
            }
        </ImageBackground> 
      </Container>
      
    );
  }
}

  export default AddEntryScreen;