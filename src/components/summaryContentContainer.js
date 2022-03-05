import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

import { TableRow, Table, TableCell, TableBody } from '@mui/material';

function SummaryContentContainer(props) {

  return (
    <div>
      <Table>
        <TableBody>
          <TableRow>
              <TableCell>
                  <Card>
                      <CardContent>
                          Total Expenses ${props.totalExpenses}
                      </CardContent>
                  </Card>
              </TableCell>
              <TableCell>
                    <Card>
                      <CardContent>
                        Total Income ${props.totalIncome}
                      </CardContent>
                    </Card>
              </TableCell>
              <TableCell>
                    <Card>
                      <CardContent>
                        After Budgeting Summary: ${props.afterSpendingAmount}
                      </CardContent>
                    </Card>
              </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}

export default SummaryContentContainer;