import React from 'react';
import EditItemModal from './modals-menus-pickers-etc/editItemModal';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import { Table, TableCell, TableRow, Typography, TableBody } from '@mui/material';

// const useStyles = makeStyles((theme) => ({
//     root: {
//       flexGrow: 1,
//     },
//     paper: {
//       padding: '12px',
//       textAlign: 'left',
//       color: 'black',
//       backgroundColor: 'white',
//       margin: '5px',
//       fontSize: '10px',
//     },
//     gridItem: {
//         border: 'solid',
//         borderColor: 'white',
//         borderWidth: '1px'
//     }
//   }));

function BudgetItemDisplay (props) {
    // const classNamees = useStyles();
    return (
            <div className="py-1">
                <Accordion>
                    <AccordionSummary
                        aria-controls="panel1a-content"
                        id="panel1a-header">
                        <table className="table-fixed w-full">
                            <tbody>
                            <tr>
                                <td className="text-left text-sm table-row md:table-cell">
                                    {props.name}  
                                </td>
                                <td className="text-right text-sm table-row md:table-cell">
                                    ${props.amount}  
                                </td>
                            </tr>
                            <tr>
                                <td className="text-left text-xs">
                                    {props.date}
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </AccordionSummary>
                    <AccordionDetails className=" bg-blue-200">
                        <Typography>Choose Funding Source</Typography>
                        <Table size='small'>
                            {props.incomeData.map(incomeDataArray => {
                                return (
                                    <TableBody key={incomeDataArray._id}>
                                    <TableRow>
                                        <TableCell>
                                            {incomeDataArray.name}
                                        </TableCell>
                                        <TableCell>
                                            <Button variant='text' onClick={() => {props.addingFundingSourceToExpense(props.id, props.name, props.date, props.amount, true, incomeDataArray._id, props.loggedInUserID)}}>
                                                <CheckCircleOutlineIcon />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                    </TableBody>
                                        )
                                })
                            }
                                
                        </Table>
                            <table className="  w-1/2">
                            <tbody>
                                    <tr>
                                        <td>
                                            <EditItemModal 
                                                modalType={'editingExpense'} 
                                                id={props.id}
                                                name={props.name}
                                                amount={props.amount}
                                                date={props.date}
                                                isPlanned={props.isPlanned}
                                                fundingSource={props.fundingSource}
                                                loggedInUserID={props.loggedInUserID}
                                                editingExpense={props.editingExpense}
                                                submittingExpenseUpdate={props.submittingExpenseUpdate} />    
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
                                </tbody>
                            </table>
                        </AccordionDetails>
                </Accordion>
            </div>
          
    )
}

export default BudgetItemDisplay;