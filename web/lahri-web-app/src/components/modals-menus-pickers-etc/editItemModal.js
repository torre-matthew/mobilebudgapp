import * as React from 'react';
import TextField from '@mui/material/TextField';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import { Container } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 12,
  p: 4,
};

const editBudgetItemForm = (editExpense, submittingExpense, closeModal) => {
  return (
    <Container class="bg-gray-100 w-2/6 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-xl">
            <div class="text-center m-5">
              <p>Edit Budget Item</p>
            </div>
            <form>
              <div class=" m-6">
                <TextField onChange={(event) => {editExpense(event, "Name")}} fullWidth id="standard-basic" label="Name" variant="standard" />
              </div>
              <div class=" m-6">
                <TextField onChange={(event) => {editExpense(event, "Date")}} fullWidth id="standard-basic" label="Due Date" variant="standard" />
              </div>
              <div class=" m-6">
                <TextField onChange={(event) => {editExpense(event, "Amount")}} fullWidth id="standard-basic" label="Amount" variant="standard" inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} />
              </div>
              <div class="text-center m-3">
                <Button onClick={() => {submittingExpense(); closeModal()}} variant="outlined" size="medium">
                  Submit
                </Button>
              </div>
             </form> 
          </Container>
  );
};

const editIncomeForm = (id, editingIncome, submittingIncomeUpdate, name, amount, date, closeModal) => {
  return (
    <Container class="bg-gray-100 w-2/6 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-xl">
            <div class="text-center m-5">
              <p>Edit Income</p>
            </div>
            <form>
              <div class=" m-6">
                <TextField onChange={(event) => {editingIncome(event, "Name", name, amount, date)}} defaultValue={name} fullWidth id="standard-basic" label="Name" variant="standard" />
              </div>
              <div class=" m-6">
                <TextField onChange={(event) => {editingIncome(event, "Date", name, amount, date)}} defaultValue={date} fullWidth id="standard-basic" label="Date Recieved" variant="standard" />
              </div>
              <div class=" m-6">
                <TextField onChange={(event) => {editingIncome(event, "Amount", name, amount, date)}} defaultValue={amount} fullWidth id="standard-basic" label="Amount" variant="standard" inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} />
              </div>
              <div class="text-center m-3">
                <Button onClick={() => {submittingIncomeUpdate(id); closeModal()}} variant="outlined" size="medium">
                  Submit
                </Button>
              </div>
             </form> 
          </Container>
  );
};

export default function EditItemModal(props) {
  const [open, setOpen] = React.useState(false);
  const[currentName, setNameValue] = React.useState(props.name);
  const[currentDate, setDateValue] = React.useState(props.name);
  const[currentAmount, setAmountValue] = React.useState(props.name);
  
  const handleOpen = () => {
    setOpen(true);
    setNameValue(props.name);
    setDateValue(props.date);
    setAmountValue(props.amount);
  };
  
  const handleClose = () => setOpen(false);

  
  

  return (
    <Container>
      <div class=" text-left">
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
          props.modalType === 'editingIncome' ? <div>{editIncomeForm(props.id, props.editingIncome, props.submittingIncomeUpdate, currentName, currentAmount, currentDate, handleClose)}</div> : <div>{editBudgetItemForm(props.editingExpense, props.submittingExpense, handleClose)}</div>
        }
      </Modal>
    </Container>
  );
}