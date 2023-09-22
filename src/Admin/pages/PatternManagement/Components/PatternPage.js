import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import { alpha } from '@mui/material/styles';
import { visuallyHidden } from '@mui/utils';
import { Box } from '@mui/system';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import MuiButton from '@mui/material/Button';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';
import { Grid, IconButton } from '@mui/material';
import { AddCircleOutline, AttachEmail, BorderColor, Delete, DownloadForOfflineOutlined, PictureAsPdf, StickyNote2Outlined } from '@mui/icons-material';
import { adminAccountService } from '../../../../AdminServices/account.service';
import samplePdf from '../../../../Images/samplePDF1.png';
import sampleHtml from '../../../../Images/email.png';
import MerchantPage from './MerchantPage';
import { adminConfigurationService } from '../../../../AdminServices/configuration.service';
import { useDropzone } from 'react-dropzone';
import { globalVariablesService } from './../../../../AdminServices/globalVariable.service'

const columnNames = [
  {
    id: 'companyName',
    numeric: false,
    disablePadding: true,
    label: 'Merchant ID'
  }
]

const pdfColumnName = [
  {
    id: 'filename',
    numeric: false,
    disablePadding: true,
    label: 'PDF File'
  }
]

const htmlColumnName = [
  {
    id: 'filename',
    numeric: false,
    disablePadding: true,
    label: 'HTML File'
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
            align='left'
            padding={columnName.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === columnName.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === columnName.id}
              direction={orderBy === columnName.id ? order : 'asc'}
              onClick={createSortHandler(columnName.id)}
            >
              <Box sx={{ color: 'white' }}>
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

function PatternPage(props) {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [value, setValue] = React.useState('female');
  const [merchantOverview, setMerchantOverview] = useState([]);
  const [showMerchantTemplate, setShowMerchantTemplate] = React.useState(false)
  const [currentStatementId, setCurrentStatementId] = useState("");

  const [pdfList, setPdfList] = useState([]);
  const [htmlList, setHtmlList] = useState([]);

  const [globalVariableData, setGlobalVariableData] = useState([]);

  const { getRootProps: getRootPdfProps, getInputProps: getnInputPdfProps } = useDropzone({
    onDrop: (acceptedFile) => {
      acceptedFile.forEach((pdfFile) => {
        const reader = new FileReader();
        reader.onload = () => {
          uploadPdfFile(pdfFile);
        };
        reader.readAsArrayBuffer(pdfFile);
      }
      )
    }
  });

  const { getRootProps: getRootHtmlProps, getInputProps: getInputHtmlProps } = useDropzone({
    onDrop: (acceptedFile) => {
      acceptedFile.forEach((htmlFile) => {
        const reader = new FileReader();
        reader.onload = () => {
          uploadHtmlFile(htmlFile);
        };
        reader.readAsArrayBuffer(htmlFile);
      }
      )
    }
  })

  const getAllGlobalVariables = () => {
    globalVariablesService
      .getGlobalAllVarialbes()
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {

      })
  }

  const uploadPdfFile = (pdfFile) => {
    adminConfigurationService
      .uploadPDF(pdfFile)
      .then((response) => {
        window.location.reload(false);
      })
      .catch((error) => {

      });
  }

  const uploadHtmlFile = (htmlFile) => {
    adminConfigurationService
      .uploadHTML(htmlFile)
      .then((response) => {
        window.location.reload(false);
      })
      .catch((error) => {

      });
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
        setMerchantOverview(response);
        props.setMerchantOverview(response);
        console.log(response);
      })
      .catch((error) => {

      });
  };

  const viewPdfList = () => {
    adminConfigurationService
      .getPDFList()
      .then((response) => {
        setPdfList(response);
      })
      .catch((error) => {

      });
  }

  const viewHtmlList = () => {
    adminConfigurationService
      .getHTMLList()
      .then((response) => {
        setHtmlList(response);
      })
      .catch((error) => {

      });
  }

  useEffect(() => {
    viewMerchantOverview();
    viewPdfList();
    viewHtmlList();
  }, []);

  function viewReportsTab(merchantId) {
    // console.log("Merch ID: " + merchantId)
    setCurrentStatementId(merchantId);
    setShowMerchantTemplate(true);
  }

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = merchantOverview.map((n) => n.name);
      setSelected(newSelected);
      return;
    }
    setSelected([showMerchantTemplate]);
  };

  const handleChangeView = (response) => {
    setShowMerchantTemplate(response);
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

      {showMerchantTemplate ? <MerchantPage
        selectedStatemendId={currentStatementId}
        currentView={handleChangeView}
      /> : null}

      <div hidden={showMerchantTemplate}>

        <div className='adminPage'>
          <div className='adminPageHeader'>
            <div className='title'>
              Pattern
            </div>

          </div>

          <div className='adminPageContent'>
            <Paper sx={{ width: '70.5vw', mb: 2, backgroundColor: '#f5f5f5' }}>
              <Grid container spacing={1} columns={3}>
                <Grid item xs>
                  <div className='contentHolder'>
                    <TableContainer sx={{ maxHeight: 480 }}>
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
                          {stableSort(merchantOverview, getComparator(order, orderBy))
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row, index) => {
                              const isItemSelected = isSelected(row.companyName);
                              const labelId = `enhanced-table-checkbox-${index}`;

                              return (
                                <TableRow
                                  hover
                                  tabIndex={-1}
                                  key={row.companyName}
                                  onClick={(event) => viewReportsTab(row.id, row.id)}
                                  style={{ cursor: 'pointer' }}
                                >
                                  <TableCell padding="checkbox">

                                  </TableCell>
                                  <StyledTableCell align="left"><StickyNote2Outlined /> {row.companyName}</StyledTableCell>
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
                  </div>
                </Grid>

                <Grid item xs>
                  <div className='contentHolder'>
                    <TableContainer sx={{ maxHeight: 480, ml: 1, mr: 1 }}>
                      <Table
                        aria-labelledby="tableTitle"
                        size='small'
                      >
                        <TableHead>
                          <TableRow>
                            <StyledTableCell padding="checkbox">

                            </StyledTableCell>
                            {pdfColumnName.map((columnName) => (
                              <StyledTableCell
                                key={columnName.id}
                                align='left'
                                padding={columnName.disablePadding ? 'none' : 'normal'}
                                sortDirection={orderBy === columnName.id ? order : false}
                              >
                                <TableSortLabel
                                  active={orderBy === columnName.id}
                                  direction={orderBy === columnName.id ? order : 'asc'}
                                >
                                  <Box sx={{ color: 'white' }}>
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
                            <StyledTableCell padding='checkbox'>
                              <IconButton {...getRootPdfProps({ className: 'dropzone' })}>
                                <input {...getnInputPdfProps()} />
                                <AddCircleOutline sx={{ color: 'orange' }} />
                              </IconButton>
                            </StyledTableCell>
                          </TableRow>
                        </TableHead>
                         {/* {getAllGlobalVariables()}            */}
                        <TableBody>
                          {stableSort(pdfList, getComparator(order, orderBy))
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => {
                              return (
                                <TableRow
                                  hover
                                  tabIndex={-1}
                                  key={row.pdfId}
                                  style={{ cursor: 'pointer' }}
                                >
                                  <StyledTableCell padding="checkbox">

                                  </StyledTableCell>
                                  <StyledTableCell align="left"><PictureAsPdf /> {row.filename}</StyledTableCell>
                                  <StyledTableCell padding="checkbox">

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
                    {/* <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        // component="div"
                        count={pdfList.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        /> */}
                  </div>
                </Grid>

                <Grid item xs>
                  <div className='contentHolder'>
                    <TableContainer sx={{ maxHeight: 480, mr: 1, ml: 1 }}>
                      <Table
                        aria-labelledby="tableTitle"
                        size='small'
                      >
                        <TableHead>
                          <TableRow>
                            <StyledTableCell padding="checkbox">

                            </StyledTableCell>
                            {htmlColumnName.map((columnName) => (
                              <StyledTableCell
                                key={columnName.id}
                                align='left'
                                padding={columnName.disablePadding ? 'none' : 'normal'}
                                sortDirection={orderBy === columnName.id ? order : false}
                              >
                                <TableSortLabel
                                  active={orderBy === columnName.id}
                                  direction={orderBy === columnName.id ? order : 'asc'}
                                >
                                  <Box sx={{ color: 'white' }}>
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
                            <StyledTableCell padding='checkbox'>
                              <IconButton {...getRootHtmlProps({ className: 'dropzone' })}>
                                <input {...getInputHtmlProps()} />
                                <AddCircleOutline sx={{ color: 'orange' }} />
                              </IconButton>
                            </StyledTableCell>
                          </TableRow>
                        </TableHead>

                        <TableBody>
                          {stableSort(htmlList, getComparator(order, orderBy))
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => {
                              return (
                                <TableRow
                                  hover
                                  tabIndex={-1}
                                  key={row.htmlId}
                                  style={{ cursor: 'pointer' }}
                                >
                                  <StyledTableCell padding="checkbox">

                                  </StyledTableCell>
                                  <StyledTableCell align="left"><AttachEmail /> {row.filename}</StyledTableCell>
                                  <StyledTableCell padding="checkbox">

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
                  </div>
                </Grid>
              </Grid>
            </Paper>
          </div>

        </div>

      </div>
    </Box>
  );

}

export default PatternPage