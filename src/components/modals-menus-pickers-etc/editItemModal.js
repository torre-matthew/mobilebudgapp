import * as React from 'react';
import TextField from '@mui/material/TextField';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import { Container } from '@mui/material';

const editBudgetItemForm = (id, editingExpense, submittingExpenseUpdate, name, amount, date, isPlanned, fundingSource, loggedInUserID, closeModal) => {
  return (
    <Container className="bg-gray-100 w-2/6 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-xl">
            <div className="text-center m-5">
              <p>Edit Budget Item</p>
            </div>
            <form>
              <div className=" m-6">
                <TextField onChange={(event) => {editingExpense(event, "Name", name, amount, date)}} defaultValue={name} fullWidth id="standard-basic" label="Name" variant="standard" />
              </div>
              <div className=" m-6">
                <TextField onChange={(event) => {editingExpense(event, "Date", name, amount, date)}} defaultValue={date} fullWidth id="standard-basic" label="Due Date" variant="standard" />
              </div>
              <div className=" m-6">
                <TextField onChange={(event) => {editingExpense(event, "Amount", name, amount, date)}} defaultValue={amount} fullWidth id="standard-basic" label="Amount" variant="standard" inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} />
              </div>
              <div className="text-center m-3">
                <Button onClick={() => {submittingExpenseUpdate(id, name, amount, date, isPlanned, fundingSource, loggedInUserID); closeModal()}} variant="outlined" size="medium">
                  Submit
                </Button>
              </div>
             </form> 
          </Container>
  );
};

const editIncomeForm = (id, editingIncome, submittingIncomeUpdate, name, amount, date, closeModal) => {
  return (
    <Container className="bg-gray-100 w-2/6 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-xl">
            <div className="text-center m-5">
              <p>Edit Income</p>
            </div>
            <form>
              <div className=" m-6">
                <TextField onChange={(event) => {editingIncome(event, "Name", name, amount, date)}} defaultValue={name} fullWidth id="standard-basic" label="Name" variant="standard" />
              </div>
              <div className=" m-6">
                <TextField onChange={(event) => {editingIncome(event, "Date", name, amount, date)}} defaultValue={date} fullWidth id="standard-basic" label="Date Recieved" variant="standard" />
              </div>
              <div className=" m-6">
                <TextField onChange={(event) => {editingIncome(event, "Amount", name, amount, date)}} defaultValue={amount} fullWidth id="standard-basic" label="Amount" variant="standard" inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} />
              </div>
              <div className="text-center m-3">
                <Button onClick={() => {submittingIncomeUpdate(id, name, date, amount); closeModal()}} variant="outlined" size="medium">
                  Submit
                </Button>
              </div>
             </form> 
          </Container>
  );
};

export default function EditItemModal(props) {
  const[open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Container>
      <div className=" text-left">
        <Button onClick={handleOpen}>
            <EditIcon fontSize="small" />
        </Button>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {
          props.modalType === 'editingIncome' ? <div>{editIncomeForm(props.id, props.editingIncome, props.submittingIncomeUpdate, props.name, props.amount, props.date, handleClose)}</div> : <div>{editBudgetItemForm(props.id, props.editingExpense, props.submittingExpenseUpdate, props.name, props.amount, props.date, props.isPlanned, props.fundingSource, props.loggedInUserID, handleClose)}</div>
        }
      </Modal>
    </Container>
  );
}