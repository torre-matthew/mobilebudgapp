import React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import Grid from '@mui/material/Grid';
import BudgetItemDisplay from './budgetItemDisplay';
import AddBudgetItemModal from './modals-menus-pickers-etc/addbudgetItemModal';
import IncomeDisplay from './incomeDisplay';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: '10px',
    textAlign: 'left',
    color: 'black',
    backgroundColor: 'white',
    margin: '5px',
    fontSize: '10px',
  },
}));

function MainBodyContainer(props) {
  const classes = useStyles();

  return (
      <div class="h-full">
        <Grid container spacing={1}>
            <Grid item md={6} lg={7}>
                <AddBudgetItemModal
                    modalType={'addBudgetItem'}
                    addingExpense={props.addingExpense} 
                    submittingExpense={props.submittingExpense}/>
                {props.unplannedExpenses.map(expenseDataArray =>{
                    return (
                        <BudgetItemDisplay 
                            key={expenseDataArray._id}
                            id={expenseDataArray._id}
                            name={expenseDataArray.nameOfExpense}
                            date={expenseDataArray.dateOfExpense}
                            amount={expenseDataArray.amountOfExpense}
                            loggedInUserID={props.loggedInUserID}
                            deleteExpense={props.deleteExpense} 
                            incomeData={props.incomeData}
                            addingFundingSourceToExpense={props.addingFundingSourceToExpense} />
                                )
                            }
                        )
                    }
            </Grid>
            <Grid item md={6} lg={5}>
            <AddBudgetItemModal
                modalType={'addIncome'}
                addingIncome={props.addingIncome} 
                submittingIncome={props.submittingIncome} />
                    {props.incomeData.map(incomeDataArray => {
                        return (
                            <IncomeDisplay 
                                id={incomeDataArray._id}
                                name={incomeDataArray.name}
                                date={incomeDataArray.date}
                                amount={incomeDataArray.amount}
                                deleteIncome={props.deleteIncome}
                                loggedInUserID={props.loggedInUserID}
                                monthID={props.selectedMonthID}
                                />
                            )
                        })
                    }
            </Grid>
        </Grid>
      </div>
  );
}

export default MainBodyContainer;