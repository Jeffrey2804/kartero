import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import {
  FormControl,
  Grid,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import "../../Styles/Mapping.css";
import "../../Styles/Template.css";
import samplePdf from "../../Images/samplePDF1.png";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import MuiButton from "@mui/material/Button";
import HTMLMapping from "./HTMLMapping";
import { adminConfigurationService } from "../../AdminServices/configuration.service";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import ExcelPreview from "./ExcelPreview";
import UpdateSMS from "./UpdateSMS";
import { templateService } from "../../Services/template.service";
import TransactionVariableMatching from "./TransactionVariableMatching";
import Stack from '@mui/material/Stack';
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
  shouldForwardProp: (prop) => prop !== "rounded",
};

const ButtonBack = styled(
  MuiButton,
  options
)(({ rounded }) => ({
  borderRadius: rounded ? "24px" : null,
  backgroundColor: "#BCC0C2",
  color: "white",
  width: 150,
}));

const ButtonNext = styled(
  MuiButton,
  options
)(({ rounded }) => ({
  borderRadius: rounded ? "24px" : null,
  backgroundColor: "#FD9A08",
  color: "white",
  width: 150,
}));

function PDFMapping(props) {
  const [showUpdatePdfTemplate, setShowUpdatePdfTemplate] = useState(false);
  const [showUpdateHtmlTemplate, setShowUpdateHtmlTemplate] = useState(false);
  const [showUpdateSmsTemplate, setShowUpdateSms] = useState(false);
  const [showUpdateExcelPreview, setShowUpdateExcelPreview] = useState(false);
  const [showTransactionVariableMatching, setShowTransactionVariableMatching] = useState(false);
  const [customField, setCustomField] = useState("");
  const [pdfFile, setPdfFile] = useState();
  const [templatePath, setTemplatePath] = useState([]);
  const [pdfConfigMap, setPdfConfigMap] = useState([]);
  const [dayOfTheMonth, setDayOfTheMonth] = useState("");
  const daysInAMonth = ['1st', '2nd', '3rd', '4th', '5th', '6th',
    '7th', '8th', '9th', '10th', '11th', '12th', '13th', '14th', '15th',
    '16th', '17th', '18th', '19th', '20th', '21st', '22nd', '23rd', '24th',
    '25th', '26th', '27th', '28th',];
  const choices = [
    "Company Name",
    "Company Address",
    "Company Phone",
    "Company Email",
    "Customer Name",
    "Customer Address",
    "Customer City",
    "Customer Account Number",
    "Current Invoice Number",
    "Current Due Date",
    "Total Amount Due",
    "Current Billing Period",
    "Current Reading Date",
    "Next Reading Date",
    "Previous Unpaid Balance",
    "Previous Invoice Number",
    "Previous Due Date",
    "Penalty Amount Due",
    "Current Amount Due",
    "Previous Meter Reading",
    "Current Meter Reading",
    "Total Consumption",
    "Consumption Rate",
    "Current Billing Amount Due",
    "Overpayment Amount",
    "Overpayment Invoice Number",
  ];

  const getConfigMap = () => {
    adminConfigurationService
      .getConfigMapping(props.templateId)
      .then((response) => {
        setPdfConfigMap(response);
      })
      .catch((error) => { });
  };
  const handleChange = (event) => {
    setDayOfTheMonth(event.target.value);
  };
  const getTemplatePath = () => {
    templateService
      .getPdfPath(props.templateId, props.merchantId)
      .then((response) => {
        templateService
          .getPdf(response)
          .then((response) => {
            setPdfFile(response);
          })
          .catch((error) => {
            console.log(error.data);
          });
      })
      .catch((error) => {
        console.log(error.data);
      });
  };

  useEffect(() => {
    getConfigMap();
    getTemplatePath();
  }, []);

  const updateMappedValue = (index) => (e) => {
    const nameValue = e.target.value;
    setCustomField(nameValue);

    const newArray = pdfConfigMap.map((values, i) => {
      if (index === i) {
        return { ...values, [e.target.name]: e.target.value };
      } else {
        return values;
      }
    });
    setPdfConfigMap(newArray);
  };

  const updateMapping = () => {
    const stringifyValues = JSON.stringify(pdfConfigMap);
    adminConfigurationService.updateMappingConfig(
      props.templateId, stringifyValues
    ).then((response) => {

    }).catch((error) => {

    })
  }

  function showEditPDF() {
    setShowUpdatePdfTemplate(true);
  }

  function showEditHTML() {
    setShowUpdateHtmlTemplate(true);
  }

  function showEditSMS() {
    setShowUpdateSms(true);
  }

  const handleChangeView = (response) => {
    setShowUpdateSms(response);
    setShowUpdatePdfTemplate(response);
    setShowUpdateHtmlTemplate(response);
    setShowUpdateExcelPreview(response);
    setShowTransactionVariableMatching(response);
  };

  const nextClick = () => {
    { updateMapping() };
    window.location.reload(false);
  };

  const backClick = () => {
    setShowTransactionVariableMatching(true);
  };

  return (
    // <div className='template'>
    <Box className="mainContentBox">
      {showUpdateHtmlTemplate ? (
        <HTMLMapping
          templateId={props.templateId}
          merchantId={props.merchantId}
          currentView={handleChangeView}
        />
      ) : null}
      {showUpdateExcelPreview ? (
        <ExcelPreview
          templateId={props.templateId}
          configValues={pdfConfigMap}
          currentView={handleChangeView}
        />
      ) : null}

      {showTransactionVariableMatching ? (
        <TransactionVariableMatching
          templateId={props.templateId}
          currentView={handleChangeView}
        />
      ) : null}

      {showUpdateSmsTemplate ? (
        <UpdateSMS
          templateId={props.templateId}
          merchantId={props.merchantId}
          currentView={handleChangeView}
        />
      ) : null}

      <div hidden={showUpdateHtmlTemplate}>
        <div hidden={showUpdateExcelPreview}>
          <div hidden={showUpdateSmsTemplate}>
            <div hidden={showTransactionVariableMatching}>
              {/* <div className='adminPageContent'> */}
              <Paper
                sx={{
                  minWidth: "60.5vw",
                  minHeight: "70vh",
                  mb: 2,
                  backgroundColor: "transparent",
                }}
              >
                <Typography
                  sx={{
                    mt: 2,
                    mb: 1,
                    py: 1,
                    textAlign: "center",
                    fontSize: 25,
                    fontWeight: "bold",
                  }}
                >
                  Edit PDF Template
                </Typography>
                <Grid container spacing={2} columns={5}>
                  <Grid item xs={1}>
                    <div className="contentHolder">
                      <TableContainer sx={{ maxHeight: 480 }}>
                        <Table sx={{ minWidth: 80 }}>
                          <TableHead>
                            <TableRow>
                              <StyledTableCell align="center">
                                Template
                              </StyledTableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody style={{ cursor: 'pointer' }}>
                            <TableRow>
                              <StyledTableCell align="center" sx={{ color: "#FD9A08", fontWeight: "bold" }}>
                                PDF
                              </StyledTableCell>
                            </TableRow>
                            <TableRow>
                              <StyledTableCell
                                align="center"
                                onClick={() => {
                                  showEditHTML();
                                }}
                                sx={{ color: "#707070", fontWeight: 500 }}
                              >
                                HTML
                              </StyledTableCell>
                            </TableRow>
                            <TableRow>
                              <StyledTableCell
                                align="center"
                                onClick={() => {
                                  showEditSMS();
                                }}
                                sx={{ color: "#707070", fontWeight: 500 }}
                              >
                                SMS
                              </StyledTableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </div>



                    <div className="contentHolder">
                      <TableContainer sx={{ maxHeight: 480 }}>
                        <Table sx={{ minWidth: 80 }}>
                          <TableHead>
                            <TableRow>
                              <StyledTableCell align="center">
                                Sending Schedule
                              </StyledTableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody style={{ cursor: 'pointer' }}>
                            <TableRow>
                              <StyledTableCell align="center" >



                                <Stack spacing={1} direction="column" alignItems="left">

                                  <div className='titleComponent' sx={{ color: "#707070", fontWeight: "bold" }}>Monthly Sending Day</div>

                                  <Grid
                                    container
                                    direction="row"
                                    justifyContent="left"
                                    alignItems="left"
                                  >
                                    <Grid container spacing={2}>
                                      <Grid item xs={6} md={8}>
                                        <div>Emails will be sent gradually starting from that date.</div>
                                      </Grid>
                                      <Grid item xs={6} md={4}>
                                        <Select
                                          labelId="demo-simple-select-label"
                                          id="demo-simple-select"
                                          value={dayOfTheMonth}
                                          label="Day Of the Month"
                                          onChange={handleChange}
                                        >
                                          {daysInAMonth.map(function (object, i) {
                                            return <MenuItem value={i + 1}>{object}</MenuItem>;
                                          })

                                          }

                                        </Select>
                                      </Grid>
                                    </Grid>

                                  </Grid>

                                </Stack>
                              </StyledTableCell>
                            </TableRow>
                            <TableRow>
                              <StyledTableCell
                                align="center"


                              >


                                <Stack spacing={1} direction="column" alignItems="left">

                                  <div className='titleComponent'
                                    sx={{ color: "#707070", fontWeight: "bold" }}>
                                    Monthly Due Day
                                  </div>

                                  <Grid
                                    container
                                    direction="row"
                                    justifyContent="left"
                                    alignItems="left"
                                  >
                                    <Grid container spacing={2}>
                                      <Grid item xs={6} md={8}>
                                        <div>Payments will be due on the next monthly due day
                                          following the monthly sending day.
                                        </div>
                                      </Grid>
                                      <Grid item xs={6} md={4}>
                                        <Select
                                          labelId="demo-simple-select-label"
                                          id="demo-simple-select"
                                          value={dayOfTheMonth}
                                          label="Day Of the Month"
                                          onChange={handleChange}
                                        >
                                          {daysInAMonth.map(function (object, i) {
                                            return <MenuItem value={i + 1}>{object}</MenuItem>;
                                          })
                                          }
                                        </Select>
                                      </Grid>
                                    </Grid>
                                  </Grid>




                                </Stack>
                              </StyledTableCell>
                            </TableRow>

                          </TableBody>
                        </Table>
                      </TableContainer>
                    </div>
                  </Grid>

                  <Grid item>
                    <div className="contentHolder">
                      {/* <img  src={samplePdf} /> */}
                      <iframe
                        src={`data:application/pdf;base64,${pdfFile}#toolbar=0`}
                        width="600vw"
                        height="550vh"
                      ></iframe>
                    </div>
                  </Grid>

                  <Grid item xs>
                    <div className="contentHolder">
                      <TableContainer sx={{ maxHeight: 550 }}>
                        <Table stickyHeader sx={{ minWidth: 100 }}>
                          <TableHead>
                            <TableRow>
                              <StyledTableCell align="center">
                                PDF Text Fields
                              </StyledTableCell>
                              <StyledTableCell align="center">
                                Mapped Headers
                              </StyledTableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {pdfConfigMap
                              .filter((values) => values.statementField !== "")
                              .filter((values) => values.statementField !== null)
                              .filter((values) => values.data.source === "input")
                              .map((fields, index) => (
                                <TableRow key={index}>
                                  <StyledTableCell align="center">
                                    {fields.statementField}
                                  </StyledTableCell>
                                  <StyledTableCell align="center">
                                    <FormControl
                                      fullWidth
                                      id="fullWidth"
                                      size="small"
                                    >
                                      <Select
                                        onChange={updateMappedValue(index)}
                                        value={fields.name}
                                        name="name"
                                      >
                                        <MenuItem value={"Customer First Name"}>
                                          Customer First Name
                                        </MenuItem>
                                        <MenuItem value={"Customer Middle Name"}>
                                          Customer Middle Name
                                        </MenuItem>
                                        <MenuItem value={"Customer Last Name"}>
                                          Customer Last Name
                                        </MenuItem>
                                        <MenuItem
                                          value={"Customer Street Address"}
                                        >
                                          Customer Street Address
                                        </MenuItem>
                                        <MenuItem value={"Customer City Address"}>
                                          Customer City Address
                                        </MenuItem>
                                        <MenuItem value={"Customer Region"}>
                                          Customer Region
                                        </MenuItem>
                                        <MenuItem value={"Customer Zip Code"}>
                                          Customer Zip Code
                                        </MenuItem>
                                        <MenuItem
                                          value={"Customer Email Address"}
                                        >
                                          Customer Email Address
                                        </MenuItem>
                                        <MenuItem
                                          value={"Customer Mobile Number"}
                                        >
                                          Customer Mobile Number
                                        </MenuItem>
                                        <MenuItem value={"Customer Phone Number"}>
                                          Customer Phone Number
                                        </MenuItem>
                                        <MenuItem
                                          value={"Customer Telephone Number"}
                                        >
                                          Customer Telephone Number
                                        </MenuItem>
                                        <MenuItem value={"Total Amount Due"}>
                                          Total Amount Due
                                        </MenuItem>
                                        <MenuItem value={"Previous Amount Due"}>
                                          Previous Amount Due
                                        </MenuItem>
                                        <MenuItem value={"Previous Amount Paid"}>
                                          Previous Amount Paid
                                        </MenuItem>
                                        <MenuItem value={"Amount Collected"}>
                                          Amount Collected
                                        </MenuItem>
                                        <MenuItem value={"CustomField1"}>
                                          CustomField1
                                        </MenuItem>
                                        <MenuItem value={"CustomField2"}>
                                          CustomField2
                                        </MenuItem>
                                        <MenuItem value={"CustomField3"}>
                                          CustomField3
                                        </MenuItem>
                                        <MenuItem value={"CustomField4"}>
                                          CustomField4
                                        </MenuItem>
                                        <MenuItem value={"CustomField5"}>
                                          CustomField5
                                        </MenuItem>
                                        <MenuItem value={"Account Number"}>
                                          Account Number
                                        </MenuItem>
                                        <MenuItem value={"Invoice Number"}>
                                          Invoice Number
                                        </MenuItem>
                                        <MenuItem
                                          value={
                                            "Vatable amount" || "vatAble Amount"
                                          }
                                        >
                                          Vatable amount
                                        </MenuItem>
                                        <MenuItem
                                          value={"VAT amount" || "vat Amount"}
                                        >
                                          VAT amount
                                        </MenuItem>
                                        <MenuItem value={"Tax exempt amount"}>
                                          Tax exempt amount
                                        </MenuItem>
                                      </Select>
                                    </FormControl>
                                  </StyledTableCell>
                                </TableRow>
                              ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </div>
                  </Grid>
                </Grid>

                <div className="adminStepperButton">
                  <React.Fragment>
                    <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                      <ButtonBack
                        variant="dashed"
                        className="adminButtonBack"
                        onClick={backClick}
                        rounded
                      >
                        Back
                      </ButtonBack>

                      <Box sx={{ flex: "1 1 auto" }} />

                      <ButtonNext variant="dashed" onClick={nextClick} rounded>
                        Save Changes
                      </ButtonNext>
                    </Box>
                  </React.Fragment>
                </div>
              </Paper>
            </div>
          </div>
        </div>
      </div>
    </Box>
  );
}

export default PDFMapping;
