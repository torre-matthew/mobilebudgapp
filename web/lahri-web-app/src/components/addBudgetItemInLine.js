import * as React from 'react';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Container } from '@mui/material';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';


export default function addBudgetItemInLine(props) {
  return (
    <Container>
      <form id="expenseForm">
        <Grid container spacing={1/2}>
          <Grid item xs={3}>
            <TextField required  onChange={(event) => {props.addingExpense(event, "Date")}} id="outlined-basic" label="Date" variant="outlined" />
          </Grid>
           <Grid item xs={5}>
            <TextField required  onChange={(event) => {props.addingExpense(event, "Name")}} id="outlined-basic" label="Name" var ant="outlined" />
          </Grid>
           <Grid item xs={3}>
            <TextField required  onChange={(event) => {props.addingExpense(event, "Amount")}} id="outlined-basic" label="Amount Due" variant="outlined" />
          </Grid>
          <Grid item xs={1}>
            <Button onClick={() => {props.submittingUnPlannedExpense(); document.getElementById("expenseForm").reset()}} variant="contained" size="small">Add Item</Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}