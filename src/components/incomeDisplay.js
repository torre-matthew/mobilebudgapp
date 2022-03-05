import React from 'react';
import EditItemModal from './modals-menus-pickers-etc/editItemModal';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import UndoIcon from '@mui/icons-material/Undo';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';

class IncomeDisplay extends React.Component {
    state = {
    }

    render() {
        return (
            <div>
                <Card className="bg-blue-400 rounded-2xl m-1">
                    <CardContent>
                        <table className="table-fixed w-full">
                            <tbody>
                            <tr>
                                <td className="text-left text-xl">
                                    {this.props.name}
                                </td>
                                <td className="text-left text-xl">
                                </td>
                                <td className="text-right text-xl">
                                    ${this.props.amount}
                                </td>
                            </tr>
                            <tr>
                                <td className="text-left">
                                </td>
                                <td className="text-right text-xs">
                                    {this.props.getAllPlannedExpensesByIncomeID(this.props.id).length} expenses paid
                                </td>
                                <td className="text-right text-xs">
                                    ${this.props.calculateTotalOfExpensesAndAfterSpendingAmountPerIncome(this.props.id).total}
                                </td>
                            </tr>
                            <tr>
                                <td className="text-left">
                                </td>
                                <td className="text-right text-xs">
                                    Remaining
                                </td>
                                <td className="text-right text-xs">
                                    ${this.props.calculateTotalOfExpensesAndAfterSpendingAmountPerIncome(this.props.id).afterSpendingAmount}
                                </td>
                            </tr>
                            </tbody>
                        </table>
                        <Divider variant='middle' />
                    </CardContent>
                <div>
                    <Accordion sx={{background: 'white'}}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <p className="text-sm"> {this.props.getAllPlannedExpensesByIncomeID(this.props.id).length} expenses paid with this income</p>
                        </AccordionSummary>
                        <AccordionDetails>
                            {/* <form id="expenseForm">
                                <TextField required  onChange={(event) => {this.props.addingExpense(event, "Date")}} id="outlined-basic" label="Date" variant="outlined" />
                                <TextField required  onChange={(event) => {this.props.addingExpense(event, "Name")}} id="outlined-basic" label="Name" variant="outlined" />
                                <TextField required  onChange={(event) => {this.props.addingExpense(event, "Amount")}} id="outlined-basic" label="Amount Due" variant="outlined" />
                                <Button onClick={() => {this.props.submittingExpense(this.props.id); document.getElementById("expenseForm").reset()}} variant="text">Add Item</Button>
                            </form> */}
                            <table className="table-fixed w-full">
                                {this.props.getAllPlannedExpensesByIncomeID(this.props.id).map(expenseDataArray => {
                                    return (
                                        <tbody key={expenseDataArray._id}>
                                            <tr>
                                                <td className="text-left text-xs">
                                                    {expenseDataArray.nameOfExpense}
                                                </td>
                                                <td className="text-right text-xs">
                                                    {expenseDataArray.amountOfExpense}
                                                </td>
                                                <td className="text-right">
                                                    <Button onClick={() => {this.props.unplanExpense(expenseDataArray._id, expenseDataArray.nameOfExpense, expenseDataArray.dateOfExpense, expenseDataArray.amountOfExpense, false, "", this.props.loggedInUserID)}}>
                                                        <UndoIcon />
                                                    </Button>
                                                </td>
                                            </tr>
                                        </tbody>
                                        )
                                    })
                                }
                            </table>
                        </AccordionDetails>
                    </Accordion>
                    <div className="flex justify-center">
                        <table className="table-fixed w-1/4">
                        <tbody>
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
                            </tbody>
                        </table>
                    </div>
                </div>
            </Card>
        </div>
            
        )
    }
}

export default IncomeDisplay;