import * as React from 'react';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
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

const listOfMonths = (month, year) => {
  return (
    
        <ListItem>
          <ListItemButton>
              {month + ' ' + year}
          </ListItemButton>
        </ListItem>
    
  );
};

export default function DatePickerModal(props) {
  const[open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Container>
      <div class=" text-left">
        <Button onClick={handleOpen}>
            Current Date
        </Button>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{overflow: 'scroll'}}
      >
        <Container class="bg-gray-100 w-2/6 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-xl">
          <List>
            {props.monthData.map(monthData => {
              return(
                listOfMonths(monthData.month, monthData.year)
              )
            })
              
            }
          </List>
        </Container>
      </Modal>
    </Container>
  );
}