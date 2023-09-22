import React, { useEffect, useState } from "react";
import MuiButton from '@mui/material/Button';
import {styled} from '@mui/material/styles';
import { adminAccountService } from "../../../../AdminServices/account.service";
import { Box } from "@mui/material";
import PropTypes from 'prop-types';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import { alpha } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { BorderColor, Delete} from '@mui/icons-material';
import { IconButton, Typography } from '@mui/material';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import { visuallyHidden } from '@mui/utils';
import CreateSubscriptionPlan from "./CreateSubscriptionPlan";
import UpdateSubscriptionPlan from "./UpdateSubscriptionPlan";
import { adminSubscriptionService } from "../../../../AdminServices/subscription.service";
import DeleteSubscriptionPlan from "./DeleteSubscriptionPlan";

const columnNames = [
    {
        id : 'subscriptionPlan',
        numeric: false,
        disablePadding: true,
        label : 'Subscription Plan'
    },
    {
        id : 'emailLimit',
        numeric: false,
        disablePadding: true,
        label: 'Monthly Email Limit'
    },
    {
        id: 'smsLimit',
        numeric: false,
        disablePadding: true,
        label: 'Monthly SMS Limit'
    },
    {
        id: 'subscriptionLength',
        numeric: false,
        disablePadding: true,
        label: 'Billing Cycles'
    },
    {
      id: 'updateDelete',
      numeric: false,
      disablePadding: true,
      label: ''
  },
];

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
              >
                {columnName.label}
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

function SubscriptionOverview() {
  const [subscriptionList, setSubscriptionList] = useState([]);
  const [createSubscription, setCreateSubscription] = useState(false);
  const [updateSubscription, setUpdateSubscription] = useState(false);
  const [deleteSubscription, setDeleteSubscription] = useState(false);
  const [subscriptionName, setSubscriptionName] = useState("");
  const [subscriptionId, setSubscriptionId] = useState("");
  const [subscriptionVisibility, setSubscriptionVisibility] = useState(true);
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleRequestSort = (event, property) => {
      const isAsc = orderBy === property && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(property);
    };

    const viewSubscriptionList = () => {
      adminSubscriptionService
        .getSubscriptionList()
        .then((response) => {
          setSubscriptionList(response);
        })
        .catch((error) => {
          console.log(error);
        })
    }

    useEffect(() => {
      viewSubscriptionList();
    }, []);

    const handleSelectAllClick = (event) => {
      if (event.target.checked) {
        const newSelected = subscriptionList.map((n) => n.name);
        // setSelected(newSelected);
        return;
      }
      // setSelected([showUserListOverview]);
    };

    const createClick = () => {
      setCreateSubscription(true);
    }

    const handleCreateSubscription = (confirmCreateSubscription) => {
      if (confirmCreateSubscription == "create") {
        window.location.reload(false);
      } else {
        setCreateSubscription(false);
      }
    };

    const updateClick = (subName, subID, subVisibility) => {
      setUpdateSubscription(true);
      setSubscriptionName(subName);
      setSubscriptionId(subID);
      setSubscriptionVisibility(subVisibility);
    };

    const deleteClick = (subName, subID) => {
      setDeleteSubscription(true);
      setSubscriptionName(subName);
      setSubscriptionId(subID);
    }

    const handleDeleteSubscription = (confirmDeleteSubscription) => {
      if (confirmDeleteSubscription == "delete") {
        window.location.reload(false);
      } else {
        setDeleteSubscription(false);
      }
    }

    const handleUpdateSubscription = (confirmUpdateSubscription) => {
      if (confirmUpdateSubscription == "update") {
        window.location.reload(false);
      } else {
        setUpdateSubscription(false);
      }
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

      const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - subscriptionList.length) : 0;

  return (
    <Box sx={{width: '100%'}}>
      {createSubscription ? <CreateSubscriptionPlan showCreateModal={createSubscription} createSubscription={handleCreateSubscription}/> : null}
      {updateSubscription ? <UpdateSubscriptionPlan showUpdateModal={updateSubscription} updateSubscription={handleUpdateSubscription} subscriptionName={subscriptionName} subscriptionID={subscriptionId} subscriptionVisibility={subscriptionVisibility}/> : null}
      {deleteSubscription ? <DeleteSubscriptionPlan showDeleteModal={deleteSubscription} deleteSubscription={handleDeleteSubscription} subscriptionName={subscriptionName} subscriptionID={subscriptionId} /> : null}
      <div className='adminPage'>
            <div className='adminPageHeader'>
              <Paper sx={{ width: '70.5vw', mb: 2, backgroundColor: '#f5f5f5'}} elevation={0}>
                <div className='adminStepperButton'>
                  <React.Fragment>
                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                      <div className='title'>
                        <label>
                          Subscription Management
                        </label>
                      </div>
                    <Box sx={{ flex: '1 1 auto' }} />
                      <Button 
                        color="secondary"
                        variant="contained" size="large" disableElevation rounded
                        onClick={() => {createClick();}} 
                      >
                       + Create New Subscription
                      </Button>
                    </Box>
                  </React.Fragment>
                </div>
              </Paper>
            </div>

            <div className='adminPageContent'>
                <Paper sx={{ width: '70.5vw', mb: 2}}>
                    <TableContainer sx={{ maxHeight: 400 }}>
                        <Table
                            sx={{ minWidth: 750 }}
                            aria-labelledby="tableTitle"
                            size='medium'
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
                            {stableSort(subscriptionList, getComparator(order, orderBy))
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
                                    // onClick={(event) => viewIndividualPayment(row.id, row.companyName)}
                                    key={row.companyName}
                                    
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
                                    <StyledTableCell align="center">{row.name}</StyledTableCell>
                                    <StyledTableCell align="center">{row.emailVolume}</StyledTableCell>
                                    <StyledTableCell align="center">{row.smsVolume}</StyledTableCell>
                                    <StyledTableCell align="center">{row.lengthInMonth}</StyledTableCell>
                                    <StyledTableCell align="center">
                                      <IconButton onClick={() => {updateClick(row.name, row.id, row.accountCreationVisible);}} >
                                        <BorderColor/>
                                      </IconButton>
                                      <IconButton onClick={() => {deleteClick(row.name, row.id)}}>
                                      {/* <IconButton disabled={true}> */}
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
                    count={subscriptionList.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
                </Paper>
            </div>
        </div>
    </Box>
  )
}

export default SubscriptionOverview