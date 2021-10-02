import { Container } from "@mui/material";
import React from "react";
import DatePicker from '../components/datePicker';
import MainBodyContainer from "../components/mainBodyContainer";
import SummaryContentContainer from "../components/summaryContentContainer";
import API from '../utilities/apiMethods';



// pk 5e952c83a5ad7500176ad379
// Sept 21 "5ebf4efefb3cdb0017c1efb7"
class Home extends React.Component {
    state = {
        currentUserID: '5e952c83a5ad7500176ad379',
        selectedMonthID: '',
        monthData: [],
        unplannedExpenses: [],
        incomeData:[],
        nameOfExpenseBeingAdded: '',
        dateOfExpenseBeingAdded: '',
        amountOfExpenseBeingAdded: '',
        nameOfIncome: '',
        newNameOfIncome:'',
        dateOfIncome: '',
        newDateOfIncome:'',
        amountOfIncome: '',
        newAameOfIncome:'',
      };
    
      componentDidMount(){
        this.getMonthData();
        this.getAllUnplannedExpenses(this.state.currentUserID, this.state.selectedMonthID);
        this.getIncome(this.state.currentUserID, this.state.selectedMonthID);
      }

      selectMonth = (monthID) => {
        this.setState({selectedMonthID: monthID});
        this.getIncome(this.state.currentUserID, monthID);
        this.getAllUnplannedExpenses(this.state.currentUserID, monthID);
      }

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
            this.setState({incomeData: incomeDataArray.data})
          }
        )
        .catch(err => console.log(err))
      }

      getAllUnplannedExpenses = (userID, monthID) => {
        API.getAllUnPlannedExpenses(userID, monthID)
        .then(expenseDataArray => {
          this.setState({unplannedExpenses: expenseDataArray.data})
        }
        ).catch(err => console.log(err));
      }

      submittingExpense = () => {
        API.addExpense(this.state.nameOfExpenseBeingAdded, this.state.dateOfExpenseBeingAdded, this.state.amountOfExpenseBeingAdded, this.state.currentUserID, this.state.selectedMonthID, false)
        .then(response => {this.getAllUnplannedExpenses(this.state.currentUserID, this.state.selectedMonthID);})
        .catch(err => console.log(err));
      }

      submittingIncome = () => {
        API.addIncome(this.state.nameOfIncome, this.state.dateOfIncome, this.state.amountOfIncome, this.state.currentUserID, this.state.selectedMonthID)
        .then(response => {this.getIncome(this.state.currentUserID, this.state.selectedMonthID);})
        .catch(err => console.log(err));
      }

      submittingIncomeUpdate = (id) => {
        API.editIncome(id, this.state.newNameOfIncome, this.state.newDateOfIncome, this.state.newAmountOfIncome)
        .then(response => {this.getIncome(this.state.currentUserID, this.state.selectedMonthID)})
        .catch(err => console.log(err));

      }

      addingFundingSourceToExpense = (id, name, date, amount, isPlanned, fundingSource, loggedInUserID) => {
        API.editExpense(id, name, date, amount, isPlanned, fundingSource, loggedInUserID)
        .then(response => {this.getAllUnplannedExpenses(this.state.currentUserID, this.state.selectedMonthID)})
        .catch(err => console.log(err));

      }

      deleteExpense = (id) => {
        API.deleteExpense(id)
        .then(response => {this.getAllUnplannedExpenses()})
        .catch(err => console.log(err));
      }

      deleteIncome = (id) => {
        API.deleteIncome(id)
        .then(response => {this.getIncome()})
        .catch(err => console.log(err));
      }

    render() {
      return (
        <Container maxWidth="xl" >
            <DatePicker 
              monthData={this.state.monthData} 
              selectMonth={this.selectMonth} />
            <SummaryContentContainer />  
            <MainBodyContainer
              addingExpense={this.addingExpense}
              loggedInUserID={this.state.loggedInUserID}
              monthID={this.state.selectedMonthID}
              addingIncome={this.addingIncome}
              addingFundingSourceToExpense={this.addingFundingSourceToExpense}
              editingIncome={this.editingIncome}
              submittingExpense={this.submittingExpense}
              submittingIncome={this.submittingIncome}
              deleteExpense={this.deleteExpense} 
              deleteIncome={this.deleteIncome}
              submittingIncomeUpdate={this.submittingIncomeUpdate}
              unplannedExpenses={this.state.unplannedExpenses}
              incomeData={this.state.incomeData} />
        </Container>
        );
    }
  }

export default Home;