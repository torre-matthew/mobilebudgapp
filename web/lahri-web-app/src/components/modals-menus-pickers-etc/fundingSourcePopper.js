import * as React from 'react';
import Box from '@mui/material/Box';
import Popper from '@mui/material/Popper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Fade from '@mui/material/Fade';
import Paper from '@mui/material/Paper';

export default function FundingSourcePopper(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [placement, setPlacement] = React.useState();

  const handleClick = (newPlacement) => (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((prev) => placement !== newPlacement || !prev);
    setPlacement(newPlacement);
  };

  return (
    <Box sx={{ width: 500 }}>
      <Popper open={open} anchorEl={anchorEl} placement={placement} transition>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper>
              <Typography sx={{ p: 2 }}>Use this funding source for this item?</Typography>
              <Grid>
                  <Grid item lg={9}>
                    <Button onClick={props.addingFundingSourceToExpense(props.id, props.name, props.date, props.amount, true, props.incomeID, props.loggedInUserID)} > Yes </Button>
                  </Grid>
                  <Grid item lg={3}>
                    <Button> Cancel </Button>
                  </Grid>
              </Grid>
            </Paper>
          </Fade>
        )}
      </Popper>
      <Button onClick={handleClick('bottom')}>{props.incomeName}</Button>
    </Box>
  );
}
