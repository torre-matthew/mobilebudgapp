import React from 'react';
import FundingSourcePopper from './modals-menus-pickers-etc/fundingSourcePopper';
import makeStyles from '@mui/styles/makeStyles';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import BudgetItemMoreMenu from './modals-menus-pickers-etc/budgetItemMoreMenu'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';

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
    gridItem: {
        border: 'solid',
        borderColor: 'white',
        borderWidth: '1px'
    }
  }));

function BudgetItemDisplay (props) {
    const classes = useStyles();
    return (
            <div class="py-1">
                <Accordion>
                    <AccordionSummary
                        aria-controls="panel1a-content"
                        id="panel1a-header">
                        <table class="table-fixed w-full">
                            <tr>
                                <td class="text-left text-sm table-row md:table-cell">
                                    {props.name}  
                                </td>
                                <td class="text-right text-sm table-row md:table-cell">
                                    ${props.amount}  
                                </td>
                            </tr>
                            <tr>
                                <td class="text-left text-xs">
                                    {props.date}
                                </td>
                            </tr>
                        </table>
                    </AccordionSummary>
                    <AccordionDetails class=" bg-gray-100">
                                {props.incomeData.map(incomeDataArray => {
                                    return (
                
                                        <FundingSourcePopper 
                                            incomeID={incomeDataArray._id}
                                            incomeName={incomeDataArray.name}
                                            id={props.id}
                                            name={props.name}
                                            date={props.date}
                                            amount={props.amount} 
                                            loggedInUserID={props.loggedInUserID}
                                            addingFundingSourceToExpense={props.addingFundingSourceToExpense}/>
                                    )
                                    })
                                }
                                
                            <table class="  w-1/2">
                                <tr>
                                    <td>
                                        <MenuItem>
                                            <EditIcon fontSize="small"/>
                                        </MenuItem>    
                                    </td>
                                    <td>
                                        <MenuItem>
                                            <ArrowRightAltIcon fontSize="medium" />
                                        </MenuItem>
                                    </td>
                                    <td>
                                        <MenuItem>
                                            Split
                                        </MenuItem>
                                    </td>
                                    <td>
                                        <MenuItem onClick={() => {props.deleteExpense(props.id)}}>
                                            <DeleteIcon fontSize="small" />
                                        </MenuItem>
                                    </td>
                                </tr>
                            </table>
                        </AccordionDetails>
                </Accordion>
            </div>
          
    )
}

export default BudgetItemDisplay;