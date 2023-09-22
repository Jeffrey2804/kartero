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
import DeliveryIndividualOverview from './DeliveryIndividualOverview';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { reportsService } from '../../Services/reports.service'
import Moment from 'moment';

import { authenticationService } from '../../Services/authentication.service';


import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
function createData(
    billingCycle,
    uploadDate,
    service,
    statementUpload,
    statementCreated,
    statementSent,
    smsSent,
    statementNotReceived,
    lastUpdated

) {
    return {
        billingCycle,
        uploadDate,
        service,
        statementUpload,
        statementCreated,
        statementSent,
        smsSent,
        statementNotReceived,
        lastUpdated,
    };
}

// const rows = [
//     createData('9999 May 26 - June 27', "99/99/9999", "SMTP", "99/99/9999", "99/99/9999", "99,999", "0", "0", "00001", "881513", "", "DONE", "0", "PAYMENT GATEWAY"),
//     createData('9998 May 26 - June 27', "99/99/9999", "SMTP", "99/99/9999", "99/99/9999", "99,999", "0", "0", "00001", "881513", "", "DONE", "0", "PAYMENT GATEWAY"),
//     createData('9997 May 26 - June 27', "99/99/9999", "SMTP", "99/99/9999", "99/99/9999", "99,999", "0", "0", "00001", "881513", "", "DONE", "0", "PAYMENT GATEWAY"),
//     createData('9996 May 26 - June 27', "99/99/9999", "SMTP", "99/99/9999", "99/99/9999", "99,999", "0", "0", "00001", "881513", "", "DONE", "0", "PAYMENT GATEWAY"),
//     createData('9995 May 26 - June 27', "99/99/9999", "SMTP", "99/99/9999", "99/99/9999", "99,999", "0", "0", "00001", "881513", "", "DONE", "0", "PAYMENT GATEWAY"),
//     createData('9994 May 26 - June 27', "99/99/9999", "SMTP", "99/99/9999", "99/99/9999", "99,999", "0", "0", "00001", "881513", "", "DONE", "0", "PAYMENT GATEWAY"),
//     createData('9993 May 26 - June 27', "99/99/9999", "SMTP", "99/99/9999", "99/99/9999", "99,999", "0", "0", "00001", "881513", "", "DONE", "0", "PAYMENT GATEWAY"),
//     createData('9992 May 26 - June 27', "99/99/9999", "SMTP", "99/99/9999", "99/99/9999", "99,999", "0", "0", "00001", "881513", "", "DONE", "0", "PAYMENT GATEWAY"),
//     createData('9991 May 26 - June 27', "99/99/9999", "SMTP", "99/99/9999", "99/99/9999", "99,999", "0", "0", "00001", "881513", "", "DONE", "0", "PAYMENT GATEWAY"),
//     createData('9980 May 26 - June 27', "99/99/9999", "SMTP", "99/99/9999", "99/99/9999", "99,999", "0", "0", "00001", "881513", "", "DONE", "0", "PAYMENT GATEWAY"),
//     createData('9981 May 26 - June 27', "99/99/9999", "SMTP", "99/99/9999", "99/99/9999", "99,999", "0", "0", "00001", "881513", "", "DONE", "0", "PAYMENT GATEWAY"),
//     createData('9982 May 26 - June 27', "99/99/9999", "SMTP", "99/99/9999", "99/99/9999", "99,999", "0", "0", "00001", "881513", "", "DONE", "0", "PAYMENT GATEWAY"),
//     createData('9983 May 26 - June 27', "99/99/9999", "SMTP", "99/99/9999", "99/99/9999", "99,999", "0", "0", "00001", "881513", "", "DONE", "0", "PAYMENT GATEWAY"),
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
        id: 'billingCycle',
        date: true,
        disablePadding: true,
        label: 'Billing Cycle',
    },
    {
        id: 'uploadDate',
        date: true,
        disablePadding: true,
        label: 'Upload Date',
    },
    {
        id: 'service',
        numeric: false,
        disablePadding: true,
        label: 'Service',
    },
    {
        id: 'statementsUploaded',
        numeric: false,
        disablePadding: false,
        label: 'Statements Uploaded',
    },
    {
        id: 'statementsCreated',
        numeric: false,
        disablePadding: false,
        label: 'Statement Created',
    },
    {
        id: 'statementsSent',
        numeric: false,
        disablePadding: false,
        label: 'Statement Sent',
    },
    {
        id: 'smsSent',
        numeric: true,
        disablePadding: false,
        label: 'SMS Sent',
    },
    {
        id: 'statementsNotReceived',
        numeric: true,
        disablePadding: false,
        label: 'Statement Not Received',
    },
    {
        id: 'lastUpdated',
        numeric: true,
        disablePadding: false,
        label: 'Last Updated',
    },
    // {
    //     id: 'id',
    //     numeric: false,
    //     disablePadding: true,
    //     label: 'id',
    // },

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
                        align='center'
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
            {/* {numSelected > 0 ? (
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
                    Delivery Batch Overview
                </Typography>
            )} */}
            <Typography
                sx={{ flex: '1 1 100%' }}
                variant="h6"
                id="tableTitle"
                component="div"
            >
                Delivery Batch Overview
            </Typography>

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
    const [orderBy, setOrderBy] = React.useState('billingCycle');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [value, setValue] = React.useState('female');

    const [showIndividualDelivery, setShowIndividualDelivery] = React.useState(false);

    const [deliveryBatchOverviewData, setDeliveryBatchOverviewData] = useState([]);
    const [currentStatementId, setCurrentStatementId] = useState("");
    const [account, setAccount] = useState({});
    const [loading, setLoading] = useState(true);
    Moment.locale('en');





    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    // const handleSelectAllClick = (event) => {
    //     if (event.target.checked) {
    //         const newSelected = deliveryBatchOverviewData.map((n) => n.name);
    //         setSelected(newSelected);
    //         return;
    //     }
    //     setSelected([]);
    // };


    const viewDeliveryOverview = () => {
        if (props.merchantId !== null || props.merchantId !== "") {
            reportsService
                .getDeliveryBatchOverview(props.merchantId)
                .then((response) => {
                    setDeliveryBatchOverviewData(response);
                    setLoading(false);
                    props.setDeliveryBatchOverviewData(response);
                })
                .catch((error) => {


                });
        }
    }

    useEffect(() => {
        viewDeliveryOverview();

    }, []);

    function viewIndividualPayment(statementId) {

        setCurrentStatementId(statementId);
        setShowIndividualDelivery(true);

    }
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

    const handleChangeView = (response) => {
        setShowIndividualDelivery(response);
    }
    const isSelected = (name) => selected.indexOf(name) !== -1;

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - deliveryBatchOverviewData.length) : 0;

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
                        {showIndividualDelivery ? <DeliveryIndividualOverview
                            selectedStatemendId={currentStatementId}
                            currentView={handleChangeView}
                        /> : null}


                        <div hidden={showIndividualDelivery}>


                            <Paper sx={{ width: '100%', mb: 2 }}>
                                {/* <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="none"
                        name="Delivery-radio-buttons-group"
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
                                            // numSelected={selected.length}
                                            order={order}
                                            orderBy={orderBy}
                                            // onSelectAllClick={handleSelectAllClick}
                                            onRequestSort={handleRequestSort}
                                            rowCount={deliveryBatchOverviewData.length}
                                        />


                                        <TableBody>
                                            {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
                                            {stableSort(deliveryBatchOverviewData, getComparator(order, orderBy))
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
                                                            onClick={(event) => viewIndividualPayment(row.transactionId, row.transactionId)}
                                                            style={{ cursor: 'pointer' }}
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

                                                                {/* <FormControlLabel value={row.transactionId} control={<Radio />} /> */}

                                                            </TableCell>
                                                            <TableCell
                                                                component="th"
                                                                id={row.transactionId}
                                                                scope="row"
                                                                padding="none"

                                                            >
                                                                {
                                                                    row.billingCycleFrom

                                                                }
                                                                -
                                                                {
                                                                    row.billingCycleTo
                                                                }
                                                            </TableCell>
                                                            <TableCell align="center">
                                                                {
                                                                    row.uploadDate.substring(0, 10)
                                                                }
                                                            </TableCell>
                                                            <TableCell align="center">{row.service}</TableCell>
                                                            <TableCell align="center">{
                                                                row.statementsUploaded
                                                            }</TableCell>
                                                            <TableCell align="center">{row.statementsCreated}</TableCell>
                                                            <TableCell align="center">{row.statementsSent}</TableCell>
                                                            <TableCell align="center">{row.smsSent}</TableCell>
                                                            <TableCell align="center">{row.statementsNotReceived}</TableCell>
                                                            <TableCell align="left">{row.lastUpdated}</TableCell>
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
                                    count={deliveryBatchOverviewData.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    onPageChange={handleChangePage}
                                    onRowsPerPageChange={handleChangeRowsPerPage}
                                />
                                {/* </RadioGroup> */}
                            </Paper>
                        </div >
                    </Box>
            }
        </>
    );
}
