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
import ActiveSubscription from './ActiveSubscription';

const columnNames = [
  {
    id: 'companyName',
    numeric: false,
    disablePadding: true,
    label: 'Merchant'
  },
  {
    id: 'emailsSent',
    numeric: true,
    disablePadding: true,
    label: 'Total Emails Sent'
  },
  {
    id: 'smsSent',
    numeric: true,
    disablePadding: true,
    label: 'Total SMS Sent'
  },
  {
    id: 'transactionCount',
    numeric: true,
    disablePadding: true,
    label: 'Transaction Count'
  },
  {
    id: 'dateExpire',
    numeric: false,
    disablePadding: true,
    label: 'Subscription End Date'
  },
  {
    id: 'subscription',
    numeric: false,
    disablePadding: true,
    label: 'Subscriptions'
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
      backgroundColor: "rgb(148, 147, 147)",
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


export default function DashboardOverview(props) {
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
  const [showActiveSubs, setShowActiveSubs] = useState(false);
  const [showAccountList, setShowAccountList] = useState(true);
  const [curMerchantId, setCurMerchantId] = useState("");

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


  const getActiveSubsPerId = (templateId, merchantId) => {
    //  const userId =  localStorage.getItem("uid");
    adminAccountService
      .getActiveSubsById(templateId, merchantId)
      .then((response) => {
        // console.log(response.dateSubscribed);

        return (response.dateSubscribed);
      })
      .catch((error) => {

      })

  }

  useEffect(() => {
    viewMerchantOverview();
  }, []);

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




  const viewActiveSubscription = (merchantId, merchantName) => {
    setCurMerchantId(merchantId);
    setCurrentMerchantName(merchantName);
    console.log(merchantId);
    setShowAccountList(false);
    setShowActiveSubs(true);
  }


  return (
    <Box sx={{ width: '100%' }} >

      {showReportsTab ? <KarteroTab
        selectedStatemendId={currentStatementId}
        merchantName={currentMerchantName}
        currentView={handleChangeView}
      /> : null}

      {showActiveSubs ? <ActiveSubscription
        merchantId={curMerchantId}
        merchantName={currentMerchantName} /> : null}

      <Dialog
        aria-label="updateSubscription"
        open={openUpdateModal}
        onClose={handleClose}
        maxWidth={'md'}
        fullWidth
      >

        <DialogTitle id="updateSubscription">
          {"Edit Merchant Subscription"}
        </DialogTitle>
        <DialogContent dividers>
          {"Set selected template as active or update selected template."}
        </DialogContent>
        <DialogActions>
          <Button rounded>
            Cancel
          </Button>
          <Button rounded>
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <div hidden={!showAccountList}>

        <div className='adminPage'>
          <div className='adminPageHeader'>
            <div className='title'>
              Dashboard
            </div>
            <Box sx={{
              display: 'flex', flexWrap: 'wrap',
              '& > :not(style)': { m: 1, width: 195, height: 75 },
            }}>
              <Paper elevation={1}>
                <div className='icon'>
                  <PeopleAltTwoTone />
                  <span className='count'>{merchantOverview.length}</span>
                </div>
                <Typography className='countLabel'>Number of Merchants</Typography>
              </Paper>

              <Paper elevation={1}>
                <div className='icon'>
                  <EmailTwoTone />
                  <span className='count'>
                    {merchantOverview.reduce(
                      (totalEmails, currentValue) =>
                        totalEmails = totalEmails + currentValue.emailsSent, 0)}
                  </span>
                </div>
                <Typography className='countLabel'>Total Emails Sent</Typography>
              </Paper>

              <Paper elevation={1}>
                <div className='icon'>
                  <SmsTwoTone />
                  <span className='count'>
                    {merchantOverview.reduce(
                      (totalSms, currentValue) =>
                        totalSms = totalSms + currentValue.smsSent, 0)}
                  </span>
                </div>
                <Typography className='countLabel'>Total SMS Sent</Typography>
              </Paper>

              <Paper elevation={1}>
                <div className='icon'>
                  <PaymentTwoTone />
                  <span className='count'>0
                    {/* {merchantOverview.reduce(
                                  (totalSms, currentValue) => 
                                  totalSms = totalSms + currentValue.smsSent, 0)} */}
                  </span>
                </div>
                <Typography className='countLabel'>Total Payment Transaction</Typography>
              </Paper>
            </Box>
          </div>

          <div className='adminPageContent'>
            <div className='title'>
              Overview
            </div>
            <Paper sx={{ width: '70.5vw', mb: 2 }}>
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
                    {stableSort(merchantOverview, getComparator(order, orderBy))
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
                            <StyledTableCell align="center">{row.companyName}</StyledTableCell>
                            <StyledTableCell align="center">{row.emailsSent}</StyledTableCell>
                            <StyledTableCell align="center">{row.smsSent}</StyledTableCell>
                            <StyledTableCell align="center">0</StyledTableCell>
                            <StyledTableCell align="center">
                              {getActiveSubsPerId(row.activeTemplateId, row.id)}
                              {/* {row.dateExpire.substring(0, 10)} */}
                              {/* <IconButton>
                                        <BorderColor onClick={handleUpdateSubscription}/>
                                      </IconButton> */}
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              <Button
                                onClick={e => viewActiveSubscription(row.id, row.companyName)}
                                sx={{
                                  color: 'white', ":hover": {
                                    backgroundColor: 'white', color: 'orange'
                                  }, borderRadius: 5
                                }}>View Active Subscription</Button>
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
                count={merchantOverview.length}
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