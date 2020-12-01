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
    currentIncomeFromDB: [],
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
    componentUpdateSwitch: false
  };

  componentDidMount(){
    this.getLoggedInUserIdByEmail(this.state.loggedInUsersEmail);
  }

  fetchData = async () => {
    await this.getPlannedExpenseDataFromDB();
    await this.getIncomeDataFromDB();
    await this.getUnPlannedExpenseDataFromDB();
    await this.getMonthDataFromDB();
    await this.getTotalIncome();
    await this.setState({componentUpdateSwitch: true});
    await this.setState({spinnerSize: 0, spinnerOpacity: 0, showSpinner: false}); 
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

  getLoggedInUserIdByEmail = (email) => {
    ApiMethods.getUserByEmail(email)
    .then(data => 
          this.setState({
            loggedInUserID: data.data[0]._id 
          }, 
          
          () => {
            this.fetchData();
          })
        )
    .catch(err => console.log(err))
  }

  getIncomeDataFromDB = () => {
    return ApiMethods
            .getIncomeByUserID(this.state.loggedInUserID, this.state.currentMonthID)
            .then(income => {
              
                this.setState({
                  currentIncomeFromDB: income.data
                  },
                    () => {
                      this.getTotalIncome();
                  })
              })
            .catch(err => console.log(err))
  }

  getUnPlannedExpenseDataFromDB = () => {
    return ApiMethods.getAllUnPlannedExpenses(this.state.loggedInUserID, this.state.currentMonthID).then(expenses => {
              this.setState({
                currentUnPlannedExpensesFromDB: expenses.data
              });
            })
            .catch(err => console.log(err));
  }

  determineIfCreateNewMonthScreenShouldBeShown = () => {
    if (this.state.currentPlannedExpensesFromDB.length < 1 && this.state.currentUnPlannedExpensesFromDB.length < 1 && this.currentIncomeFromDB.length < 1) {
        this.props.navigation.navigate('Create New Budget');  
        this.setState({doesCurrentMonthNeedData: true});
    } else {
        this.setState({doesCurrentMonthNeedData: false});
    }
  }

  selectNewMonth = async (month, monthID) => {
// Check to see if there are any unplanned expenses in this month
    await ApiMethods.getAllUnPlannedExpenses(this.state.loggedInUserID, monthID)
            .then(expenses => {
              if (expenses.data.length === 0) {
                this.setState({doesCurrentMonthNeedData: true})
              }
            })
            .catch(err => console.log(err));
// Check to see if there are any planned expenses in this month
    await  ApiMethods.getAllPlannedExpenses(this.state.loggedInUserID, monthID)
            .then(expenses => {
              if (expenses.data.length === 0) {
                this.setState({doesCurrentMonthNeedData: true})
              }
            })
            .catch(err => console.log(err));
// Check to see if there are is any income in this month
    await  ApiMethods.getIncomeByUserID(this.state.loggedInUserID, monthID)
              .then(income => {
                if (income.data.length === 0) { // previousMonthID, userID, targetMonthID
                      this.props.navigation.navigate('Create New Budget', {previousMonthName: this.props.currentMonth, previousMonthID: this.props.currentMonthID, userID: this.state.loggedInUserID, targetMonthID: monthID, targetMonthName: month, fetchData: this.fetchData});
                      this.setState({currentMonth: month, currentMonthID: monthID, doesCurrentMonthNeedData: true},() => {this.fetchData()});                  
                } else {
                      this.setState({currentMonth: month, currentMonthID: monthID, doesCurrentMonthNeedData: false},() => {this.fetchData()});
                }
              })
              .catch(err => console.log(err));
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

  getPlannedExpenseDataFromDB = () => {
    return ApiMethods.getAllPlannedExpenses(this.state.loggedInUserID, this.state.currentMonthID)
    .then(expenses => {
      this.setState({
        currentPlannedExpensesFromDB: expenses.data
      });
    })
    .catch(err => console.log(err));
  }

  updateExpensesOnUserRecord = () => {
    ApiMethods.updateExpensesOnUserRecord(this.state.loggedInUserID).then(data => res.json(data)).catch(err => console.log(err));
  }

  handleIncomeName = text => {
    this.setState({
      income_name: text
    });
  };

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

  getTotalIncome = () => {
    if (!this.state.afterSpendingClicked) {
      let totalIncome = 0;
      this.state.currentIncomeFromDB.forEach(element => {
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
      
      this.state.currentIncomeFromDB.forEach(element => {
        totalIncome += parseFloat(element.amount);
        });
      
      
      this.state.currentPlannedExpensesFromDB.forEach(element => {
      totalSpent += parseFloat(element.amountOfExpense);
      });

      afterSpendingIncomeTotal = totalIncome - totalSpent;

      this.setState({
        afterSpendingIncomeTotal: afterSpendingIncomeTotal.toFixed(2) 
      });
      return afterSpendingIncomeTotal;
    }
  }

  handleFormSubmit = event => {
    // Preventing the default behavior of the form submit (which is to refresh the page)
    event.preventDefault();
    ApiMethods
    .addExpense(this.state.bill_name, this.state.due_date, this.state.amount_due, this.state.loggedInUserID, this.state.currentMonthID)
    .then(data => res.json(data))
    .catch(err => console.log(err))
  };

  handleAddIncomeFormSubmit = event => {
    // Preventing the default behavior of the form submit (which is to refresh the page)
    event.preventDefault();

    ApiMethods.addIncome(this.state.income_name, this.state.income_date, this.state.income_amount, this.state.loggedInUserID, this.state.currentMonthID)
    .then(data => res.json(data))
    .catch(err => console.log(err));

    this.getTotalIncome();
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
          ApiMethods.editExpense(this.state.selectedBillID, this.state.selectedBillName, this.state.selectedBillDueDate, this.state.selectedBillAmount, true, fundingSourceID, this.state.loggedInUserID)
              .then(res => {
                  if (res.data.nModified === 0) {
                      alert('Sorry, there was a problem. Please try again');
                  } else {
                      this.fetchData();
                      this.props.navigation.navigate('Main');
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
            this.fetchData();
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
            ApiMethods.editExpense(this.state.selectedBillID, this.state.selectedBillName, this.state.selectedBillDueDate, this.state.selectedBillAmount, false, "", this.state.loggedInUserID)
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
            this.onRefresh();
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
                  .updateIncomeOnUserRecord(this.state.loggedInUserID)
                  .then(data => {
                    this.fetchData();
                    })
                  .catch(err => console.log(err));
                })
              .catch(err => console.log(err))
            
              this.fetchData();
              this.hideDrawerAndOverLayLogic("quickActionDrawer");
              this.props.navigation.navigate('Main');
        } else {
          alert('You have successfully deleted ' + this.state.selectedBillName);
          
          ApiMethods.updateIncomeOnUserRecord(this.state.loggedInUserID)
          .then(data => {
            this.fetchData();
          })
          .catch(err => console.log(err));
  
          this.fetchData();
          this.hideDrawerAndOverLayLogic("quickActionDrawer");
          this.props.navigation.navigate('Main');
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
        incomeDataFromDB: this.state.currentIncomeFromDB,
        whatsBeingEdited: this.state.whatsBeingEdited,
        updateWrapperComponent: this.fetchData,
        loggedInUserID: this.state.loggedInUserID,
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
          this.hideDrawerAndOverLayLogic("categorySlideOut");
          this.hideDrawerAndOverLayLogic("quickActionDrawer", 
          () => {
            this.showDrawerAndOverLayLogic(this.state.selectedBillID, this.state.selectedBillName, this.state.selectedBillAmount, this.state.selectedBillCategoryName, this.state.selectedBillCategoryID, this.state.selectedBillCategoryIconName, this.state.selectedBillCategoryIconColor, this.state.selectedBillDueDate, this.state.selectedFundingSourceID, this.state.selectedFundingSourceName, this.state.selectedFundingSourceAmount, this.state.selectedBillIsPaid, this.state.selectedBillIsPlanned, "bill", this.state.selectedBillIsForBillTracker);
              }
            );
          })
        .catch(err => console.log(err));
      
      
      
      
      
      // Alert.alert(
      //   'Add Category?',
      //   '',
      //   [ 
      //     {text: 'Nevermind', style: 'cancel'},
      //     {text: 'Ok', onPress: () => {
      //       ApiMethods.addCategoryToEntry(expenseID, categoryID, categoryName)
      //       .then(data => {
      //         this.onRefresh();
      //         // this.showDrawerAndOverLayLogic(this.state.selectedBillID, this.state.selectedBillName, this.state.selectedBillAmount, this.state.selectedBillCategoryName, this.state.selectedBillCategoryID, this.state.selectedBillCategoryIconName, this.state.selectedBillCategoryIconColor, this.state.selectedBillDueDate, this.state.selectedFundingSourceID, this.state.selectedFundingSourceName, this.state.selectedFundingSourceAmount, this.state.selectedBillIsPaid, this.state.selectedBillIsPlanned, "bill", this.state.selectedBillIsForBillTracker);
      //         this.hideDrawerAndOverLayLogic("categorySlideOut");
      //         this.hideDrawerAndOverLayLogic("quickActionDrawer");
      //         })
      //       .catch(err => console.log(err));
      //     }, 
      //   },
      //     ],
      //   {cancelable: false},
      // );
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
                monthData={this.state.monthData} 
                currentMonth={this.state.currentMonth}
                currentYear={this.state.currentYear}
                currentMonthID={this.state.currentMonthID}
                selectNewMonth={this.selectNewMonth}
                fetchData={this.fetchData} />
            }   
              <SummaryWrapper 
                incomeDataFromDB={!this.state.afterSpendingClicked ? this.state.currentIncomeFromDB : this.state.afterSpendingData}
                switcherLogic={this.switcherLogic}
                handleIncomeAmount={this.handleIncomeAmount}
                handleIncomeDate={this.handleIncomeDate}
                handleIncomeName={this.handleIncomeName}
                handleAddIncomeFormSubmit={this.handleAddIncomeFormSubmit}
                currentTotalIncome={!this.state.afterSpendingClicked ? this.state.currentTotalIncome : this.state.afterSpendingIncomeTotal}
                switcherClicked={this.state.afterSpendingClicked}
                switcherStyle={this.state.switcherClickedStyle}
                incomeDataFromDB={this.state.currentIncomeFromDB}
                loggedInUserID={this.state.loggedInUserID}
                fetchData={this.fetchData}
                spinnerSize={this.state.spinnerSize}
                spinnerOpacity={this.state.spinnerOpacity}
                showSpinner={this.state.showSpinner}
                monthData={this.state.monthData}
                currentMonth={this.state.currentMonth}
                currentMonthID={this.state.currentMonthID}
                selectNewMonth={this.selectNewMonth}
                navigation={this.props.navigation} />
              <UnplannedBillWrapper
                expenseDataFromDB={!this.state.plannedClicked ? this.state.currentUnPlannedExpensesFromDB : this.state.currentPlannedExpensesFromDB}
                incomeDataFromDB={this.state.currentIncomeFromDB}
                switcherLogic={this.switcherLogic}
                getUnPlannedExpenseDataFromDB={this.getUnPlannedExpenseDataFromDB}
                handleBillAmount={this.handleBillAmount}
                handleDueDate={this.handleDueDate}
                plannedClicked={this.state.plannedClicked}
                updateComponent={this.updateComponent}
                updateExpensesOnUserRecord={this.updateExpensesOnUserRecord}
                handleBillName={this.handleBillName} 
                handleFormSubmit={this.handleFormSubmit}
                loggedInUserID={this.state.loggedInUserID}
                fetchData={this.fetchData}
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
            incomeDataFromDB={this.state.currentIncomeFromDB} 
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
            loggedInUserID={this.state.loggedInUserID}
            currentCategoryID={this.state.selectedBillCategoryID} 
            currentMonthID={this.state.currentMonthID} 
            />

          </ImageBackground>
        </Container>
    );
  }
}
