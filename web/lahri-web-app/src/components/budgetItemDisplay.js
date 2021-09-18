import React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: '12px',
      textAlign: 'left',
      color: 'black',
      backgroundColor: 'white',
      margin: '5px',
      fontSize: '10px',
    },
  }));

function BudgetItemDisplay () {
    const classes = useStyles();

    return (
        <Paper className={classes.paper}>
            <Grid container spacing={1}>
                <Grid item xs={12} md={2} lg={2}>
                    Jan 15, 2021
                </Grid>
                <Grid item xs={12} md={8} lg={8}>
                    Feyah Payment
                </Grid>
                <Grid item xs={12} md={2} lg={2}>
                    $100.76
                </Grid>
            </Grid>
          </Paper>
    )
}

export default BudgetItemDisplay;