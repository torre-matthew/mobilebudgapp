import React from 'react';
import EditItemModal from './modals-menus-pickers-etc/editItemModal';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import TextField from '@mui/material/TextField';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import UndoIcon from '@mui/icons-material/Undo';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import API from '../utilities/apiMethods';

class IncomeDisplay extends React.Component {
    state = {
       plannedExpensesForThisIncome: [], 
       afterSpendingAmount: "",
       totalOfExpenses: ""
    }

    componentDidMount() {
        this.getAllPlannedExpensesByIncomeID(this.props.loggedInUserID, this.props.monthID, this.props.id);
    }

    getAllPlannedExpensesByIncomeID = (userID, monthID, incomeID) => {
        API.getAllPlannedExpensesByIncomeID(userID, monthID, incomeID)
        .then(expenseDataArray => {
          this.setState({plannedExpensesForThisIncome: expenseDataArray.data})
          this.calculateTotalOfExpenses();
            })
        .catch(err => console.log(err));
    }

    unplanExpense = (id, name, date, amount, isPlanned, fundingSource, loggedInUserID) => {
        API.editExpense(id, name, date, amount, isPlanned, fundingSource, loggedInUserID)
        .then(response => {
            this.getAllPlannedExpensesByIncomeID(this.props.loggedInUserID, this.props.monthID, this.props.id);
            this.props.getAllUnplannedExpenses(loggedInUserID, this.props.monthID);
        })
        .catch(err => console.log(err));
      }

      calculateTotalOfExpenses = () => {
          let total = 0;
          let afterSpendingAmount = 0;

          this.state.plannedExpensesForThisIncome.forEach(arrayOfExpenses => {
              total += parseFloat(arrayOfExpenses.amountOfExpense)
              afterSpendingAmount = this.props.amount - total
              this.setState({totalOfExpenses: total, afterSpendingAmount: afterSpendingAmount});
          })
      }

    render() {
        return (
            <div>
                <Card class="bg-blue-400 rounded-2xl m-1">
                    <CardContent>
                        <table class="table-fixed w-full">
                            <tr>
                                <td class="text-left text-xl">
                                    {this.props.name}
                                </td>
                                <td class="text-left text-xl">
                                </td>
                                <td class="text-right text-xl">
                                    ${this.props.amount}
                                </td>
                            </tr>
                            <tr>
                                <td class="text-left">
                                </td>
                                <td class="text-right text-xs">
                                    {this.state.plannedExpensesForThisIncome.length} expenses paid
                                </td>
                                <td class="text-right text-xs">
                                    ${this.state.totalOfExpenses}
                                </td>
                            </tr>
                            <tr>
                                <td class="text-left">
                                </td>
                                <td class="text-right text-xs">
                                    Remaining
                                </td>
                                <td class="text-right text-xs">
                                    ${this.state.afterSpendingAmount}
                                </td>
                            </tr>
                        </table>
                        <Divider variant='middle' />
                    </CardContent>
                <container>
                    <Accordion expanded sx={{background: 'white'}}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <p class="text-sm"> {this.state.plannedExpensesForThisIncome.length} expenses paid with this income</p>
                        </AccordionSummary>
                        <AccordionDetails>
                            <form id="expenseForm">
                                <TextField required  onChange={(event) => {this.props.addingExpense(event, "Date")}} id="outlined-basic" label="Date" variant="outlined" />
                                <TextField required  onChange={(event) => {this.props.addingExpense(event, "Name")}} id="outlined-basic" label="Name" variant="outlined" />
                                <TextField required  onChange={(event) => {this.props.addingExpense(event, "Amount")}} id="outlined-basic" label="Amount Due" variant="outlined" />
                                <Button onClick={() => {this.props.submittingExpense(this.props.id); document.getElementById("expenseForm").reset()}} variant="text">Add Item</Button>
                            </form>
                            <table class="table-fixed w-full">
                                {this.state.plannedExpensesForThisIncome.map(expenseDataArray => {
                                    return (
                                        <tr key={expenseDataArray._id}>
                                            <td class="text-left text-xs">
                                                {expenseDataArray.nameOfExpense}
                                            </td>
                                            <td class="text-right text-xs">
                                                {expenseDataArray.amountOfExpense}
                                            </td>
                                            <td class="text-right">
                                                <Button onClick={() => {this.unplanExpense(expenseDataArray._id, expenseDataArray.nameOfExpense, expenseDataArray.dateOfExpense, expenseDataArray.amountOfExpense, false, "", this.props.loggedInUserID)}}>
                                                    <UndoIcon />
                                                </Button>
                                            </td>
                                        </tr>
                                        )
                                    })
                                }
                            </table>
                        </AccordionDetails>
                    </Accordion>
                    <div class="flex justify-center">
                        <table class="table-fixed w-1/4">
                            <tr>
                                <td> 
                                    <EditItemModal
                                        modalType={'editingIncome'}
                                        addingIncome={this.props.addingIncome} 
                                        editingIncome={this.props.editingIncome}
                                        submittingIncomeUpdate={this.props.submittingIncomeUpdate}
                                        id={this.props.id}
                                        name={this.props.name}
                                        amount={this.props.amount}
                                        date={this.props.date}
                                        />
                                </td>
                                <td>
                                    <Button onClick={() => {this.props.deleteIncome(this.props.id)}}>
                                        <DeleteIcon fontSize="small" />
                                    </Button>
                                </td>
                            </tr>
                        </table>
                    </div>
                </container>
            </Card>
        </div>
            
        )
    }
}

export default IncomeDisplay;