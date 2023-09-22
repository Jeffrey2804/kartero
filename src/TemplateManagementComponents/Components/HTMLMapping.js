import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
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
import samplePdf from "../../Images/email.png";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import MuiButton from "@mui/material/Button";
import { adminConfigurationService } from "../../AdminServices/configuration.service";
import PDFMapping from "./PDFMapping";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import { element } from "prop-types";
import ExcelPreview from "./ExcelPreview";
import UpdateSMS from "./UpdateSMS";
import { templateService } from "../../Services/template.service";
import TransactionVariableMatching from "./TransactionVariableMatching";

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

function HTMLMapping(props) {
  const [htmlConfigMap, setHtmlConfigMap] = useState([]);
  const [statementValues, setStatementValues] = useState();
  const [showUpdatePdfTemplate, setShowUpdatePdfTemplate] = useState(false);
  const [showUpdateHtmlTemplate, setShowUpdateHtmlTemplate] = useState(false);
  const [showUpdateSmsTemplate, setShowUpdateSms] = useState(false);
  const [showTransactionVariableMatching, setShowTransactionVariableMatching] =
    useState(false);
  const [showUpdateExcelPreview, setShowUpdateExcelPreview] = useState(false);
  const [htmlFile, setHtmlFile] = useState();

  const getConfigMap = () => {
    adminConfigurationService
      .getConfigMapping(props.templateId)
      .then((response) => {
        setHtmlConfigMap(response);
        console.log(response);
      })
      .catch((error) => {});
  };

  const getHtmlFile = () => {
    templateService
      .getHtmlPath(props.templateId)
      .then((response) => {
        templateService
          .getHtml(response)
          .then((response) => {
            setHtmlFile(response);
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
    getHtmlFile();
  }, []);

  const updateMappedValue = (index) => (e) => {
    const newArray = htmlConfigMap.map((values, i) => {
      if (index === i) {
        return { ...values, [e.target.name]: e.target.value };
      } else {
        return values;
      }
    });
    setHtmlConfigMap(newArray);
  };

  const updateMapping = () => {
    const stringifyValues = JSON.stringify(htmlConfigMap);
    adminConfigurationService
      .updateMappingConfig(props.templateId, stringifyValues)
      .then((response) => {})
      .catch((error) => {});
  };

  const results = htmlConfigMap.filter((element) => {
    return element.emailPlaceholder !== null;
  });

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

  const backClick = () => {
    // window.location.reload(false);
    setShowTransactionVariableMatching(true);
  };

  const nextClick = () => {
    {
      updateMapping();
    }
    window.location.reload(false);
  };

  return (
    // <div className='template'>
    <Box className="mainContentBox">
      {showUpdatePdfTemplate ? (
        <PDFMapping
          templateId={props.templateId}
          currentView={handleChangeView}
        />
      ) : null}

      {showUpdateExcelPreview ? (
        <ExcelPreview
          templateId={props.templateId}
          configValues={htmlConfigMap}
          currentView={handleChangeView}
        />
      ) : null}

      {showUpdateSmsTemplate ? (
        <UpdateSMS
          templateId={props.templateId}
          currentView={handleChangeView}
        />
      ) : null}

      {showTransactionVariableMatching ? (
        <TransactionVariableMatching
          templateId={props.templateId}
          currentView={handleChangeView}
        />
      ) : null}

      <div hidden={showUpdatePdfTemplate}>
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
                  Edit HTML Template
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
                          <TableBody style={{ cursor: "pointer" }}>
                            <TableRow>
                              <StyledTableCell
                                align="center"
                                onClick={() => {
                                  showEditPDF();
                                }}
                                sx={{ color: "#707070", fontWeight: 500 }}
                              >
                                PDF
                              </StyledTableCell>
                            </TableRow>
                            <TableRow>
                              <StyledTableCell
                                align="center"
                                sx={{ color: "#FD9A08", fontWeight: "bold" }}
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
                  </Grid>

                  <Grid item>
                    <div className="contentHolder">
                      {/* <img  src={samplePdf} /> */}
                      <iframe
                        src={`data:text/html;base64,${htmlFile}#toolbar=0`}
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
                                Headers
                              </StyledTableCell>
                              <StyledTableCell align="center">
                                Mapped Headers
                              </StyledTableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {htmlConfigMap
                              .filter(
                                (values) => values.emailPlaceholder !== null
                              )
                              .filter(
                                (values) => values.emailPlaceholder !== ""
                              )
                              .filter(
                                (values) => values.data.source === "input"
                              )
                              .map((fields, index) => (
                                <TableRow key={index.toString}>
                                  <StyledTableCell align="center">
                                    {fields.emailPlaceholder}
                                  </StyledTableCell>
                                  <StyledTableCell align="center">
                                    {/* <TextField fullWidth id='fullWidth' size='small'
                                                        name="name"
                                                        value={fields.name}
                                                        onChange={updateMappedValue(index)}
                                                    /> */}
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
                                        <MenuItem
                                          value={"Customer Middle Name"}
                                        >
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
                                        <MenuItem
                                          value={"Customer City Address"}
                                        >
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
                                        <MenuItem
                                          value={"Customer Phone Number"}
                                        >
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
                                        <MenuItem
                                          value={"Previous Amount Paid"}
                                        >
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
    // </div>
  );
}

export default HTMLMapping;
