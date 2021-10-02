import React from 'react';
import FundingSourcePopper from './modals-menus-pickers-etc/fundingSourcePopper';
import EditItemModal from './modals-menus-pickers-etc/editItemModal';
import makeStyles from '@mui/styles/makeStyles';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import BudgetItemMoreMenu from './modals-menus-pickers-etc/budgetItemMoreMenu'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import UndoIcon from '@mui/icons-material/Undo';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import API from '../utilities/apiMethods';

class IncomeDisplay extends React.Component {
    state = {
       plannedExpensesForThisIncome: [], 
    }

    componentDidMount() {
        this.getAllPlannedExpensesByIncomeID(this.props.loggedInUserID, this.props.selectedMonthID, this.props.id);
    }

    getAllPlannedExpensesByIncomeID = (userID, monthID, incomeID) => {
        API.getAllUnPlannedExpensesByIncomeID(userID, monthID, incomeID)
        .then(expenseDataArray => {
          this.setState({plannedExpensesForThisIncome: expenseDataArray.data})
          console.log(this.state.plannedExpensesForThisIncome);
        }
        ).catch(err => console.log(err));
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
                                    # expenses paid
                                </td>
                                <td class="text-right text-xs">
                                    $$$
                                </td>
                            </tr>
                            <tr>
                                <td class="text-left">
                                </td>
                                <td class="text-right text-xs">
                                    Remaining
                                </td>
                                <td class="text-right text-xs">
                                    $$$
                                </td>
                            </tr>
                        </table>
                        <Divider variant='middle' />
                    </CardContent>
                <container>
                    <Accordion sx={{background: 'grey'}}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <p class="text-sm"> # of Expenses Paid</p>
                        </AccordionSummary>
                        <AccordionDetails>
                            <table class="table-fixed w-full">
                                <tr>
                                    <td class="text-left text-xs">
                                        Expense Name
                                    </td>
                                    <td class="text-right text-xs">
                                        Amount
                                    </td>
                                    <td class="text-right">
                                        <UndoIcon />
                                    </td>
                                </tr>
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
                                    <MenuItem onClick={() => {this.props.deleteIncome(this.props.id)}}>
                                        <DeleteIcon fontSize="small" />
                                    </MenuItem>
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