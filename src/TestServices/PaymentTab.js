import React, { useEffect, useState, useMemo } from 'react'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import { SmtpProxy } from './Services/SmtpProxy.service';
import Button from '@mui/material/Button';

import InputLabel from '@mui/material/InputLabel';
const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));


const handleChange = (event) => {
    console.log(event);
    console.log(event.target.name + " " + event.target.value);

    // PaymentProxy
    //     .saveStatus(event.target.name, event.target.value)
    //     .then((response) => {

    //         console.log(response);
    //     })
    //     .catch((error) => {


    //     });
};




function PaymentTab(props) {
    const [statusAll, setStatusAll] = useState();

    const handleAllStatus = (event) => {
        setStatusAll(event.target.value);
    }


    const updateAllStatus = () => {
        // SmsProxy
        //     .saveStatusAll(statusAll)
        //     .then((response) => {

        //         console.log(response);
        //     })
        //     .catch((error) => {


        //     });
    }


    return (
        <>

            <Stack
                direction="column"
                justifyContent="center"
                alignItems="center"
                spacing={2}
            >
                <Stack
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    spacing={2}
                > <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Age</InputLabel>
                        <Select
                            labelId="demo-select-small"
                            // id={row.id}
                            value={statusAll}
                            label="Status"
                            // name={statusAll}
                            onChange={handleAllStatus}
                        >
                            <MenuItem value="Paid">Paid</MenuItem>
                            <MenuItem value="Unpaid">Unpaid</MenuItem>

                        </Select>
                    </FormControl>
                    <Button variant="outlined" onClick={updateAllStatus}>Apply to All</Button>
                </Stack>

                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                {/* <StyledTableCell>Dessert (100g serving)</StyledTableCell> */}
                                <StyledTableCell align="center">Transaction ID</StyledTableCell>
                                <StyledTableCell align="center">Name</StyledTableCell>
                                <StyledTableCell align="center">Amount Due</StyledTableCell>
                                <StyledTableCell align="center">Payment Status</StyledTableCell>
                                <StyledTableCell align="center">Payment Method</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {props.paymentList.map((row) => (
                                <StyledTableRow key={row.name}>
                                    {/* <StyledTableCell component="th" scope="row">
            {row.name}
          </StyledTableCell> */}
                                    <StyledTableCell align="center">{row.id}</StyledTableCell>
                                    <StyledTableCell align="center">{row.recipient}</StyledTableCell>
                                    <StyledTableCell align="center">
                                        <Select
                                            labelId="demo-select-small"
                                            id={row.id}
                                            // value={age}
                                            label="Age"
                                            name={row.id}
                                            onChange={handleChange}
                                        >
                                            <MenuItem value="">
                                                <em>None</em>
                                            </MenuItem>
                                            {props.statusList.map(function (object, i) {
                                                return <MenuItem value={i}>{object}</MenuItem>;
                                            })

                                            }

                                            <MenuItem value="sent">sent</MenuItem>

                                        </Select>

                                    </StyledTableCell>
                                    <StyledTableCell align="center">{row.content}</StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

            </Stack>

        </>
    )
}

export default PaymentTab