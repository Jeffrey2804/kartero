import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';

import Moment from 'moment';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PaymentBatchOverview from './PaymentBatchOverview';
import { reportsService } from '../../Services/reports.service';



import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
function createData(
    karteroTransNumber,
    accountNumber,
    name,
    statementsCreationDate,
    statementsSentDate,
    email,
    deliveryStatus,
    mobileNumber,
    smsSentDate,
    smsStatus
) {
    return {
        karteroTransNumber,
        accountNumber,
        name,
        statementsCreationDate,
        statementsSentDate,
        email,
        deliveryStatus,
        mobileNumber,
        smsSentDate,
        smsStatus,
    };
}

// const rows = [
//     createData('10001', "3850001", "ABC", "12 June 2022", "12 June 2022", "test123@gmail.com", "SENT", "0912345678", "SENT", "12 June 2022", "SENT", "DONE", "0", "PAYMENT GATEWAY"),
//     createData('10002', "3850002", "DEF", "13 June 2022", "12 June 2022", "test123@gmail.com", "SENT", "0912345678", "SENT", "12 June 2022", "SENT", "DONE", "0", "PAYMENT GATEWAY"),
//     createData('10003', "3850003", "GHI", "14 June 2022", "12 June 2022", "test123@gmail.com", "SENT", "0912345678", "SENT", "12 June 2022", "SENT", "DONE", "0", "PAYMENT GATEWAY"),
//     createData('10004', "3850004", "JKL", "15 June 2022", "12 June 2022", "test123@gmail.com", "SENT", "0912345678", "SENT", "12 June 2022", "SENT", "DONE", "0", "PAYMENT GATEWAY"),
//     createData('10005', "3850005", "MNO", "16 June 2022", "12 June 2022", "test123@gmail.com", "SENT", "0912345678", "SENT", "12 June 2022", "SENT", "DONE", "0", "PAYMENT GATEWAY"),
//     createData('10006', "3850006", "PQR", "17 June 2022", "12 June 2022", "test123@gmail.com", "SENT", "0912345678", "FAILED", "12 June 2022", "SENT", "DONE", "0", "PAYMENT GATEWAY"),
//     createData('10007', "3850007", "STU", "18 June 2022", "12 June 2022", "test123@gmail.com", "SENT", "0912345678", "SENT", "12 June 2022", "SENT", "DONE", "0", "PAYMENT GATEWAY"),
//     createData('10008', "3850008", "VWX", "10 June 2022", "12 June 2022", "test123@gmail.com", "SENT", "0912345678", "SENT", "12 June 2022", "SENT", "DONE", "0", "PAYMENT GATEWAY"),
//     createData('10009', "3850009", "YZA", "20 June 2022", "12 June 2022", "test123@gmail.com", "SENT", "0912345678", "SENT", "12 June 2022", "SENT", "DONE", "0", "PAYMENT GATEWAY"),
//     createData('10010', "3850010", "BCD", "21 June 2022", "12 June 2022", "test123@gmail.com", "SENT", "0912345678", "SENDING", "12 June 2022", "SENT", "DONE", "0", "PAYMENT GATEWAY"),
//     createData('10011', "3850011", "EFG", "22 June 2022", "12 June 2022", "test123@gmail.com", "SENT", "0912345678", "SENT", "12 June 2022", "SENT", "DONE", "0", "PAYMENT GATEWAY"),
//     createData('10012', "3850012", "HIJ", "23 June 2022", "12 June 2022", "test123@gmail.com", "SENT", "0912345678", "SENT", "12 June 2022", "SENT", "DONE", "0", "PAYMENT GATEWAY"),
//     createData('10013', "3850013", "KLM", "24 June 2022", "12 June 2022", "test123@gmail.com", "SENT", "0912345678", "SENT", "12 June 2022", "SENT", "DONE", "0", "PAYMENT GATEWAY"),
// ];

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

const headCells = [
    {
        id: 'karteroTransNumber',
        numeric: false,
        disablePadding: true,
        label: 'Kartero Transaction Number',
    },
    {
        id: 'accountNumber',
        numeric: false,
        disablePadding: false,
        label: 'Account Number',
    },
    {
        id: 'name',
        numeric: false,
        disablePadding: false,
        label: 'Name',
    },
    {
        id: 'statementCreationDate',
        numeric: false,
        disablePadding: false,
        label: 'Statements Creation Date',
    },
    {
        id: 'statementsSentDate',
        numeric: false,
        disablePadding: false,
        label: 'Statements Sent Date',
    },
    {
        id: 'email',
        numeric: false,
        disablePadding: false,
        label: 'email',
    },
    {
        id: 'deliveryStatus',
        numeric: true,
        disablePadding: false,
        label: 'Delivery Status',
    },
    {
        id: 'mobileNumber',
        numeric: true,
        disablePadding: false,
        label: 'Mobile',
    },
    {
        id: 'smsSentDate',
        numeric: true,
        disablePadding: false,
        label: 'SMS Sent Date',
    },
    {
        id: 'smsStatus',
        numeric: true,
        disablePadding: false,
        label: 'SMS Status',
    },
];

function EnhancedTableHead(props) {



    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
        props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    {/* <Checkbox
                        color="primary"
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{
                            'aria-label': 'select all desserts',
                        }}
                    /> */}
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        // align={headCell.numeric ? 'right' : 'left'}
                        align='left'
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

const EnhancedTableToolbar = (props) => {
    const { numSelected } = props;

    return (
        <Toolbar
            sx={{
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
                ...(numSelected > 0 && {
                    bgcolor: (theme) =>
                        alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                }),
            }}
        >
            {numSelected > 0 ? (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    color="inherit"
                    variant="subtitle1"
                    component="div"
                >
                    {numSelected} selected
                </Typography>
            ) : (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    variant="h6"
                    id="tableTitle"
                    component="div"
                >
                    <IconButton color="primary"  >

                        {/* <ArrowBackIcon /> */}
                    </IconButton>
                    Individual Overview
                </Typography>
            )}

            {numSelected > 0 ? (
                <Tooltip title="Delete">
                    <IconButton>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            ) : (
                <Tooltip title="Filter list">
                    <IconButton>
                        <FilterListIcon />
                    </IconButton>
                </Tooltip>
            )}
        </Toolbar>
    );
};

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
};

export default function EnhancedTable(props) {
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('karteroTransNumber');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(true);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [value, setValue] = React.useState('female');
    const [loading, setLoading] = useState(true);

    const [deliveryIndividualOverviewData, setDeliveryIndividualOverviewData] = useState([]);

    const viewDeliveryIndividualOverview = () => {

        reportsService
            .getDeliveryIndividualOverview(props.selectedStatemendId)
            .then((response) => {
                setDeliveryIndividualOverviewData(response);
                setLoading(false);
            })
            .catch((error) => {
            
            });
    }

    useEffect(() => {
        viewDeliveryIndividualOverview();
    }, [props.statementId]);


    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };


    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = deliveryIndividualOverviewData.map((n) => n.name);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        setSelected(newSelected);
    };
    const handleChange = (event) => {
        setValue(event.target.value);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleChangeDense = (event) => {
        setDense(event.target.checked);
    };

    const changeView = () => {
        props.currentView(false);
    }

    const isSelected = (name) => selected.indexOf(name) !== -1;

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - deliveryIndividualOverviewData.length) : 0;

    return (
        <>
            {
                loading ?
                    <Backdrop
                        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }
                        }
                        open={loading}
                    >
                        <CircularProgress color="inherit" />
                    </Backdrop >
                    :
                    <Box sx={{ width: '100%' }}>
                        {/* {showPaymentBatchOverview ? <PaymentBatchOverview /> : null} */}
                        <div >
                            <Paper sx={{ width: '100%', mb: 2 }}>

                                {/* <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="none"
                        name="radio-buttons-group"
                        onChange={handleChange}
                    > */}
                                <EnhancedTableToolbar numSelected={selected.length} />
                                <TableContainer>
                                    <Table
                                        sx={{ minWidth: 750 }}
                                        aria-labelledby="tableTitle"
                                        size='small'
                                    >

                                        <EnhancedTableHead
                                            numSelected={selected.length}
                                            order={order}
                                            orderBy={orderBy}
                                            onSelectAllClick={handleSelectAllClick}
                                            onRequestSort={handleRequestSort}
                                            rowCount={deliveryIndividualOverviewData.length}
                                        />

                                        <IconButton color="primary"  >

                                            <ArrowBackIcon onClick={changeView} />
                                        </IconButton>

                                        <TableBody>
                                            {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
                                            {stableSort(deliveryIndividualOverviewData, getComparator(order, orderBy))
                                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                                .map((row, index) => {
                                                    const isItemSelected = isSelected(row.name);
                                                    const labelId = `enhanced-table-checkbox-${index}`;

                                                    return (
                                                        <TableRow
                                                            hover
                                                            // onClick={(event) => handleClick(event, row.name)}
                                                            // role="checkbox"
                                                            // aria-checked={isItemSelected}
                                                            tabIndex={-1}
                                                            key={row.name}
                                                        // selected={isItemSelected}
                                                        >
                                                            <TableCell padding="checkbox">

                                                                {/* <FormControlLabel
                            color="primary"
                            id = {row.name}
                            // checked={isItemSelected}
                            inputProps={{
                              'aria-labelledby': labelId,
                            }}
                            control={<Radio />}

                          /> */}

                                                                {/* <FormControlLabel value={row.deliveryId} control={<Radio />} /> */}

                                                            </TableCell>
                                                            <TableCell
                                                                component="th"
                                                                id={row.deliveryId}
                                                                scope="row"
                                                                padding="normal"
                                                                align="left"
                                                            >
                                                                {row.accountNumber}
                                                            </TableCell>
                                                            <TableCell align="left">{row.accountNumber}</TableCell>
                                                            <TableCell align="left">{row.firstName + " " + row.middleName + " " + row.lastName} </TableCell>
                                                            <TableCell align="left">
                                                                {Moment(new Date(row.statementsCreationDate)).format('MMM Do YYYY')}
                                                                {/* <Chip label={row.statementsCreationDate} color={row.status} /> */}

                                                            </TableCell>

                                                            <TableCell align="left">{Moment(new Date(row.emailSentDate)).format('MMM Do YYYY')}</TableCell>
                                                            <TableCell align="left">{row.emailAddress}</TableCell>
                                                            <TableCell align="left">{row.emailStatus}</TableCell>
                                                            <TableCell align="left">{row.mobileNumber}</TableCell>
                                                            <TableCell align="left">{Moment(new Date(row.smsSentDate)).format('MMM Do YYYY')}</TableCell>
                                                            <TableCell align="left">{row.smsStatus}</TableCell>
                                                        </TableRow>
                                                    );
                                                })}
                                            {emptyRows > 0 && (
                                                <TableRow
                                                    style={{
                                                        height: (dense ? 33 : 53) * emptyRows,
                                                    }}
                                                >
                                                    <TableCell colSpan={6} />
                                                </TableRow>
                                            )}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                                <TablePagination
                                    rowsPerPageOptions={[5, 10, 25]}
                                    component="div"
                                    count={deliveryIndividualOverviewData.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    onPageChange={handleChangePage}
                                    onRowsPerPageChange={handleChangeRowsPerPage}
                                />
                                {/* </RadioGroup> */}
                            </Paper>

                        </div>
                    </Box>
            }
        </>
    );
}
