import React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import BudgetItemDisplay from './budgetItemDisplay';
import AddBudgetItemModal from './modals/addbudgetItemModal';
import AddIncomeModal from './modals/addIncomeModal';

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
    <div>
      <Grid container spacing={1}>
        <Grid item xs={12} md={4} lg={4}>
            <AddBudgetItemModal
                modalType={'addIncome'} 
            />
            <Paper className={classes.paper}>{props.month + ' ' + props.year}</Paper>
        </Grid>
            <Grid item xs={12} md={8} lg={8}>
                <AddBudgetItemModal
                    modalType={'addBudgetItem'} 
                />
                <BudgetItemDisplay />
                <BudgetItemDisplay />
            </Grid>
      </Grid>
    </div>
  );
}

export default MainBodyContainer;