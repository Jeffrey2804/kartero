import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import { alpha } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import Grid from '@mui/material/Grid';
import MuiButton from '@mui/material/Button';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Card from '@mui/material/Card';
import { Box } from '@mui/system';
import { BorderColor, Delete, Email, EmailTwoTone, Payment, PaymentTwoTone, PeopleAlt, PeopleAltTwoTone, Sms, SmsTwoTone } from '@mui/icons-material';
import { Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import { adminAccountService } from '../../../../AdminServices/account.service';
import { useNavigate } from 'react-router-dom';
// import KarteroTab from '../../../../Report/Components/KarteroTab'
import KarteroTab from './ReportsTab';
import '../../../../Styles/AdminPage.css';
import CustomizedTabs from './ReportsTab';
import { adminSubscriptionService } from '../../../../AdminServices/subscription.service';
import Stack from '@mui/material/Stack';
import AddActiveSubsModal from './AddActiveSubsModal';
import DeleteActiveSubModal from './DeleteActiveSubModal';

import DeleteIcon from '@mui/icons-material/Delete';
import UpdateActiveSubsModal from './UpdateActiveSubsModal'
const columnNames = [
    {
        id: 'subscriptionPlan',
        numeric: false,
        disablePadding: true,
        label: 'Subscription Plan'
    },
    {
        id: 'emailRemaining',
        numeric: true,
        disablePadding: true,
        label: 'Monthly Email Remaining'
    },
    {
        id: 'smsRemaining',
        numeric: true,
        disablePadding: true,
        label: 'Total SMS Remaining'
    },
    {
        id: 'nextSubscriptionStart',
        numeric: true,
        disablePadding: true,
        label: 'Subscription Start'
    },
    {
        id: 'subscriptionExpiry',
        numeric: true,
        disablePadding: true,
        label: 'Subscription Expiry'
    },
    {
        id: 'subscription',
        numeric: false,
        disablePadding: true,
        label: 'Subscription'
    }


]

function createData(
    merchant,
    emailAddress,
    role,
    startSubs,
    endSubs
) {
    return {
        merchant,
        emailAddress,
        role,
        startSubs,
        endSubs
    };
}

// const rows = [
//     createData('Merchant_11', 'Merchant_11@email.com', 'User', '05 November 2022', '05 January 2023'),
//     createData('AzaPhil', 'AzaPhil@email.com', 'User', '03 January 2023', '03 March 2023'),
//     createData('UAFSA', 'uafsa@email.com', 'User', '06 January 2023', '06 June 2023'),
//     createData('AdCore', 'adcore@email.com', 'User', '04 October 2022', '04 October 2023'),
//     createData('Prime League', 'primeleague@email.com', 'User', '10 April 2022', '10 April 2024'),
//     createData('Test', 'test_1@email.com', 'User', '05 November 2022', '05 January 2023')
// ];

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: "white"
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

function EnhancedTableHead(props) {
    const { order, orderBy, onRequestSort } =
        props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };
    return (
        <TableHead>
            <TableRow>
                <StyledTableCell padding="checkbox">

                </StyledTableCell>
                {columnNames.map((columnName) => (
                    <StyledTableCell
                        key={columnName.id}
                        align='center'
                        padding={columnName.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === columnName.id ? order : false}

                    >
                        <TableSortLabel
                            active={orderBy === columnName.id}
                            direction={orderBy === columnName.id ? order : 'asc'}
                            onClick={createSortHandler(columnName.id)}
                            selected={columnName.id}
                        >
                            <Box sx={{ color: 'white' }}>
                                {columnName.label}
                            </Box>
                            {orderBy === columnName.id ? (
                                <Box component="span" visibility={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </StyledTableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    //   onSelectAllClick: PropTypes.func.isRequired,
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
        </Toolbar>
    );
};

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
};


export default function ActiveSubscription(props) {
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [value, setValue] = React.useState('female');
    const [merchantOverview, setMerchantOverview] = useState([]);
    const [showReportsTab, setShowReportsTab] = React.useState(false)
    const [currentStatementId, setCurrentStatementId] = useState("");
    const [currentMerchantName, setCurrentMerchantName] = useState("");
    const [openUpdateModal, setOpenUpdateModal] = useState(false);
    const [activeSubscription, setActiveSubscription] = useState([]);
    const [showAddDialog, setShowAddDialog] = useState(false);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [curSubId, setCurSubId] = useState("");
    const [curSubName, setCurSubName] = useState("");
    const [curEmailLimit, setCurEmailLimit] = useState("");
    const [curSmsLimit, setCurSmsLimit] = useState("");

    const [showUpdateDialog, setShowUpdateDialog] = useState(false);
    const [curSub, setCurSub] = useState([]);
    const [curSubsLength, setCurSubLength] = useState();
    const handleConfirmSending = (confirmSending) => {
        console.log(confirmSending);
        if (confirmSending == "confirm") {
            //   handleNextSteps();
            getActiveSubsById(props.merchantId);
            setShowAddDialog(false);
            setShowDeleteDialog(false);
            setShowUpdateDialog(false);
        } else {
            // setShowAddDialog(confirmSending);
            setShowAddDialog(false);
            setShowUpdateDialog(false);
            setShowDeleteDialog(false);
        }

    }

    const viewUpdateDialog = (subId, subName, emailLimit, smsLimit, subLength) => {
        setCurSubId(subId);
        setCurSubName(subName);
        setCurEmailLimit(emailLimit);
        setCurSmsLimit(smsLimit);
        setCurSubLength(subLength);

        setShowUpdateDialog(true);
    }

    const viewDeleteDialog = (subId, subName) => {
        setCurSubId(subId);
        setCurSubName(subName)
        console.log("Delete icon");
        setShowDeleteDialog(true);
    }

    const viewShowDialog = () => {
        setShowAddDialog(true);
    }

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const viewMerchantOverview = () => {
        adminAccountService
            .getAllMerchant()
            .then((response) => {
                console.log(response);
                setMerchantOverview(response);
                props.setMerchantOverview(response);
                console.log(response);
            })
            .catch((error) => {


            });
    }


    const getActiveSubsById = (merchantId) => {
        adminSubscriptionService
            .getActiveSubscriptionById(merchantId)
            .then((response) => {
                setActiveSubscription(response);
                console.log(response);
            })
            .catch((error) => {

            })
    }



    useEffect(() => {
        console.log(props.merchantId);
        getActiveSubsById(props.merchantId);
    }, [showAddDialog, showDeleteDialog]);

    const handleUpdateSubscription = () => {
        console.log("Open modal");
        setOpenUpdateModal(true);
    }

    const handleClose = () => {
        setOpenUpdateModal(false);
    }

    function viewReportsTab(merchantId, merchantName) {
        console.log("View Reports");
        setCurrentStatementId(merchantId);
        setCurrentMerchantName(merchantName);
        setShowReportsTab(true);
    }

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = merchantOverview.map((n) => n.name);
            setSelected(newSelected);
            return;
        }
        setSelected([showReportsTab]);
    };

    const handleChangeView = (response) => {
        setShowReportsTab(response);
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


    const isSelected = (name) => selected.indexOf(name) !== -1;

    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - merchantOverview.length) : 0;


    return (
        <Box sx={{ width: '100%' }} >


            {showAddDialog ? <AddActiveSubsModal
                merchantId={props.merchantId}
                showModal={showAddDialog} confirmSend={handleConfirmSending} /> : null}
            {showDeleteDialog ? <DeleteActiveSubModal
                subName={curSubName}
                subId={curSubId}
                merchantId={props.merchantId}
                showModal={showDeleteDialog} confirmSend={handleConfirmSending} /> : null}
            {showUpdateDialog ? <UpdateActiveSubsModal
                emailLimit={curEmailLimit}
                smsLimit={curSmsLimit}
                subLength={curSubsLength}
                subName={curSubName}
                subId={curSubId}
                merchantId={props.merchantId}
                showModal={showUpdateDialog} confirmSend={handleConfirmSending} /> : null}

            <div className='adminPage'>
                <div className='adminPageHeader'>
                    <div className='title'>
                        {props.merchantName + " > "} Active Subscription
                    </div>


                    <div className='adminPageContent'>
                        <div className='title'>

                        </div>

                        <Paper sx={{ width: '70.5vw', mb: 2 }}>

                            <Stack
                                direction="row"
                                justifyContent="flex-end"
                                alignItems="center"
                            // spacing={2}
                            >

                                <Button
                                    onClick={e => viewShowDialog()}
                                    sx={{
                                        minWidth: 190,
                                        width: 190,
                                        margin: 1,
                                        border: 1,
                                        borderColor: 'orange',
                                        color: 'white',
                                        ":hover": {
                                            backgroundColor: 'white', color: 'orange',
                                            BorderColor: 'orange', border: 1
                                        },
                                    }}
                                >

                                    + Add Subscription
                                </Button>

                            </Stack>
                            <TableContainer sx={{ maxHeight: 340 }}>
                                <Table
                                    sx={{ minWidth: 750 }}
                                    aria-labelledby="tableTitle"
                                    size='small'
                                    stickyHeader
                                >
                                    <EnhancedTableHead
                                        numSelected={selected.length}
                                        order={order}
                                        orderBy={orderBy}
                                        onSelectAllClick={handleSelectAllClick}
                                        onRequestSort={handleRequestSort}
                                    />

                                    <TableBody>
                                        {stableSort(activeSubscription, getComparator(order, orderBy))
                                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                            .map((row, index) => {
                                                const isItemSelected = isSelected(row.name);
                                                const labelId = `enhanced-table-checkbox-${index}`;

                                                return (
                                                    <TableRow
                                                        hover
                                                        tabIndex={-1}
                                                        key={row.name}
                                                        // onClick={(event) => viewReportsTab(row.id, row.name)}
                                                        style={{ cursor: 'pointer' }}
                                                    >
                                                        <TableCell padding="checkbox">
                                                        </TableCell>
                                                        <StyledTableCell align="center">{row.subscriptionName}</StyledTableCell>
                                                        <StyledTableCell align="center">{row.emailsRemaining}</StyledTableCell>
                                                        <StyledTableCell align="center">{row.smsRemaining}</StyledTableCell>
                                                        <StyledTableCell align="center">{row.nextSubscriptionStart}</StyledTableCell>
                                                        <StyledTableCell align="center">{row.dateExpire}</StyledTableCell>
                                                        <StyledTableCell align="center">
                                                            <Button sx={{
                                                                color: 'white',
                                                                ":hover": {
                                                                    backgroundColor: 'white', color: 'orange'
                                                                }, borderRadius: 5

                                                            }}
                                                                onClick={e => viewUpdateDialog(
                                                                    row.id,
                                                                    row.subscriptionName,
                                                                    row.emailsRemaining,
                                                                    row.smsRemaining,
                                                                    row.billingCycle

                                                                )}
                                                            >Renew</Button>
                                                            <Button
                                                                sx={{
                                                                    color: 'white',
                                                                    ":hover": {
                                                                        backgroundColor: 'white', color: 'orange'
                                                                    }, borderRadius: 5

                                                                }}

                                                                onClick={e => viewDeleteDialog(row.id, row.subscriptionName)}
                                                                startIcon={<DeleteIcon />}>
                                                                Delete
                                                            </Button>
                                                        </StyledTableCell>
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
                                count={activeSubscription.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </Paper>
                    </div>
                </div>
            </div>
        </Box>
    );

}