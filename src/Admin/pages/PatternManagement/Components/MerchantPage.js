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
import { BorderColor, Delete, Download, Email, Payment, PeopleAlt, Sms } from '@mui/icons-material';
import { Chip, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import { adminConfigurationService } from '../../../../AdminServices/configuration.service';
import { useNavigate } from 'react-router-dom';
import OnboardMapStepper from '../../OnboardMap/Components/OnboardMapStepper';
import PdfMapping from './IndividualUpdateMappingPage/PdfMapping';
import HTMLMapping from './IndividualUpdateMappingPage/HTMLMapping';
import samplePDF from '../../../../Images/samplePDF1.png';
import sampleHTML from '../../../../Images/email.png';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import { adminAccountService } from '../../../../AdminServices/account.service';
import { templateService } from '../../../../Services/template.service';
import { adminTemplateService } from '../../../../AdminServices/template.service';
import GlobalVariableMatching from '../../../../TemplateManagementComponents/Components/GlobalVariableMatching';


const columnNames = [
  {
    id: 'templateId',
    numeric: false,
    disablePadding: true,
    label: 'Templates'
  },
]

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor:  "rgb(148, 147, 147)",
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

function MerchantPage(props) {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [value, setValue] = React.useState('female');
  const navigate = useNavigate();
  const [templateList, setTemplateList] = useState([]);
  const [showCreateTemplate, setShowCreateTemplate] = useState(false);
  const [showUpdatePdfTemplate, setShowUpdatePdfTemplate] = useState(false);
  const [showUpdateHtmlTemplate, setShowUpdateHtmlTemplate] = useState(false);
  const [showUpdateSmsTemplate, setShowUpdateSms] = useState(false);
  const [templatesID, setTemplatesID] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [merchantData, setMerchantData] = useState([]);
  const [templateId, setTemplateId] = useState(null);

  const [pdfFile, setPdfFile] = useState();
  const [htmlFile, setHtmlFile] = useState();

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const viewTemplateListOverview = () => {
    adminConfigurationService
      .getConfigThroughMerchantID(props.selectedStatemendId)
      .then((response) => {
        setTemplateList(response);
        props.setTemplateList(response);
      })
      .catch((error) => {

      });
  }

  const getActiveTemplate = () => {
    adminAccountService
      .getMerchantThroughID(props.selectedStatemendId)
      .then((response) => {
        adminConfigurationService
          .getPdfPathByTemplateID(response.activeTemplateId, props.selectedStatemendId)
          .then((response) => {
            getPdfFile(response);
          })
          .catch((error) => {
            console.log(error)
          });
        adminConfigurationService
          .getHtmlPathByTemplateID(response.activeTemplateId, props.selectedStatemendId)
          .then((response) => {
            getHtmlFile(response);
          })
          .catch((error) => {
            console.log(error)
          });
        setTemplatesID(response.activeTemplateId);
      })
      .catch((error) => {
        console.log(error)
      });
  }

  const getMerchantData = () => {
    adminAccountService
      .getMerchantThroughID(props.selectedStatemendId)
      .then((response) => {
        setMerchantData(response);
      })
      .catch((error) => {

      });
  }

  const getPdfFile = (pdfFilePath) => {
    adminTemplateService
      .getPdf(pdfFilePath)
      .then((response) => {
        setPdfFile(response);
      })
      .catch((error) => {

        console.log(error.data);
      });
  }

  const getHtmlFile = (htmlFilePath) => {
    adminTemplateService
      .getHtml(htmlFilePath)
      .then((response) => {
        setHtmlFile(response);
      })
      .catch((error) => {

        console.log(error.data);
      });

  }

  const setTemplateAsActive = (merchantID, templateID) => {
    adminAccountService
      .updateActiveTemplate(merchantID, templateID)
      .then((response) => {
      })
      .catch((error) => {

        console.log(error.data);
      });
  }

  const test = () => {
    adminConfigurationService
      .initializeDatabase(props.selectedStatemendId)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {

        console.log(error.data);
      });
  }

  useEffect(() => {
    getMerchantData();
    getActiveTemplate();
    viewTemplateListOverview();
    test();
  }, [props.statementId]);

  const merchantInfo = Object.keys(merchantData).map((key) => {
    return (
      merchantData[key]
    )
  });

  const listForAccountVerification = [merchantInfo[2], merchantInfo[4], merchantInfo[9], merchantInfo[11], merchantInfo[15]];

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  function createTemplateClick() {
    setShowCreateTemplate(true);
  };

  const handleClickOpen = () => {
    setOpenModal(true);
  }

  const handleClose = () => {
    setOpenModal(false);
  }

  const handleUpdateActiveTemplateID = () => {
    setTemplateAsActive(props.selectedStatemendId, templateId);
    setTemplatesID(templateId);
    setOpenConfirmation(false);
  }

  const editTemplateClick = () => {
    if (templateId === "" || templateId === null) {
      setOpenModal(true);
      console.log("Select Template ID");
    }
    else {
      setOpenConfirmation(false);
      setShowUpdatePdfTemplate(true);
    }

  };

  const editTemplates = (templateID, htmlFilePath, pdfFilePath) => {
    setTemplatesID(templateID);
    getPdfFile(pdfFilePath);
    getHtmlFile(htmlFilePath);
  }

  const applyEdit = (id) => {
    setOpenConfirmation(true);
    setTemplateId(id);
  }

  function updateHtmlClick() {
    setShowUpdateHtmlTemplate(true);
  };

  function updateSmsClick() {
    setShowUpdateSms(true);
  };

  function previousClick() {
    window.location.reload(false);
  };

  const handleChangeView = (response) => {
    setShowCreateTemplate(response);
    setShowUpdatePdfTemplate(response);
    setShowUpdateHtmlTemplate(response);
  };

  const backClick = () => {
    window.location.reload(false);
  }

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - templateList.length) : 0;

  return (
    <Box sx={{ width: '100%' }} >
      <Dialog
        aria-label="dialog-title"
        open={openModal}
        onClose={handleClose}
      >

        <DialogTitle id="dialog-title">
          {"Template ID is null. Select Template ID."}
        </DialogTitle>
      </Dialog>

      <Dialog
        aria-label="confirmSetActiveTemplateID"
        open={openConfirmation}
        onClose={handleClose}
      >

        <DialogTitle id="confirmSetActiveTemplateID">
          {"CONFIRM ACTION FOR SELECTED TEMPLATE"}
        </DialogTitle>
        <DialogContent dividers>
          {"Set selected template as active or update selected template."}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUpdateActiveTemplateID}>
            Set as active template
          </Button>
          <Button onClick={editTemplateClick}>
            Update template
          </Button>
        </DialogActions>
      </Dialog>

      <div hidden={showUpdateHtmlTemplate}>
        <div className='adminPage'>
          {showUpdatePdfTemplate ? <GlobalVariableMatching
            templateId={templateId}
            merchantId={props.selectedStatemendId}
            currentView={handleChangeView}
          /> : null}

          <div hidden={showUpdatePdfTemplate}>

            {showCreateTemplate ? <OnboardMapStepper
              merchantValues={listForAccountVerification}
              merchantID={props.selectedStatemendId}
              currentView={handleChangeView}
            /> : null}
            <div hidden={showCreateTemplate}>
              <div className='adminPageHeader'>
                <Paper sx={{ width: '70.5vw', mb: 2, backgroundColor: '#f5f5f5' }} elevation={0}>
                  <div className='adminStepperButton'>
                    <React.Fragment>
                      <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                        <div className='title'>
                          <label onClick={() => { previousClick(); }}>
                            Merchant
                          </label>
                        </div>
                        <Box sx={{ flex: '1 1 auto' }} />
                        <Button
                          color="secondary"
                          variant="contained" size="large" disableElevation rounded
                          onClick={() => { createTemplateClick(); }}
                        >
                          + Create Template
                        </Button>
                      </Box>
                    </React.Fragment>
                  </div>
                </Paper>
              </div>

              <div className='adminPageContent'>
                <Paper sx={{ width: '70.5vw', mb: 2, mt: 4, minHeight: '5vh', backgroundColor: 'transparent' }}>
                  <Stack
                    direction="column"
                    justifyContent="left"
                    alignItems="left"
                    spacing={4}
                  >
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                      <Grid item xs={4}>
                        {/* <div className='contentHolder'> */}
                        <TableContainer sx={{ maxHeight: 540, borderRadius: 2.5, ml: 5, mt: 5, width: '15vw' }}>
                          <Table
                            // sx={{ width: '350px' }}
                            aria-labelledby="tableTitle"
                            size='small'>
                            <EnhancedTableHead
                              numSelected={selected.length}
                              order={order}
                              orderBy={orderBy}
                              onRequestSort={handleRequestSort}
                            />

                            <TableBody>
                              {stableSort(templateList, getComparator(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                  const isItemSelected = isSelected(row.name);
                                  const labelId = `enhanced-table-checkbox-${index}`;

                                  return (
                                    <TableRow
                                      hover
                                      tabIndex={-1}
                                      key={row.name}
                                      style={{ cursor: 'pointer' }}
                                      onClick={(event) => editTemplates(row.templateId, row.emailTemplatePath, row.statementTemplatePath)}
                                    >

                                      {/* <StyledTableCell align="center">{row.templateId}</StyledTableCell> */}
                                      <StyledTableCell align="center">
                                        {templatesID === row.templateId ? (
                                          <Stack
                                            direction="column"
                                            justifyContent="left"
                                            alignItems="left"
                                            spacing={4}
                                          >

                                            <Box sx={{ width: '12vw' }}>
                                              <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                                <Grid item xs={6}>
                                                  <Typography sx={{ color: '#FD9A08', fontFamily: 'Segoe UI', fontWeight: 'bold' }}>
                                                    {row.templateName}
                                                  </Typography>
                                                </Grid>
                                                <Grid item xs={6}>
                                                  {templateId === row.templateId ? (
                                                    <Button
                                                      variant='filledTonal'
                                                      size='small'
                                                      sx={{ borderRadius: 10, width: '5vw', fontSize: 12, backgroundColor: '#FD9A08', color: '#FFFFF' }}
                                                      onClick={() => { applyEdit(row.templateId, row.templateId) }}>In Use</Button>
                                                  ) : (
                                                    <Button
                                                      variant='filledTonal'
                                                      size='small'
                                                      sx={{ borderRadius: 10, width: '5vw', fontSize: 12, backgroundColor: '#979797', color: '#FFFFF' }}
                                                      onClick={() => { applyEdit(row.templateId, row.templateId) }}>Apply</Button>
                                                  )}
                                                </Grid>
                                              </Grid>
                                            </Box>
                                          </Stack>
                                        ) : (
                                          <Stack
                                            direction="column"
                                            justifyContent="left"
                                            alignItems="left"
                                            spacing={4}
                                          >

                                            <Box sx={{ display: 'flex', flexWrap: 'wrap', '& > :not(style)': { m: 1, ml: 2 }, }}>
                                              <Typography sx={{ color: '#707070', fontFamily: 'Segoe UI', fontWeight: 500 }}>
                                              {row.templateName}
                                              </Typography>
                                              {templateId === row.templateId ? (
                                                <Button
                                                  variant='filledTonal'
                                                  size='small'
                                                  sx={{ borderRadius: 10, width: '5vw', fontSize: 12, backgroundColor: '#FD9A08', color: '#FFFFF' }}
                                                >In Use</Button>
                                              ) : (
                                                <Button
                                                  variant='filledTonal'
                                                  size='small'
                                                  sx={{ borderRadius: 10, width: '5vw', fontSize: 12, backgroundColor: '#979797', color: '#FFFFF' }}
                                                >Apply</Button>
                                              )}
                                            </Box>
                                          </Stack>
                                        )}
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
                        {/* </div> */}
                      </Grid>

                      <Grid item xs={4}>
                        {/* <div className='contentHolder'> */}
                        <TableContainer sx={{ maxHeight: 480, border: 1, borderRadius: 2.5, ml: 1, mr: 1, width: '25vw' }}>
                          <Table
                            aria-labelledby="tableTitle"
                            size='medium'
                          >
                            <TableBody>
                              <TableRow>
                                <StyledTableCell align='center'>
                                  <iframe src={`data:application/pdf;base64,${pdfFile}#toolbar=0`} width="420vw" height="570vh"></iframe>
                                </StyledTableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </TableContainer>
                        {/* </div> */}
                      </Grid>

                      <Grid item xs={4}>
                        {/* <div className='contentHolder'> */}
                        <TableContainer sx={{ maxHeight: 480, border: 1, borderRadius: 2.5, ml: 1, mr: 1, width: '25vw' }}>
                          <Table
                            aria-labelledby="tableTitle"
                            size='medium'
                          >
                            <TableBody>
                              <TableRow>
                                <StyledTableCell align='center'>
                                  <iframe src={`data:text/html;base64,${htmlFile}#toolbar=0`} width="420vw" height="570vh"
                                  ></iframe>
                                </StyledTableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </TableContainer>
                        {/* </div> */}
                      </Grid>
                    </Grid>
                  </Stack>
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
                      <KeyboardArrowLeft />
                      Back
                    </Button>

                  </Box>
                  {/* <Box sx={{ flex: '1 1 auto' }} />

                                <Button
                                color="secondary"
                                variant="dashed"
                                onClick={editTemplateClick}
                                // disabled={true}
                                >

                                Edit Template
                                <KeyboardArrowRight />
                                </Button>
                            </Box> */}
                </React.Fragment>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Box>
  )
}

export default MerchantPage