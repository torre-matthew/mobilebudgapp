import React, { Component } from 'react';
import { ActivityIndicator, Platform, StyleSheet, Alert, View, ScrollView, RefreshControl, ImageBackground } from 'react-native';
import { Container, Button, Content, Form, Item, Input} from 'native-base';
import SummaryWrapper from './summaryWrapper';
import UnplannedBillWrapper from './unplannedBillWrapper';
import PlannedBillWrapper from './plannedBillWrapper';
import MonthPickerModal from './monthPickerModal';
import SlideOutDrawer from './slideOutDrawer';
import QuickActionDrawer2 from "../Components/quickActionDrawer2";
import OverLay from "../Components/overLay";
import AddEntryIcon from '../Components/addEntryIcon';
import CategorySlideOutOverlay from "../Components/overlays/categorySlideOutOverlay";
import IncomeSummarySwitcher from "./incomeSummarySwitcher";
import { thisExpression } from '@babel/types';
import AppFooter from './appfooter';
import { FontAwesome5 } from '@expo/vector-icons';
import ApiMethods from '../utilities/apiMethods';
import * as Font from 'expo-font';
import LoadFonts from '../assets/fonts';
import AppHeader from './appheader';
import Animation from "../utilities/animation";


const style = require("../Styles/Styles");
const backgroundImage = require('../Styles/images/app background 3.png');

function wait(timeout) {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}

export default class MainPage extends Component {
  state = {
    due_date: '',
    bill_name: '',
    amount_due: '',
    currentUnPlannedExpensesFromDB: [],
    currentPlannedExpensesFromDB: [],
    income_name: '',
    income_date: '',
    income_amount: '',
    currentIncomeFromDB: this.props.currentIncomeFromDB,
    afterSpendingData: [],
    monthData: [],
    arrayOfCategories: [],
    currentMonthID: this.props.currentMonthID,
    currentMonth: this.props.currentMonth,
    currentYear: this.props.currentYear,
    doesCurrentMonthNeedData: false,
    currentTotalIncome: 0,
    afterSpendingIncomeTotal: 0,
    recentlyAdded: false,
    afterSpendingClicked: false,
    plannedClicked: false,
    refreshing: false,
    signedIn: false,
    loggedInUsersEmail: this.props.loggedInUsersEmail,
    loggedInUserID: "",
    photoUrl: this.props.photoURL,
    spinnerSize: 20,
    spinnerOpacity: 1,
    showSpinner: true,
    fontsLoaded: false,
    showDrawer: false,
    showCategories: false,
    showOverLay: false,
    showCategorySlideOutOverlay: false,
    selectedBillID: "",
    selectedBillName: "",
    selectedBillAmount: "",
    selectedBillDueDate: "",
    selectedBillCategoryName: "",
    selectedBillCategoryID: "",
    selectedFundingSourceID: "",
    selectedFundingSourceName: "",
    selectedFundingSourceAmount: "",
    selectedBillCategoryIconName: "",
    selectedBillCategoryIconColor: "",
    selectedBillIsPaid: "",
    selectedBillIsForBillTracker: "",
    selectedBillIsPlanned: "",
    whatsBeingEdited: "",
    fontSize: 0,
    componentUpdateSwitch: false,
  };

  componentDidMount(){
    this.fetchData();
  }

  fetchData = () => {
    this.props.fetchData(this.props.currentUserID, this.props.currentMonthID);
    this.getTotalIncome();
    // await this.setState({componentUpdateSwitch: true});
    this.setState({spinnerSize: 0, spinnerOpacity: 0, showSpinner: false}); 
  }

  onRefresh = () => {
    this.setState({refreshing: true});
    wait(200).then(() => {
      this.setState({spinnerSize: 20, spinnerOpacity: 1, showSpinner: true})
      this.fetchData();
      this.setState({refreshing: false});
    });
  }

  updateComponent = () => {
    this.setState({state: this.state});
  }

  updateExpensesOnUserRecord = () => {
    ApiMethods.updateExpensesOnUserRecord(this.props.currentUserID).then(data => res.json(data)).catch(err => console.log(err));
  }

  getTotalIncome = () => {
    if (!this.state.afterSpendingClicked) {
      let totalIncome = 0;
      this.props.currentIncomeFromDB.forEach(element => {
      totalIncome += parseFloat(element.amount);
      });

      this.setState({
        currentTotalIncome: totalIncome.toFixed(2)
      });

      return totalIncome;

    } else {
      let totalIncome = 0;
      let totalSpent = 0;
      let afterSpendingIncomeTotal = 0;
      
      this.props.currentIncomeFromDB.forEach(element => {
        totalIncome += parseFloat(element.amount);
        });
      
      
      this.props.currentPlannedExpensesFromDB.forEach(element => {
      totalSpent += parseFloat(element.amountOfExpense);
      });

      afterSpendingIncomeTotal = totalIncome - totalSpent;

      this.setState({
        afterSpendingIncomeTotal: afterSpendingIncomeTotal.toFixed(2) 
      });
      return afterSpendingIncomeTotal;
    }
  }

  switcherLogic = (switcher) => {

    switch (switcher) {
      case 'after':
            this.setState({
              afterSpendingClicked: true
            },
            () => {
              this.getTotalIncome();
            });
          break;
      case 'before':
          this.setState({
            afterSpendingClicked: false
          },
          () => {
            this.getTotalIncome();
          });
        break;
      case 'unplanned':
        this.setState({
          plannedClicked: true
        },
        () => {
          
        });
      break;
    case 'planned':
      this.setState({
        plannedClicked: false
      },
      () => {
        
      });
    break;

    default:
        break;
    }



    if (switcher === 'after') {
      this.setState({
        afterSpendingClicked: true
      },
      () => {
        this.getTotalIncome();
      });
    } else {
      this.setState({
        afterSpendingClicked: false
      },
      () => {
        this.getTotalIncome();
      });
    }
  };

  showDrawerAndOverLayLogic = (billID, billName, billAmount, categoryName, categoryID, selectedBillCategoryIconName, selectedBillCategoryIconColor, billDueDate, fundingSourceID, fundingSourceName, fundingSourceAmount, billIsPaid, billIsPlanned, whatsBeingEdited, forBillTracker) => {
  
        this.setState({
          showDrawer: true,
          showOverLay: true,
          selectedBillID: billID,
          selectedBillName: billName,
          selectedBillAmount: billAmount,
          selectedBillCategoryName: categoryName,
          selectedBillCategoryID: categoryID,
          selectedBillCategoryIconName: selectedBillCategoryIconName,
          selectedBillCategoryIconColor: selectedBillCategoryIconColor,
          selectedBillDueDate: billDueDate,
          selectedFundingSourceID: fundingSourceID,
          selectedFundingSourceName: fundingSourceName,
          selectedFundingSourceAmount: fundingSourceAmount,
          selectedBillIsPaid: billIsPaid,
          selectedBillIsPlanned: billIsPlanned,
          whatsBeingEdited: whatsBeingEdited,
          selectedBillIsForBillTracker: forBillTracker
         })
  }

  showCategoriesDrawer = () => {
    this.getAllCategories();
    this.setState({
      showCategories: true,
      showCategorySlideOutOverlay: true
    })
  }

  hideDrawerAndOverLayLogic = (overLay) => {
    switch (overLay) {
      case "quickActionDrawer":
        this.setState({
          showDrawer: false,
          showOverLay: false,
        })
          break;
      case "categorySlideOut":
        this.setState({
          showCategories: false,
          showCategorySlideOutOverlay: false,
        })
    }
  }

  selectFundingSource = (fundingSourceID) => {
    Alert.alert(
      'Plan ' + this.state.selectedBillName + ' with this income?',
      '',
      [ 
        {text: 'Nevermind', style: 'cancel'},
        {text: 'Ok', onPress: () => {
          ApiMethods.editExpense(this.state.selectedBillID, this.state.selectedBillName, this.state.selectedBillDueDate, this.state.selectedBillAmount, true, fundingSourceID, this.props.currentUserID)
              .then(res => {
                  if (res.data.nModified === 0) {
                      alert('Sorry, there was a problem. Please try again');
                  } else {
                      this.fetchData();
                      this.props.navigation.navigate('Budget');
                  }
                  })
              .catch(err => console.log(err));
        }, 
      },
        ],
      {cancelable: false},
    );
  
    }
    
    moveToNextMonth = () => {
      Alert.alert(
        'Move ' + this.state.selectedBillName + ' to next month?',
        '',
        [ 
          {text: 'Nevermind', style: 'cancel'},
          {text: 'Ok', onPress: () => {
            ApiMethods.moveToNextMonth(this.state.selectedBillID).then(data => {return data}).catch(err => console.log(err));
            this.fetchData();
            this.hideDrawerAndOverLayLogic("quickActionDrawer");
          }, 
        },
          ],
        {cancelable: false},
      );
    }

    splitEntry = () => {
      Alert.alert(
        'Split ' + this.state.selectedBillName + '?',
        'I will create a new entry and evenly divide the amounts between this item and the newly created one?',
        [ 
          {text: 'Nevermind', style: 'cancel'},
          {text: 'Ok', onPress: () => {
            ApiMethods.splitEntry(this.state.selectedBillID).then(data => {return data}).catch(err => console.log(err));
            this.onRefresh();
            this.hideDrawerAndOverLayLogic("quickActionDrawer");
          }, 
        },
          ],
        {cancelable: false},
      );
    }

    markAsUnplanned = () => {

      Alert.alert(
        'Not ready to plan ' + this.state.selectedBillName + '?',
        'I will move this back to unplanned bills and expenses.',
        [ 
          {text: 'Nevermind', style: 'cancel'},
          {text: 'Ok', onPress: () => {
            ApiMethods.editExpense(this.state.selectedBillID, this.state.selectedBillName, this.state.selectedBillDueDate, this.state.selectedBillAmount, false, "", this.props.currentUserID)
              .then(res => {
                  if (res.data.nModified === 0) {
                      alert('Sorry, there was a problem. Please try again');
                  } else {
                      this.fetchData();
                      this.hideDrawerAndOverLayLogic("quickActionDrawer");
                  }
                  })
              .catch(err => console.log(err));
          }, 
        },
          ],
        {cancelable: false},
      );
  
    }

    addToBillTracker = (billID) => {
      ApiMethods.addToBillTracker(billID)
        .then(res => {
            alert(this.state.selectedBillName + ' has been added to your payment tracker.')
            this.showDrawerAndOverLayLogic(this.state.selectedBillID, this.state.selectedBillName, this.state.selectedBillAmount, this.state.selectedBillCategoryName, this.state.selectedBillCategoryID, this.state.selectedBillCategoryIconName, this.state.selectedBillCategoryIconColor, this.state.selectedBillDueDate, this.state.selectedFundingSourceID, this.state.selectedFundingSourceName, this.state.selectedFundingSourceAmount, this.state.selectedBillIsPaid, this.state.selectedBillIsPlanned, "bill", true);
          })
        .catch(err => console.log(err));
    }

    markAsPaid = () => {
      switch (this.state.selectedBillIsPaid) {
        case true:
          ApiMethods.markExpenseAsPaid(this.state.selectedBillID, false)
            .then(data => {
              this.onRefresh();
              this.fetchData();
              this.hideDrawerAndOverLayLogic("quickActionDrawer");
            })
            .catch(err => console.log(err));
            break;
        case false:
          ApiMethods.markExpenseAsPaid(this.state.selectedBillID, true)
            .then(data => {
              this.onRefresh();
              this.fetchData();
              this.hideDrawerAndOverLayLogic("quickActionDrawer");
            })
            .catch(err => console.log(err));
      }
    }

    deleteExpense = () => {
      ApiMethods.deleteExpense(this.state.selectedBillID)
      .then(res => {
        if (res.data.deletedCount === 0) {
          alert('Sorry, ' + idToDelete + ' could not be deleted');
  
        } else if (this.state.selectedBillIsPlanned) {
          alert('You have successfully deleted ' + this.state.selectedBillName);
  
            ApiMethods
              .updateAfterSpendingAmount(this.state.selectedFundingSourceID)
              .then(data => {
                ApiMethods
                  .updateIncomeOnUserRecord(this.props.currentUserID)
                  .then(data => {
                    this.fetchData();
                    })
                  .catch(err => console.log(err));
                })
              .catch(err => console.log(err))
            
              this.fetchData();
              this.hideDrawerAndOverLayLogic("quickActionDrawer");
              this.props.navigation.navigate('Budget');
        } else {
          alert('You have successfully deleted ' + this.state.selectedBillName);
          
          ApiMethods.updateIncomeOnUserRecord(this.props.currentUserID)
          .then(data => {
            this.fetchData();
          })
          .catch(err => console.log(err));
  
          this.fetchData();
          this.hideDrawerAndOverLayLogic("quickActionDrawer");
          this.props.navigation.navigate('Budget');
        }
      })
      .catch(err => console.log(err));
    }

    goToEditScreen = () => {
      this.props.navigation.navigate('Edit Entry', {
        navigation: this.props.navigation,
        dueDate: this.state.selectedBillDueDate,
        billName: this.state.selectedBillName,
        billAmount: this.state.selectedBillAmount,
        billID: this.state.selectedBillID,
        billIsPlanned: this.state.selectedBillIsPlanned,
        billFundingSourceID: this.state.selectedFundingSourceID,
        billCategoryName: this.state.selectedBillCategoryName,
        billCategoryID: this.state.selectedBillCategoryID, 
        fundingSourceName: this.state.selectedFundingSourceName,
        fundingSourceAmount: this.state.selectedFundingSourceAmount,
        fetchData: this.fetchData,
        incomeDataFromDB: this.props.currentIncomeFromDB,
        whatsBeingEdited: this.state.whatsBeingEdited,
        updateWrapperComponent: this.fetchData,
        loggedInUserID: this.props.currentUserID,
        currentMonthID: this.state.currentMonthID,
        deleteExpense: this.deleteExpense,
        hideDrawerAndOverLayLogic: this.hideDrawerAndOverLayLogic,
        showDrawerAndOverLayLogic: this.showDrawerAndOverLayLogic,
        showDrawer: this.state.showDrawer,
        showOverLay: this.state.showOverLay,
        showOverLayOnEditScreen: false,
        isThisPlanned: this.state.plannedClicked,
        addCategory: this.addCategory })
    }

    addCategory = (expenseID, categoryID, categoryName) => {
            ApiMethods.addCategoryToEntry(expenseID, categoryID, categoryName)
              .then(data => {
                this.onRefresh();
                this.setState({selectedBillCategoryID: categoryID, selectedBillCategoryName: categoryName});
                this.hideDrawerAndOverLayLogic("categorySlideOut");
                this.hideDrawerAndOverLayLogic("quickActionDrawer");
                })
              .catch(err => console.log(err));
    }

    getAllCategories = () => {
      ApiMethods.getAllCategories()
      .then(arrayOfCategories => {
        this.setState({arrayOfCategories: arrayOfCategories.data})
        })
      .catch(err => console.log(err));
    }

  render() {
    return (
        <Container style={style.container}>
          <ImageBackground
            source={backgroundImage}
            style={{width: '100%', height: '100%'}} >
          <AppHeader 
            photoURL={this.state.photoUrl}
            navigation={this.props.navigation}
            signOut={this.props.signOut} />
          <ScrollView
          refreshControl={
            <RefreshControl 
              refreshing={this.state.refreshing} 
              onRefresh={this.onRefresh} />
          }
          >
            <OverLay 
              show={this.state.showOverLay}
              showDrawerAndOverLayLogic={this.showDrawerAndOverLayLogic}
              hideDrawerAndOverLayLogic={this.hideDrawerAndOverLayLogic} />
            <View style={{zIndex: 0, position: 'relative'}}>
            {this.state.showSpinner
              ?
              <ActivityIndicator style={{ opacity: this.state.spinnerOpacity }} animating={this.state.showSpinner} size={this.state.spinnerSize} color="#40DBCE"/>
              :
              <MonthPickerModal 
                monthData={this.props.monthData} 
                currentMonth={this.props.currentMonth}
                currentYear={this.props.currentYear}
                currentMonthID={this.props.currentMonthID}
                selectNewMonth={this.props.selectNewMonth}
                fetchData={this.fetchData} />
            }   
              <SummaryWrapper 
                incomeDataFromDB={!this.state.afterSpendingClicked ? this.props.currentIncomeFromDB : this.state.afterSpendingData}
                switcherLogic={this.switcherLogic}
                handleIncomeAmount={this.handleIncomeAmount}
                handleIncomeDate={this.handleIncomeDate}
                handleIncomeName={this.handleIncomeName}
                handleAddIncomeFormSubmit={this.handleAddIncomeFormSubmit}
                currentTotalIncome={!this.state.afterSpendingClicked ? this.state.currentTotalIncome : this.state.afterSpendingIncomeTotal}
                switcherClicked={this.state.afterSpendingClicked}
                switcherStyle={this.state.switcherClickedStyle}
                incomeDataFromDB={this.props.currentIncomeFromDB}
                loggedInUserID={this.props.currentUserID}
                fetchData={this.fetchData}
                spinnerSize={this.state.spinnerSize}
                spinnerOpacity={this.state.spinnerOpacity}
                showSpinner={this.state.showSpinner}
                monthData={this.props.monthData}
                currentMonth={this.state.currentMonth}
                currentMonthID={this.state.currentMonthID}
                navigation={this.props.navigation} />
              <UnplannedBillWrapper
                expenseDataFromDB={!this.state.plannedClicked ? this.props.currentUnPlannedExpensesFromDB : this.props.currentPlannedExpensesFromDB}
                incomeDataFromDB={this.props.currentIncomeFromDB}
                switcherLogic={this.switcherLogic}
                handleBillAmount={this.handleBillAmount}
                handleDueDate={this.handleDueDate}
                plannedClicked={this.state.plannedClicked}
                updateComponent={this.updateComponent}
                updateExpensesOnUserRecord={this.updateExpensesOnUserRecord}
                handleBillName={this.handleBillName} 
                handleFormSubmit={this.handleFormSubmit}
                loggedInUserID={this.props.currentUserID}
                fetchData={this.fetchData}
                refresh={this.onRefresh}
                spinnerSize={this.state.spinnerSize}
                spinnerOpacity={this.state.spinnerOpacity}
                showSpinner={this.state.showSpinner}
                currentMonth={this.state.currentMonth}
                currentMonthID={this.state.currentMonthID}
                navigation={this.props.navigation}
                showDrawerAndOverLayLogic={this.showDrawerAndOverLayLogic}
                hide={this.hideDrawerAndOverLayLogic}
                componentUpdateSwitch={this.state.componentUpdateSwitch} />
            </View>
          </ScrollView>
          <QuickActionDrawer2 
            navigation={this.props.navigation}
            show={this.state.showDrawer} 
            billName={this.state.selectedBillName} 
            billID={this.state.selectedBillID} 
            billAmount={this.state.selectedBillAmount}
            billCategoryName={this.state.selectedBillCategoryName} 
            billCategoryIconColor={this.state.selectedBillCategoryIconColor}
            billCategoryIconName={this.state.selectedBillCategoryIconName} 
            billIsPaid={this.state.selectedBillIsPaid}
            billIsPlanned={this.state.selectedBillIsPlanned}
            billIsForBillTracker={this.state.selectedBillIsForBillTracker}
            selectedFundingSourceID={this.state.selectedFundingSourceID}
            selectFundingSourceFunction={this.selectFundingSource} 
            incomeDataFromDB={this.props.currentIncomeFromDB} 
            moveToNextMonth={this.moveToNextMonth} 
            splitEntry={this.splitEntry}
            markAsUnplanned={this.markAsUnplanned}
            addToBillTracker={this.addToBillTracker}
            markAsPaid={this.markAsPaid}
            goToEditScreen={this.goToEditScreen}
            fontSize={this.state.fontSize} 
            showCategoriesDrawer={this.showCategoriesDrawer}
            fetchData={this.fetchData}
            />
          <CategorySlideOutOverlay 
            show={this.state.showCategorySlideOutOverlay}
            hideDrawerAndOverLayLogic={this.hideDrawerAndOverLayLogic} />
          <SlideOutDrawer 
            show={this.state.showCategories}
            arrayOfCategories={this.state.arrayOfCategories} 
            addCategory={this.addCategory} 
            billID={this.state.selectedBillID}
            loggedInUserID={this.props.currentUserID}
            currentCategoryID={this.state.selectedBillCategoryID} 
            currentMonthID={this.state.currentMonthID} 
            />
            <AddEntryIcon 
              navigation={this.props.navigation}
              loggedInUsersEmail={this.props.loggedInUsersEmail}
              currentUserID={this.props.currentUserID}
              currentMonth={this.state.currentMonth}
              currentYear={this.props.currentYear}
              currentMonthID={this.props.currentMonthID}
              getUnPlannedExpenseDataFromDB={this.props.getUnPlannedExpenseDataFromDB}
              getIncomeDataFromDB={this.props.getIncomeDataFromDB}
              screen={"budget"}
              />

          </ImageBackground>
        </Container>
    );
  }
}
