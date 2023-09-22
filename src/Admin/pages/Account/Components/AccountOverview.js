import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Card from '@mui/material/Card';

const columns = [
    {
        id : 'merchant',
        label : 'Merchant'
    },
    {
        id : 'emailSent',
        label: 'Total Emails Sent'
    },
    {
        id : 'smsSent',
        label: 'Total SMS Sent'
    },
    {
        id: 'transacCount',
        label: 'Transaction Count'
    },
    {
        id: 'subEndDate',
        label: 'Subscription End Date'
    }
]

function createData(
    merchant,
    emailSent,
    smsSent,
    transacCount,
    subEndDate
) {
    return {
        merchant,
        emailSent,
        smsSent,
        transacCount,
        subEndDate
    };
}

const rows = [
    createData('Merchant_11', '268', '268', '258', '01/05/2023'),
    createData('AzaPhil', '226', '226', '216', '03/03/2023'),
    createData('UAFSA', '554', '554', '534', '06/06/2023'),
    createData('AdCore', '762', '764', '742', '10/04/2023'),
    createData('Prime League', '304', '304', '264', '04/10/2024')
]

export default function AccountOverview() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(50);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };    

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden'}}>
        <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
            <TableHead>
                <TableRow>
                {columns.map((column) => (
                    <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                    >
                    {column.label}
                    </TableCell>
                ))}
                </TableRow>
            </TableHead>
            <TableBody>
                {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                    return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                        {columns.map((column) => {
                        const value = row[column.id];
                        return (
                            <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === 'number'
                                ? column.format(value)
                                : value}
                            </TableCell>
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
            
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
        />
        </Paper>
    );
}