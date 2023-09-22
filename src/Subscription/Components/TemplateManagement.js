import React, { useEffect, useState } from 'react';
import { adminConfigurationService } from '../../AdminServices/configuration.service';
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
import TableRow from '@mui/material/TableRow';
import { Box } from '@mui/system';
import { Chip, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import { visuallyHidden } from '@mui/utils';
import '../../Styles/AdminPage.css';
import { templateService } from '../../Services/template.service';
import GlobalVariableMatching from '../../TemplateManagementComponents/Components/GlobalVariableMatching';
import { adminAccountService } from '../../AdminServices/account.service';

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
    backgroundColor: "rgb(148, 147, 147)",
    color: theme.palette.common.white,
    padding: 16,
    fontSize: 18,
    fontWeight: 200
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
  backgroundColor: '#FD9A08',
  color: 'white',
  width: 250
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

function TemplateManagement(props) {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [templateList, setTemplateList] = useState([]);
  const [showUpdatePdfTemplate, setShowUpdatePdfTemplate] = useState(false);
  const [templatesID, setTemplatesID] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [openConfirmation, setOpenConfirmation] = useState(false);
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
      .getConfigThroughMerchantID(props.merchantId)
      .then((response) => {
        setTemplateList(response);
        props.setTemplateList(response);
        console.log(response);
      })
      .catch((error) => {

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

  const getActiveTemplate = () => {
    adminAccountService
      .getMerchantThroughID(props.merchantId)
      .then((response) => {
        adminConfigurationService
          .getPdfPathByTemplateID(response.activeTemplateId)
          .then((response) => {
            getPdfFile(response);
          })
          .catch((error) => {
            console.log(error)
          });
        adminConfigurationService
          .getHtmlPathByTemplateID(response.activeTemplateId)
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

  const getPdfFile = (pdfFilePath) => {
    templateService
      .getPdf(pdfFilePath)
      .then((response) => {
        setPdfFile(response);
      })
      .catch((error) => {

        console.log(error.data);
      });
  }

  const getHtmlFile = (htmlFilePath) => {
    templateService
      .getHtml(htmlFilePath)
      .then((response) => {
        setHtmlFile(response);
      })
      .catch((error) => {

        console.log(error.data);
      });

  }

  useEffect(() => {
    getActiveTemplate();
    viewTemplateListOverview();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const handleClickOpen = () => {
    setOpenModal(true);
  }

  const handleClose = () => {
    setOpenModal(false);
  }

  const handleUpdateActiveTemplateID = () => {
    setTemplateAsActive(props.merchantId, templateId);
    setTemplatesID(templateId)
    setOpenConfirmation(false);
  }

  const editTemplateClick = () => {
    if (templateId === "" || templateId === null) {
      setOpenModal(true);
      console.log("Select Template ID");
    }
    else {
      console.log(templateId);
      setOpenConfirmation(false);
      setShowUpdatePdfTemplate(true);
    }

  };

  const handleChangeView = (response) => {
    setShowUpdatePdfTemplate(response);
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

  const backClick = () => {
    window.location.reload(false);
  }

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - templateList.length) : 0;

  return (
    <Box sx={{ width: '100%', height: '100%' }} >
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
        maxWidth={'md'}
        fullWidth
      >

        <DialogTitle id="confirmSetActiveTemplateID">
          {"CONFIRM ACTION FOR SELECTED TEMPLATE"}
        </DialogTitle>
        <DialogContent dividers>
          {"Set selected template as active or update selected template."}
        </DialogContent>
        <DialogActions>
          <Button rounded onClick={handleUpdateActiveTemplateID}>
            Set as Active Template
          </Button>
          <Button rounded onClick={editTemplateClick}>
            Update Template
          </Button>
        </DialogActions>
      </Dialog>

      {showUpdatePdfTemplate ? <GlobalVariableMatching
        templateId={templateId}
        merchantId={props.merchantId}
        currentView={handleChangeView}
      /> : null}

      <div hidden={showUpdatePdfTemplate}>
        <Paper sx={{ maxWidth: '100vw', mb: 2, mt: 4, minHeight: '5vh', backgroundColor: 'transparent' }}>
          <Grid container spacing={1} columns={9}>
            <Grid item xs>
              <div className='contentHolder'>

                <TableContainer className='shadow-md rounded-lg overflow-hidden flex flex-col' sx={{ borderRadius: 2.5, ml: 5, mt: 5, width: '17vw' }}>
                  <Table className='min-w-max border'
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
                              key={index}
                              style={{ cursor: 'pointer' }}
                              onClick={() => { editTemplates(row.templateId, row.emailTemplatePath, row.statementTemplatePath) }}
                            >
                              <div className="grid grid-cols-2 gap-4 text-base items-center w-full p-3  font-medium">
                                
                                {templatesID === row.templateId ? (
                                    <React.Fragment>
                                        <div className='grid justify-items-center text-center text-yellow-orange'>
                                          {row.templateName}
                                        </div>

                                          {templateId === row.templateId ? (
                                            <div className='grid justify-items-center text-base rounded-full p-1 w-24 bg-yellow-orange text-white font-light'>
                                                <button onClick={() => { applyEdit(row.templateId, row.templateId) }}>
                                                    In Use
                                                </button>
                                            </div>
                                          ) : (
                                            <div className='grid justify-items-center text-base rounded-full p-1 w-24 bg-default-gray text-white font-light'>
                                              <button onClick={() => { applyEdit(row.templateId, row.templateId) }}>
                                                Apply
                                              </button>
                                            </div>
                                          )}


                                    </React.Fragment>
                                  ):(
                                    <React.Fragment>
                                      <div className='grid justify-items-center'>
                                        {row.templateName}
                                      </div>
                                        {templateId === row.templateId ? (
                                            <div className='grid justify-items-center text-base rounded-full p-1 w-24 bg-yellow-orange text-white font-light'>
                                                <button onClick={() => { applyEdit(row.templateId, row.templateId) }}>
                                                    In Use
                                                </button>
                                            </div>
                                        ) : (
                                          <div className='grid justify-items-center text-base rounded-full p-1 w-24 bg-default-gray text-white font-light'>
                                            <button onClick={() => { applyEdit(row.templateId, row.templateId) }}>
                                              Apply
                                            </button>
                                          </div>
                                        )}
                                    </React.Fragment>
                                  )}




                              </div>
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

            <Grid item xs>
              <div className='contentHolder'>
                <TableContainer sx={{ height: '65vh', border: 1, borderRadius: 2.5, ml: 1, mr: 1, width: '70vw' }}>
                 
                    


                            <div
                              className="group flex flex-col gap-2 rounded-3xl bg-white  text-black border-b-gray-300 border-2 focus:bg-neutral-400 focus:text-white"
                              tabindex="1"
                            >
                              <div className="flex cursor-pointer items-center justify-between p-5 text-center">
                                <span className='w-full text-xl font-bold'>View PDF</span>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                                  className="w-6 h-6 transition-all text-orange-400 duration-500 group-focus:-rotate-180 ">
                                  <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 5.25l-7.5 7.5-7.5-7.5m15 6l-7.5 7.5-7.5-7.5" />
                                </svg>
                              </div>
                              <div
                                className="invisible 
                                group-focus:bg-white
                                group-focus:text-black
                              
                                h-1/6
                                max-h-0 
                                items-center 
                                opacity-0 
                                transition-all 
                                group-focus:visible 
                                group-focus:max-h-screen 
                                group-focus:opacity-100 
                                group-focus:duration-1000
                                "
                              >

                                <iframe src={`data:application/pdf;base64,${pdfFile}#toolbar=0,zoom=0.75`} width="1320vw" height="570vh"></iframe>
                              </div>
                            </div>
                            <div
                              className="group flex flex-col gap-2 rounded-3xl bg-white  text-black border-b-gray-300 border-2 focus:bg-neutral-400 focus:text-white"
                              tabindex="1"
                            >
                              <div className="flex cursor-pointer items-center justify-between p-5 text-center">
                                <span className='w-full text-xl font-bold'>View HTML</span>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                                  className="w-6 h-6 transition-all text-orange-400 duration-500 group-focus:-rotate-180 ">
                                  <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 5.25l-7.5 7.5-7.5-7.5m15 6l-7.5 7.5-7.5-7.5" />
                                </svg>
                              </div>
                              <div
                                className="invisible 
                                group-focus:bg-white
                                group-focus:text-black
                                h-auto 
                                max-h-0 
                                items-center 
                                opacity-0 
                                transition-all 
                                group-focus:visible 
                                group-focus:max-h-screen 
                                group-focus:opacity-100 
                                group-focus:duration-1000"
                              >

                                <iframe src={`data:text/html;base64,${htmlFile}#toolbar=0`} width="1320vw" height="570vh"
                                ></iframe>
                              </div>
                            </div>

                    </TableContainer>
              </div>
            </Grid>

            {/* <Grid item xs>
              <div className='contentHolder'>
                <TableContainer sx={{ height: '65vh', border: 1, borderRadius: 2.5, mr: 1, ml: 1, width: '35vw' }}>
                  <Table
                    aria-labelledby="tableTitle"
                    size='medium'
                  >
                    <TableBody>
                      <TableRow>
                        <StyledTableCell align='center'>
                          <iframe src={`data:text/html;base64,${htmlFile}#toolbar=0`} width="630vw" height="570vh"
                          ></iframe>
                        </StyledTableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
            </Grid> */}
          </Grid>
          {/* <Grid
            container
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
          >
            <Button
              variant='filled'
              size='small'
              sx={{ borderRadius: 10, width: '8vw', fontSize: 15, backgroundColor: '#FD9A08', color: '#FFFFF' }}
            >
              Edit Template
            </Button>
          </Grid> */}

        </Paper>

        {/* <div className='adminStepperButton'>
          <React.Fragment>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Box sx={{ flex: '1 1 auto' }} />

              <Button
                color="secondary"
                variant="contained"
                onClick={editTemplateClick}
                rounded
              >

                Edit Template
              </Button>
            </Box>
          </React.Fragment>
        </div> */}

      </div>
    </Box>


  )

}

export default TemplateManagement