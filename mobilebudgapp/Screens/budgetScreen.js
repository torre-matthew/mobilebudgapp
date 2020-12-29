import React, { Component } from "react";
import { View } from 'react-native';
import { Container, Header, Content, Card, CardItem, Text, Body, Button } from "native-base";
import { AppLoading } from 'expo';
import MainPage from '../Components/mainPage';
import AppHeader from '../Components/appfooter';
import LoadFonts from '../assets/fonts';
import AppFooter from '../Components/appfooter';
import ApiMethods from '../utilities/apiMethods';

class BudgetScreen extends Component {

  state = {
    fontsLoaded: false,
    currentPlannedExpensesFromDB: [],
    currentUnPlannedExpensesFromDB: [],
    currentIncomeFromDB: [],
    currentMonth: "",
    currentMonthID: "",
    monthData: [],
    showComponent: false,
    doesCurrentMonthNeedData: false,
  }

  componentDidMount() {
    this.fetchData(this.props.route.params.userID, this.props.route.params.currentMonthID);
    this.setState({currentMonth: this.props.route.params.currentMonth, currentMonthID: this.props.route.params.currentMonthID});
    LoadFonts().then(fonts => {this.setState({fontsLoaded: true})}).catch(err => console.log(err));
  }

  fetchData = (userID, currentMonthID) => {
    this.getPlannedExpenseDataFromDB(userID, currentMonthID);
    this.getUnPlannedExpenseDataFromDB(userID, currentMonthID);
    this.getIncomeDataFromDB(userID, currentMonthID);
    this.getMonthDataFromDB();
    this.setState({showComponent: true});
  }

  getPlannedExpenseDataFromDB = (userID, currentMonthID) => {
    ApiMethods.getAllPlannedExpenses(userID, currentMonthID)
    .then(expenses => {
      this.setState({
        currentPlannedExpensesFromDB: expenses.data
      })
    })
    .catch(err => console.log(err));
  }

  getUnPlannedExpenseDataFromDB = (userID, currentMonthID) => {
    ApiMethods.getAllUnPlannedExpenses(userID, currentMonthID)
      .then(expenses => {
              this.setState({
                currentUnPlannedExpensesFromDB: expenses.data
              });
            })
            .catch(err => console.log(err));
  }

  getIncomeDataFromDB = (userID, currentMonthID) => {
    ApiMethods
            .getIncomeByUserID(userID, currentMonthID)
            .then(income => {
                this.setState({
                  currentIncomeFromDB: income.data
                  })
              })
            .catch(err => console.log(err))
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


  selectNewMonth = async (month, monthID) => {
    // Check to see if there are any unplanned expenses in this month
        await ApiMethods.getAllUnPlannedExpenses(this.props.route.params.userID, monthID)
                .then(expenses => {
                  if (expenses.data.length === 0) {
                    this.setState({doesCurrentMonthNeedData: true})
                  }
                })
                .catch(err => console.log(err));
    // Check to see if there are any planned expenses in this month
        await  ApiMethods.getAllPlannedExpenses(this.props.route.params.userID, monthID)
                .then(expenses => {
                  if (expenses.data.length === 0) {
                    this.setState({doesCurrentMonthNeedData: true})
                  }
                })
                .catch(err => console.log(err));
    // Check to see if there are is any income in this month
        await  ApiMethods.getIncomeByUserID(this.props.route.params.userID, monthID)
                  .then(income => {
                    if (income.data.length === 0) { // previousMonthID, userID, targetMonthID
                          this.props.navigation.navigate('Create New Budget', {previousMonthName: this.props.route.params.currentMonth, previousMonthID: this.props.route.params.currentMonthID, userID: this.props.route.params.userID, targetMonthID: monthID, targetMonthName: month, fetchData: this.fetchData});
                          this.setState({currentMonth: month, currentMonthID: monthID, doesCurrentMonthNeedData: true},() => {this.fetchData(this.props.route.params.userID, monthID)});                  
                    } else {
                          this.setState({currentMonth: month, currentMonthID: monthID, doesCurrentMonthNeedData: false},() => {this.fetchData(this.props.route.params.userID, monthID)});
                    }
                  })
                  .catch(err => console.log(err));
      }







    render(){
        const {navigation} = this.props;
    
    if (!this.state.fontsLoaded) {
       return <AppLoading />;
    } else {
        return (
          <Container> 
            {this.state.showComponent
              ?
            <View style={{ position: 'relative', zIndex: 0, height: '92%'}}>
            <MainPage 
              loggedInUsersEmail={this.props.route.params.email}
              currentUserID={this.props.route.params.userID}
              currentMonth={this.state.currentMonth}
              currentYear={this.props.route.params.currentYear}
              currentMonthID={this.state.currentMonthID}
              currentPlannedExpensesFromDB={this.state.currentPlannedExpensesFromDB}
              currentUnPlannedExpensesFromDB={this.state.currentUnPlannedExpensesFromDB}
              currentIncomeFromDB={this.state.currentIncomeFromDB}
              monthData={this.state.monthData}
              fetchData={this.fetchData}
              navigation={navigation}
              photoURL={this.props.route.params.photoURL}
              signOut={this.props.route.params.signOut}
              selectNewMonth={this.selectNewMonth}
            />
            </View>
              :
              <Text>Loading</Text>
              }
              {/* <MainPage 
              loggedInUsersEmail={"torre.pk.matthew@gmail.com"}
              currentMonth={"May"}
              currentYear={"2020"}
              currentMonthID={"5eaf6211e7b5c6001726776a"}
              navigation={navigation}
              photoURL={"https://lh3.googleusercontent.com/a-/AOh14GiYRuLnlpz-uypUOvbDG_uVR56n6DxLoC5Ubb-Wcg"}
              // signOut={this.props.route.params.signOut}
              /> */}
              <AppFooter 
              navigation={this.props.navigation}
              loggedInUsersEmail={this.props.route.params.email}
              currentUserID={this.props.route.params.userID}
              currentMonth={this.state.currentMonth}
              currentYear={this.props.route.params.currentYear}
              currentMonthID={this.state.currentMonthID}
              getUnPlannedExpenseDataFromDB={this.getUnPlannedExpenseDataFromDB}
              getIncomeDataFromDB={this.getIncomeDataFromDB}
              screen={"budget"}
              />
          </Container>
        );
    }
  }
}

  export default BudgetScreen;