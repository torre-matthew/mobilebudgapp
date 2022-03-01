import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
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

const months = (month, year, monthID) => {
  return (
    <MenuItem value={monthID}>{month + ' ' + year}</MenuItem>
  );
};

export default function DatePickerModal(props) {
  const [date, setMonth] = React.useState('');

  const handleChange = (event) => {
    setMonth(event.target.value);
  };

  return (
    <Container>
      <Box>
      <FormControl fullWidth>
        <InputLabel>Month</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          value={date}
          label="Date"      
          onChange={handleChange}
          autoWidth>
          
            {props.monthData.map(monthData => {
                return(
                  
                  <MenuItem onClick={() => {props.selectMonth(monthData._id)}} value={monthData._id}>{monthData.month + ' ' + monthData.year}</MenuItem>
                
                )
              }) 
            }
        </Select>
      </FormControl>
    </Box>
    </Container>
  );
}