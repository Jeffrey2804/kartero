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
import { BorderColor, Delete, Email, Payment, PeopleAlt, Sms } from '@mui/icons-material';
import { IconButton, Typography } from '@mui/material';
import {styled} from '@mui/material/styles';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import { adminAccountService } from '../../../../AdminServices/account.service';
import { useNavigate } from 'react-router-dom';
import UserOverviewPage from './UserOverviewPage';
import CreateMerchant from './AccountCreation/CreateMerchant';

const columnNames = [
    {
        id : 'companyName',
        numeric: false,
        disablePadding: true,
        label : 'Merchant'
    },
    {
        id : 'companyEmailAddress',
        numeric: false,
        disablePadding: true,
        label: 'Email Address'
    },
    {
        id: 'dateSubscribed',
        numeric: false,
        disablePadding: true,
        label: 'Subscription Start'
    },
    {
        id: 'dateExpire',
        numeric: false,
        disablePadding: true,
        label: 'Subscription End'
    },
    {
      id: 'body',
      numeric: false,
      disablePadding: true,
      label: 'Users'
    },
    {
      id: 'functionButton',
      numeric: false,
      disablePadding: true,
      label: ''
    }
]

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "rgb(148, 147, 147)",
    color: theme.palette.common.white,
    height: 37
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

export default function MerchantOverviewPage(props) {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [value, setValue] = React.useState('female');
  const navigate = useNavigate();
  const [merchantOverview, setMerchantOverview] = useState([]);
  const [showUserListOverview, setShowUserListOverview] = useState(false);
  const [currentStatementId, setCurrentStatementId] = useState("");
  const [currentMerchantName, setCurrentMerchantName] = useState("");
  const [showCreateMerchant, setShowCreateMerchant] = useState(false);
  const [deleteMerchant, setDeleteMerchant] = useState(false);
  const [merchantID, setMerchantID] = useState('');

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const viewMerchantOverview = () => {
    adminAccountService
      .getAllMerchant()
      .then((response) => {
        setMerchantOverview(response);
        props.setMerchantOverview(response);
        console.log(response);
      })
      .catch((error) => {


      });
  }

  // const deleteMerchantByID = (id) => {
  //   adminAccountService
  //     .deleteMerchant(id)
  //     .then((response) => {
  //       console.log(response);
  //     })
  //     .catch((error) => {


  //     });
  // }

  useEffect(() => {
    viewMerchantOverview();
  }, []); 

  function viewIndividualPayment(statementId, merchantName) {
    setCurrentStatementId(statementId);
    setCurrentMerchantName(merchantName)
    setShowUserListOverview(true);
  }

  const doDeleteMerchant = (id) => {
    // setMerchantID(id);
    // setDeleteMerchant(true);
    
    // deleteMerchantByID(id)
    window.location.reload(false);
  }

  const handleChangeView = (response) => {
    setShowUserListOverview(response);
  }

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = merchantOverview.map((n) => n.name);
      setSelected(newSelected);
      return;
    }
    setSelected([showUserListOverview]);
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
        <StyledTableCell padding="checkbox"/>
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
            >
              <Box sx={{color: 'white'}}>
                {columnName.label}
              </Box>
              {orderBy === columnName.id ? (
                <Box component="span" sx={visuallyHidden}>
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

  function nextClick() {
    setShowCreateMerchant(true);
  }

  const handleChangeViewForCreateMerchant = (response) => {
    setShowCreateMerchant(response);
  }

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - merchantOverview.length) : 0;

    return (

      <Box sx={{ width: '100%' }} >

      {showUserListOverview ? <UserOverviewPage
        selectedStatemendId={currentStatementId}
        selectedName={currentMerchantName}
        currentView={handleChangeView}
      /> : null}

      {showCreateMerchant ? <CreateMerchant
        currentView={handleChangeViewForCreateMerchant}
      /> : null}


      <div hidden={showUserListOverview}>
      <div hidden={showCreateMerchant}>

        <div className='adminPage'>
            <div className='adminPageHeader'>
              <Paper sx={{ width: '70.5vw', mb: 2, backgroundColor: '#f5f5f5'}} elevation={0}>
                <div className='adminStepperButton'>
                  <React.Fragment>
                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                      <div className='title'>
                        <label>
                          Accounts
                        </label>
                      </div>
                    <Box sx={{ flex: '1 1 auto' }} />
                      <Button 
                        color="secondary"
                        variant="contained" size="large" disableElevation rounded
                        onClick={() => {nextClick();}} 
                      >
                       + Create New Merchant
                      </Button>
                    </Box>
                  </React.Fragment>
                </div>
              </Paper>
            </div>

            <div className='adminPageContent'>
                <div className='title'>
                    Overview
                </div>
                <Paper sx={{ width: '70.5vw', mb: 2}}>
                    <TableContainer sx={{ maxHeight: 400 }}>
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
                            />

                            <TableBody>
                            {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                            rows.slice().sort(getComparator(order, orderBy)) */}
                            {stableSort(merchantOverview, getComparator(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                const isItemSelected = isSelected(row.name);
                                const labelId = `enhanced-table-checkbox-${index}`;

                                return (
                                    <TableRow
                                    hover
                                    tabIndex={-1}
                                    onClick={(event) => viewIndividualPayment(row.id, row.companyName)}
                                    key={row.companyName}
                                    style={{ cursor: 'pointer' }}
                                    >
                                    <TableCell padding="checkbox"/>
                                    <StyledTableCell align="center">{row.companyName}</StyledTableCell>
                                    <StyledTableCell align="center">{row.companyEmailAddress}</StyledTableCell>
                                    <StyledTableCell align="center">{row.dateSubscribed.substring(0, 10)}</StyledTableCell>
                                    <StyledTableCell align="center">{row.dateExpire.substring(0, 10)}</StyledTableCell>
                                    <StyledTableCell align="center">1</StyledTableCell>
                                    <StyledTableCell align="center">
                                      <IconButton disabled={true}>
                                        <BorderColor/>
                                      </IconButton>
                                      {/* <IconButton onClick={doDeleteMerchant(row.id, row.id)}> */}
                                      <IconButton disabled={true}>
                                        <Delete/>
                                      </IconButton>
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
        </div>
      </Box>
    );

   

}