import * as React from 'react';
import TextField from '@mui/material/TextField';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Container } from '@mui/material';

// const style = {
//   position: 'absolute',
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
//   bgcolor: 'background.paper',
//   boxShadow: 12,
//   p: 4,
// };

const addBudgetItemForm = (addingExpense, submittingExpense, closeModal) => {
  return (
    <Container class="bg-gray-100 w-2/6 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-xl">
            <div class="text-center m-5">
              <p>Add Budget Item</p>
            </div>
            <form>
              <div class=" m-6">
                <TextField onChange={(event) => {addingExpense(event, "Name")}} fullWidth id="standard-basic" label="Name" variant="standard" />
              </div>
              <div class=" m-6">
                <TextField onChange={(event) => {addingExpense(event, "Date")}} fullWidth id="standard-basic" label="Due Date" variant="standard" />
              </div>
              <div class=" m-6">
                <TextField onChange={(event) => {addingExpense(event, "Amount")}} fullWidth id="standard-basic" label="Amount" variant="standard" inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} />
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

const addIncomeForm = (addingIncome, submittingIncome, closeModal) => {
  return (
    <Container class="bg-gray-100 w-2/6 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-xl">
            <div class="text-center m-5">
              <p>Add Income</p>
            </div>
            <form>
              <div class=" m-6">
                <TextField onChange={(event) => {addingIncome(event, "Name")}} fullWidth id="standard-basic" label="Name" variant="standard" />
              </div>
              <div class=" m-6">
                <TextField onChange={(event) => {addingIncome(event, "Date")}} fullWidth id="standard-basic" label="Date Recieved" variant="standard" />
              </div>
              <div class=" m-6">
                <TextField onChange={(event) => {addingIncome(event, "Amount")}} fullWidth id="standard-basic" label="Amount" variant="standard" inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} />
              </div>
              <div class="text-center m-3">
                <Button onClick={() => {submittingIncome(); closeModal()}} variant="outlined" size="medium">
                  Submit
                </Button>
              </div>
             </form> 
          </Container>
  );
};

export default function AddBudgetItemModal(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Container>
      <div class=" text-left">
        <Button onClick={handleOpen} variant="text">
            {props.modalType === 'addIncome' ? <Typography class=" text-xs"> Add Income</Typography> : <Typography class=" text-xs"> Add New Budget Item</Typography>}
        </Button>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {
          props.modalType === 'addIncome' ? <div>{addIncomeForm(props.addingIncome, props.submittingIncome, handleClose)}</div> : <div>{addBudgetItemForm(props.addingExpense, props.submittingExpense, handleClose)}</div>
        }
      </Modal>
    </Container>
  );
}