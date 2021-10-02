import React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import BudgetItemDisplay from './budgetItemDisplay';
import AddBudgetItemModal from './modals-menus-pickers-etc/addbudgetItemModal';
import { TableRow, Table, TableCell } from '@mui/material';

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

function SummaryContentContainer(props) {
  const classes = useStyles();

  return (
    <div>
      <Table>
          <TableRow>
              <TableCell>
                  <Card>
                      <CardContent>
                          Expense Summary:
                      </CardContent>
                  </Card>
              </TableCell>
              <TableCell>
                    <Card>
                      <CardContent>
                        Income Summary:
                      </CardContent>
                    </Card>
              </TableCell>
              <TableCell>
                    <Card>
                      <CardContent>
                        After Budgeting Summary:
                      </CardContent>
                    </Card>
              </TableCell>
          </TableRow>
      </Table>
    </div>
  );
}

export default SummaryContentContainer;