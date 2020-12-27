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
    monthData: [],
    showComponent: false
  }

  componentDidMount() {
    this.fetchData();
    LoadFonts().then(fonts => {this.setState({fontsLoaded: true})}).catch(err => console.log(err));
  }

  fetchData = () => {
    this.getPlannedExpenseDataFromDB();
    this.getUnPlannedExpenseDataFromDB();
    this.getIncomeDataFromDB();
    this.getMonthDataFromDB();
    this.setState({showComponent: true});
  }

  getPlannedExpenseDataFromDB = () => {
    ApiMethods.getAllPlannedExpenses(this.props.route.params.userID, this.props.route.params.currentMonthID)
    .then(expenses => {
      this.setState({
        currentPlannedExpensesFromDB: expenses.data
      })
    })
    .catch(err => console.log(err));
  }

  getUnPlannedExpenseDataFromDB = () => {
    ApiMethods.getAllUnPlannedExpenses(this.props.route.params.userID, this.props.route.params.currentMonthID)
      .then(expenses => {
              this.setState({
                currentUnPlannedExpensesFromDB: expenses.data
              });
            })
            .catch(err => console.log(err));
  }

  getIncomeDataFromDB = () => {
    ApiMethods
            .getIncomeByUserID(this.props.route.params.userID, this.props.route.params.currentMonthID)
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
              currentMonth={this.props.route.params.currentMonth}
              currentYear={this.props.route.params.currentYear}
              currentMonthID={this.props.route.params.currentMonthID}
              currentPlannedExpensesFromDB={this.state.currentPlannedExpensesFromDB}
              currentUnPlannedExpensesFromDB={this.state.currentUnPlannedExpensesFromDB}
              currentIncomeFromDB={this.state.currentIncomeFromDB}
              monthData={this.state.monthData}
              fetchData={this.fetchData}
              navigation={navigation}
              photoURL={this.props.route.params.photoURL}
              signOut={this.props.route.params.signOut}
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
              currentMonth={this.props.route.params.currentMonth}
              currentYear={this.props.route.params.currentYear}
              currentMonthID={this.props.route.params.currentMonthID}
              getUnPlannedExpenseDataFromDB={this.getUnPlannedExpenseDataFromDB}
              screen={"budget"}
              />
          </Container>
        );
    }
  }
}

  export default BudgetScreen;