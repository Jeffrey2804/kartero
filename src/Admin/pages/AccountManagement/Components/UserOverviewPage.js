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
import CreateUserAccount from './AccountCreation/CreateUserAccount';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';


const columnNames = [
    {
        id : 'username',
        numeric: false,
        disablePadding: true,
        label : 'Username'
    },
    {
        id : 'roles',
        numeric: false,
        disablePadding: true,
        label: 'Role'
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


export default function UserOverviewPage(props) {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [value, setValue] = React.useState('female');
  const navigate = useNavigate();
  const [userList, setUserList] = useState([]);
  const [showCreateUser, setShowCreateUser] = useState(false);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const viewUserListOverview = () => {
    console.log("Statement ID " + props.selectedStatemendId);

    adminAccountService
      .getAllUsers(props.selectedStatemendId)
      .then((response) => {
        setUserList(response);
        props.setUserList(response);
        console.log(response);
      })
      .catch((error) => {


      });
  }

  useEffect(() => {
    viewUserListOverview();
  }, [props.statementId]);


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

  function nextClick() {
      setShowCreateUser(true);
  }

  function previousClick() {
    window.location.reload(false);
  }

  const handleChangeView = (response) => {
    setShowCreateUser(response);
  }

  const backClick = () => {
    window.location.reload(false);
}

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - userList.length) : 0;

    return (
      <Box sx={{ width: '100%' }} >

      {showCreateUser ? <CreateUserAccount
        selectedStatementId={props.selectedStatemendId}
        selectedName={props.selectedName}
        currentView={handleChangeView}
      /> : null}


      <div hidden={showCreateUser}>


        <div className='adminPage'>
            <div className='adminPageHeader'>
              <Paper sx={{ width: '70.5vw', mb: 2, backgroundColor: '#f5f5f5'}} elevation={0}>
                <div className='adminStepperButton'>
                  <React.Fragment>
                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                      <div className='title'>
                        <label onClick={() => {previousClick();}}>
                          Accounts
                        </label>
                        <label>
                          {props.selectedName}
                        </label>
                      </div>
                    <Box sx={{ flex: '1 1 auto' }} />
                      <Button 
                        color="secondary"
                        variant="contained" size="large" disableElevation rounded
                        onClick={() => {nextClick();}} 
                      >
                       + Create New User
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
                            onRequestSort={handleRequestSort}
                            />

                            <TableBody>
                            {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                            rows.slice().sort(getComparator(order, orderBy)) */}
                            {stableSort(userList, getComparator(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {

                                return (
                                    <TableRow
                                    hover
                                    tabIndex={-1}
                                    key={row.name}
                                    style={{ cursor: 'pointer' }}
                                    >
                                    <TableCell padding="checkbox"/>

                                    <StyledTableCell align="center">{row.username}</StyledTableCell>
                                    <StyledTableCell align="center">{row.roles}</StyledTableCell>
                                    <StyledTableCell align="center">
                                      <IconButton disabled={true}>
                                        <BorderColor/>
                                      </IconButton>
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
                    count={userList.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
                </Paper>
            </div>
            <div className='adminStepperButton'>
              <React.Fragment>
                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                  <Button
                    color="secondary"
                    variant="dashed"
                    className='adminButtonBack'
                    onClick={backClick}
                  >
                    <KeyboardArrowLeft/>
                    Back
                  </Button>
                </Box>
              </React.Fragment>
            </div>
        </div>
      </div>
      </Box>
        
    );   
}