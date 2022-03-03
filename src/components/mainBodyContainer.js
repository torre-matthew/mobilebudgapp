import React from 'react';
// import makeStyles from '@mui/styles/makeStyles';
import Grid from '@mui/material/Grid';
import BudgetItemDisplay from './budgetItemDisplay';
import AddBudgetItemModal from './modals-menus-pickers-etc/addbudgetItemModal';
import AddBudgetItemInLine from './addBudgetItemInLine';
import IncomeDisplay from './incomeDisplay';


// const useStyles = makeStyles((theme) => ({
//   root: {
//     flexGrow: 1,
//   },
//   paper: {
//     padding: '10px',
//     textAlign: 'left',
//     color: 'black',
//     backgroundColor: 'white',
//     margin: '5px',
//     fontSize: '10px',
//   },
// }));

function MainBodyContainer(props) {
//   const class = useStyles();

  return (
      <div className="h-full">
        <Grid container spacing={1}>
            <Grid item xs={12} md={6} lg={4}>
                <Grid item xs={12}>
                    <AddBudgetItemInLine 
                    addingExpense={props.addingExpense}
                    submittingUnPlannedExpense={props.submittingUnPlannedExpense} />
                </Grid>    
                {props.unplannedExpenses.map(expenseDataArray =>{
                    return (
                        <Grid key={expenseDataArray._id} item xs={12}>
                            <BudgetItemDisplay 
                                key={expenseDataArray._id}
                                id={expenseDataArray._id}
                                name={expenseDataArray.nameOfExpense}
                                date={expenseDataArray.dateOfExpense}
                                amount={expenseDataArray.amountOfExpense}
                                isPlanned={expenseDataArray.isPlanned}
                                fundingSource={expenseDataArray.fundingSource}
                                loggedInUserID={props.loggedInUserID}
                                deleteExpense={props.deleteExpense} 
                                incomeData={props.incomeData}
                                addingFundingSourceToExpense={props.addingFundingSourceToExpense}
                                editingExpense={props.editingExpense}
                                submittingExpenseUpdate={props.submittingExpenseUpdate} />
                        </Grid>                                
                            )
                        }
                    )
                }
        </Grid>
        <Grid item xs={12} md={6} lg={8}>
            <AddBudgetItemModal
                modalType={'addIncome'}
                addingIncome={props.addingIncome} 
                submittingIncome={props.submittingIncome} />
                   <Grid container spacing={1}>
                     
                        {props.incomeData.map(incomeDataArray => {
                            
                            return (
                                <Grid key={incomeDataArray._id} item xs={12} md={12} lg={6}>
                                    <IncomeDisplay 
                                        addingExpense={props.addingExpense}
                                        allPlannedExpenses={props.allPlannedExpenses}
                                        amount={incomeDataArray.amount}
                                        calculateTotalOfExpensesAndAfterSpendingAmountPerIncome={props.calculateTotalOfExpensesAndAfterSpendingAmountPerIncome}
                                        date={incomeDataArray.date}
                                        deleteIncome={props.deleteIncome}
                                        editingIncome={props.editingIncome}
                                        getAllUnplannedExpenses={props.getAllUnplannedExpenses}
                                        getAllPlannedExpensesByIncomeID={props.getAllPlannedExpensesByIncomeID}
                                        id={incomeDataArray._id}
                                        key={incomeDataArray._id}
                                        loggedInUserID={incomeDataArray.userID}
                                        monthID={incomeDataArray.monthID}
                                        name={incomeDataArray.name}
                                        submittingIncomeUpdate={props.submittingIncomeUpdate}
                                        submittingExpense={props.submittingExpense}
                                        unplanExpense={props.unplanExpense}
                                        />
                                </Grid>
                                    )
                                })  
                        }
                    
                </Grid>
            </Grid>
        </Grid>
      </div>
  );
}

export default MainBodyContainer;