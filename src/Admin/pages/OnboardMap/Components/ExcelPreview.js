import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Card from '@mui/material/Card';
import { Box } from '@mui/system';
import { Email, Payment, PeopleAlt, Sms } from '@mui/icons-material';
import { Grid, Typography } from '@mui/material';
import {styled} from '@mui/material/styles';
import MuiButton from '@mui/material/Button';
import DataTable from 'react-data-table-component';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));


const options = {
    shouldForwardProp: (prop) => prop !== 'rounded',
};

const Button = styled(
        MuiButton,
        options,
    )(({ rounded }) => ({
        borderRadius: rounded ? '24px' : null,
        backgroundColor: '#FD9A08'
  }));


export default function ExcelPreview(props) {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(50);
    const pdfConfig = props.pdfConfig;
    const htmlConfig = props.htmlConfig;
    const globalVariables = props.globalVariablesList;
    const transactionVariables = props.transactionVariablesList;
    const testColumns = [...pdfConfig, ...htmlConfig];

    console.log(transactionVariables[0]);
    console.log(globalVariables);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    }; 

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleConfigData = (data) => {
        props.collectAllData(data);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        handleConfigData(testColumns);
        console.log(testColumns);
    };

    function testDownload() {
        const headers = testColumns.map((getHeaders) => {
            return getHeaders.name});
        const stringifyValues = JSON.stringify(headers);
        const test = stringifyValues.replace("[,],'","");
        const file = new Blob([test], {type: 'text/csv'});
        const element = document.createElement("a");
        element.href = URL.createObjectURL(file);
        element.download = "Input-File-"+Date.now()+".csv";
        document.body.appendChild(element);
        element.click();
    };

    function downloadClick() {
        testDownload();
    }


    return (
        <div className='template'>

            <Box className='mainContentBox'>

            <Grid
                                container
                                direction="row"
                                justifyContent="right"
                                alignItems="right"
                                columnGap={0}
                            >

                            
                                <Button onClick={() => {downloadClick();}} 
                                    variant="contained" size="large" disableElevation>
                                    Confirm and Download
                                </Button>
                            </Grid>

                <Box className='billHolder'>
                
                
                <Paper sx={{ width: '80.5vw', overflow: 'hidden'}}>
                    <TableContainer sx={{ maxHeight: 240 }}>
                        <Table sx={{minWidth: 700}} stickyHeader>
                            <TableHead>
                                <TableRow>
                                {testColumns.map((test) => {return (
                                    <StyledTableCell align="center" key={test.name}>{test.name}</StyledTableCell>
                                )})}    
                                </TableRow>
                            </TableHead>
                        </Table>
                    </TableContainer>
                {htmlConfig.map((test) => {return ( 
                    <TableContainer sx={{ maxHeight: 210 }}>
                        <Table sx={{minWidth: 700}}>
                            <TableBody>
                                <TableRow>
                                    <StyledTableCell align="center">{test.delimeter}</StyledTableCell>  
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                )})}
                
                </Paper>
                <div>
                    <Button onClick={handleSubmit}>Confirm Values</Button>
                </div>
            </Box>
            </Box>
            </div>
        
    );
}