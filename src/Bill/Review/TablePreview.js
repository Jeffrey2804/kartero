import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import {styled} from '@mui/material/styles';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.grey[500],
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));


export default function TablePreview(props) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };


  useEffect(() => {

    console.log(Object.keys(props.dataFromUpload)[0]);
  }, [props.dataFromUpload]);

  const widthSetter = (id) => {
    if (id === "Account Number"
      || id === "Email Address"
      || id === "Mobile Number") {
      console.log("test : " + id);
      return { minWidth: "150" };
    }
    return { minWidth: "50" };
  }

  
  return (
    <Paper sx={{ width: '100%', minHeight : '66vh', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 500 , borderRadius: 2}}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {




                Object.values(props.fileHeader).map((key) => (
                 
                  <StyledTableCell
                    key={props.dataFromUpload}
                    align='left'
                    style={widthSetter(key)}
                  >
                    {key}

                  </StyledTableCell>
                ))


              }


            </TableRow>
          </TableHead>
          <TableBody>
            {props.dataFromUpload
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {Object.keys(props.dataFromUpload[0]).map((column) => {
                      const value = row[column];
                      return (
                        <StyledTableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </StyledTableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={props.dataFromUpload.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      
    </Paper >
  );
}
