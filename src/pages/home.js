import { Container } from "@mui/material";
import React from "react";
import MainBodyContainer from "../components/mainBodyContainer";
import DatePickerModal from "../components/modals-menus-pickers-etc/datePickerModal";
import SummaryContentContainer from "../components/summaryContentContainer";
import API from '../utilities/apiMethods';



// pk 5e952c83a5ad7500176ad379
// Sept 21 "5ebf4efefb3cdb0017c1efb7"
class Home extends React.Component {
    state = {
        currentUserID: '',
        selectedMonthID: '',
        monthData: [],
        unplannedExpenses: [],
        plannedExpenses: [],
        incomeData:[],
        totalIncome: 0,
        totalExpenses: 0,
        afterSpendingAmount: 0,
        nameOfExpenseBeingAdded: '',
        newNameOfExpense: '',
        dateOfExpenseBeingAdded: '',
        newDateOfExpense: '',
        amountOfExpenseBeingAdded: '',
        newAmountOfExpense: '',
        nameOfIncome: '',
        newNameOfIncome:'',
        dateOfIncome: '',
        newDateOfIncome:'',
        amountOfIncome: '',
        newAmountOfIncome:'',
        plannedExpensesForThisIncome: [],
      };
    
      addingExpense = (event, labelName) => {
        switch (labelName) {
          case "Name":
            this.setState({nameOfExpenseBeingAdded: event.target.value});
            break;
          case "Amount":
            this.setState({amountOfExpenseBeingAdded: event.target.value});
            break;
          case "Date":
            this.setState({dateOfExpenseBeingAdded: event.target.value});
            break;
          default:
            break;
        }
      }
      
      addingIncome = (event, labelName) => {
        switch (labelName) {
          case "Name":
              this.setState({nameOfIncome: event.target.value});
            break;
          case "Amount":
              this.setState({amountOfIncome: event.target.value});
            break;
          case "Date":
              this.setState({dateOfIncome: event.target.value});
            break;
          default:
            break;
        }
      }

      addingFundingSourceToExpense = (id, name, date, amount, isPlanned, fundingSource, loggedInUserID) => {
        API.editExpense(id, name, date, amount, isPlanned, fundingSource, loggedInUserID)
        .then(response => {
          this.getAllUnplannedExpenses(this.state.currentUserID, this.state.selectedMonthID);
          this.getAllPlannedExpenses(this.state.currentUserID, this.state.selectedMonthID);
          this.getIncome(this.state.currentUserID, this.state.selectedMonthID);
        })
        .catch(err => console.log(err));

      }

      calculateTotalIncome = () => {
        let totalIncome = 0;
        
        this.state.incomeData.forEach(arrayOfIncome => {
          totalIncome += parseFloat(arrayOfIncome.amount);
        })
        
        this.setState({totalIncome: totalIncome}, () => {this.calculateAfterSpendingAmount()});
      }

      calculateExpenseTotal = () => {
        let plannedExpensesTotal = 0;
        let unPlannedExpensesTotal = 0;
        let expensesTotal = 0;

        this.state.unplannedExpenses.forEach(arrayOfExpenses => {
          unPlannedExpensesTotal += parseFloat(arrayOfExpenses.amountOfExpense);
        })

        this.state.plannedExpenses.forEach(arrayOfExpenses => {
          plannedExpensesTotal += parseFloat(arrayOfExpenses.amountOfExpense);
        })
        
        expensesTotal = plannedExpensesTotal + unPlannedExpensesTotal;
        this.setState({totalExpenses: expensesTotal}, () => {this.calculateAfterSpendingAmount()});

      }

      calculateAfterSpendingAmount = () => {
        let afterSpendingAmount = 0;
        let plannedExpensesTotal = 0;
        
        if (this.state.plannedExpenses.length === 0) {
          afterSpendingAmount = 0;
          this.setState({afterSpendingAmount: afterSpendingAmount});
        } else {
          this.state.plannedExpenses.forEach(arrayOfExpenses => {
            plannedExpensesTotal += parseFloat(arrayOfExpenses.amountOfExpense);
            })
            
            afterSpendingAmount = this.state.totalIncome - plannedExpensesTotal;
            this.setState({afterSpendingAmount: afterSpendingAmount});
      }
    }

    calculateTotalOfExpensesAndAfterSpendingAmountPerIncome = (incomeID) => {
      let expenseTotal = 0;
      let afterSpendingAmount = 0; 
      let thisIncomeTotal = this.state.incomeData.filter(income => income._id === incomeID);

      this.getAllPlannedExpensesByIncomeID(incomeID).forEach(arrayOfExpenses => {
          expenseTotal += parseFloat(arrayOfExpenses.amountOfExpense);
          afterSpendingAmount = parseFloat(thisIncomeTotal[0].amount) - expenseTotal;
      })

      return {
              total: expenseTotal,
              afterSpendingAmount: afterSpendingAmount
            }
  }
      
      checkThatUserIDExistsInSessionStorage = () => {
        let uid = sessionStorage.getItem("uid");
        (uid == null) ? alert("You need to sign in") : this.setState({currentUserID: uid})
      }
      
      componentDidMount(){
        this.checkThatUserIDExistsInSessionStorage();
        this.getMonthData();
        this.calculateExpenseTotal();
      }

      deleteExpense = (id) => {
        API.deleteExpense(id)
        .then(response => {this.getAllUnplannedExpenses(this.state.currentUserID, this.state.selectedMonthID)})
        .catch(err => console.log(err));
      }

      deleteIncome = (id) => {
        API.deleteIncome(id)
        .then(response => {this.getIncome(this.state.currentUserID, this.state.selectedMonthID)})
        .catch(err => console.log(err));
      }

      editingIncome = (event, labelName, currentName, currentAmount, currentDate) => {
        switch (labelName) {
          case "Name":
              (event.target.value === "") ? this.setState({newNameOfIncome: currentName}) : this.setState({newNameOfIncome: event.target.value}); 
              break;
          case "Amount":
              (event.target.value === "") ? this.setState({newAmountOfIncome: currentAmount}) : this.setState({newAmountOfIncome: event.target.value});
            break;
          case "Date":
            (event.target.value === "") ? this.setState({newDateOfIncome: currentDate}) : this.setState({newDateOfIncome: event.target.value});
            break;
          default:
            break;
        }
      }

      editingExpense = (event, labelName, currentName, currentAmount, currentDate) => {
        switch (labelName) {
          case "Name":
              (event.target.value === "") ? this.setState({newNameOfExpense: currentName}) : this.setState({newNameOfExpense: event.target.value}); 
              break;
          case "Amount":
              (event.target.value === "") ? this.setState({newAmountOfExpense: currentAmount}) : this.setState({newAmountOfExpense: event.target.value});
            break;
          case "Date":
            (event.target.value === "") ? this.setState({newDateOfExpense: currentDate}) : this.setState({newDateOfExpense: event.target.value});
            break;
          default:
            break;
        }
      }
    
      getMonthData = () => {
        API.getMonthData()
          .then(arrayOfMonths => {
              this.setState({monthData: arrayOfMonths.data})
            }
          )
          .catch(err => console.log(err));
      }

      getIncome = (userID, monthID) => {
        API.getIncomeByUserID(userID, monthID)
        .then(incomeDataArray => {
            
            this.setState({incomeData: incomeDataArray.data}, () => {this.calculateTotalIncome()})
          }
        )
        .catch(err => console.log(err))
      }

      getAllUnplannedExpenses = (userID, monthID) => {
        API.getAllUnPlannedExpenses(userID, monthID)
        .then(expenseDataArray => {
          this.setState({unplannedExpenses: expenseDataArray.data});
          this.calculateExpenseTotal()
        }
        ).catch(err => console.log(err));
      }

      getAllPlannedExpenses = (userID, monthID) => {
        API.getAllPlannedExpenses(userID, monthID)
        .then(expenseDataArray => {
          this.setState({plannedExpenses: expenseDataArray.data})
          this.calculateExpenseTotal()
        })
        .catch(err => console.log(err));
      }

      getAllPlannedExpensesByIncomeID = (incomeID) => {
        
        let thisIncomeExpenses = this.state.plannedExpenses.filter(
            expenses => expenses.fundingSource === incomeID
            )

            return thisIncomeExpenses;

        // this.setState({plannedExpensesForThisIncome: thisIncomeExpenses})
        // this.calculateTotalOfExpenses();
        
        // API.getAllPlannedExpensesByIncomeID(userID, monthID, incomeID)
        // .then(expenseDataArray => {
        //   this.setState({plannedExpensesForThisIncome: expenseDataArray.data})
        //     })
        // .catch(err => console.log(err));
    }

      submittingExpense = (fundingSource) => {
        API.addExpense(this.state.nameOfExpenseBeingAdded, this.state.dateOfExpenseBeingAdded, this.state.amountOfExpenseBeingAdded, this.state.currentUserID, this.state.selectedMonthID, false, fundingSource, true)
        .then(response => {this.getAllUnplannedExpenses(this.state.currentUserID, this.state.selectedMonthID);})
        .catch(err => console.log(err));
      }

      submittingUnPlannedExpense = () => {
        API.addExpense(this.state.nameOfExpenseBeingAdded, this.state.dateOfExpenseBeingAdded, this.state.amountOfExpenseBeingAdded, this.state.currentUserID, this.state.selectedMonthID, false, "", false)
        .then(response => {this.getAllUnplannedExpenses(this.state.currentUserID, this.state.selectedMonthID);})
        .catch(err => console.log(err));
      }

      submittingIncome = () => {
        API.addIncome(this.state.nameOfIncome, this.state.dateOfIncome, this.state.amountOfIncome, this.state.currentUserID, this.state.selectedMonthID)
        .then(response => {this.getIncome(this.state.currentUserID, this.state.selectedMonthID);})
        .catch(err => console.log(err));
      }

      submittingIncomeUpdate = (id, currentName, currentDate, currentAmount) => {
        let name = "";
        let date = "";
        let amount = "";

        (this.state.newAmountOfIncome === "") ? amount = currentAmount : amount = this.state.newAmountOfIncome;
        (this.state.newNameOfIncome === "") ? name = currentName : name = this.state.newNameOfIncome;
        (this.state.newDateOfIncome === "") ? date = currentDate : date = this.state.newDateOfIncome;

        API.editIncome(id, name, date, amount)
        .then(response => {this.getIncome(this.state.currentUserID, this.state.selectedMonthID)})
        .catch(err => console.log(err));

      }

      submittingExpenseUpdate = (id, currentName, currentAmount, currentDate, isPlanned, fundingSource, loggedInUserID) => {
        let name = "";
        let date = "";
        let amount = "";

        (this.state.newAmountOfExpense === "") ? amount = currentAmount : amount = this.state.newAmountOfExpense;
        (this.state.newNameOfExpense === "") ? name = currentName : name = this.state.newNameOfExpense;
        (this.state.newDateOfExpense === "") ? date = currentDate : date = this.state.newDateOfExpense;

        API.editExpense(id, name, date, amount, isPlanned, fundingSource, loggedInUserID)
        .then(response => {
          this.getAllUnplannedExpenses(this.state.currentUserID, this.state.selectedMonthID);
          this.calculateExpenseTotal();
        })
        .catch(err => console.log(err));

      }

      selectMonth = (monthID) => {
        this.setState({selectedMonthID: monthID});
        this.getIncome(this.state.currentUserID, monthID);
        this.getAllUnplannedExpenses(this.state.currentUserID, monthID);
        this.getAllPlannedExpenses(this.state.currentUserID, monthID);
      }

      unplanExpense = (id, name, date, amount, isPlanned, fundingSource, loggedInUserID) => {
        API.editExpense(id, name, date, amount, isPlanned, fundingSource, loggedInUserID)
        .then(response => {
          this.getAllUnplannedExpenses(this.state.currentUserID, this.state.selectedMonthID);
          this.getAllPlannedExpenses(this.state.currentUserID, this.state.selectedMonthID);
        })
        .catch(err => console.log(err));
      }

      
    render() {
      return (
        <Container maxWidth="xl" >
            {/* <DatePicker 
              monthData={this.state.monthData} 
              selectMonth={this.selectMonth} /> */}
            <DatePickerModal 
              monthData={this.state.monthData} 
              selectMonth={this.selectMonth} />
            <SummaryContentContainer 
              totalIncome={this.state.totalIncome} 
              totalExpenses={this.state.totalExpenses} 
              afterSpendingAmount={this.state.afterSpendingAmount} />  
            <MainBodyContainer
              addingExpense={this.addingExpense}
              addingFundingSourceToExpense={this.addingFundingSourceToExpense}
              addingIncome={this.addingIncome}
              allPlannedExpenses={this.state.plannedExpenses}
              calculateTotalOfExpensesAndAfterSpendingAmountPerIncome={this.calculateTotalOfExpensesAndAfterSpendingAmountPerIncome}
              deleteExpense={this.deleteExpense} 
              deleteIncome={this.deleteIncome}
              editingIncome={this.editingIncome}
              editingExpense={this.editingExpense}
              getAllPlannedExpensesByIncomeID={this.getAllPlannedExpensesByIncomeID}
              getAllUnplannedExpenses={this.getAllUnplannedExpenses}
              incomeData={this.state.incomeData}
              submittingExpense={this.submittingExpense}
              submittingUnPlannedExpense={this.submittingUnPlannedExpense}
              submittingIncome={this.submittingIncome}
              submittingIncomeUpdate={this.submittingIncomeUpdate}
              submittingExpenseUpdate={this.submittingExpenseUpdate}
              unplannedExpenses={this.state.unplannedExpenses}
              unplanExpense={this.unplanExpense} 
              />
        </Container>
        );
    }
  }

export default Home;