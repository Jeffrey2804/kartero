import {
  Box,
  FormControl,
  MenuItem,
  Paper,
  Select,
  styled,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import MuiButton from "@mui/material/Button";
import { adminConfigurationService } from "../../AdminServices/configuration.service";
import { useEffect } from "react";
import TemplateManagement from "../../Subscription/Components/TemplateManagement";
import TransactionVariableMatching from "./TransactionVariableMatching";

const columnNames = [
  {
    id: "headers",
    numeric: false,
    disablePadding: true,
    label: "Headers",
  },
  {
    id: "fields",
    numeric: true,
    disablePadding: true,
    label: "Fields",
  },
];

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
  width: 100,
}));

const ButtonNext = styled(
  MuiButton,
  options
)(({ rounded }) => ({
  borderRadius: rounded ? "24px" : null,
  backgroundColor: "#FD9A08",
  color: "white",
  width: 100,
}));

function GlobalVariableMatching(props) {
  const [mappingConfig, setMappingConfig] = useState([]);
  const [showTemplateManagement, setShowTemplateManagement] = useState(false);
  const [showTransactionVariableMatching, setTransactionVariableMatching] =
    useState(false);

  const getConfigMap = () => {
    adminConfigurationService
      .getConfigMapping(props.templateId)
      .then((response) => {
        setMappingConfig(response);
      })
      .catch((error) => {
        console.log(error.data);
      });
  };

  useEffect(() => {
    getConfigMap();
  }, []);

  const nextClick = () => {
    setTransactionVariableMatching(true);
  };

  const backClick = () => {
    setShowTemplateManagement(true);
  };

  const handleChangeView = (response) => {
    setTransactionVariableMatching(response);
    setShowTemplateManagement(response);
  };

  return (
    //   <div className="template">
    <Box className="mainContentBox">
      {showTemplateManagement ? (
        <TemplateManagement
          merchantId={props.merchantId}
          currentView={handleChangeView}
        />
      ) : null}

      {showTransactionVariableMatching ? (
        <TransactionVariableMatching
          templateId={props.templateId}
          merchantId={props.merchantId}
          currentView={handleChangeView}
        />
      ) : null}
      {/* <Box className="billHolder"> */}
      <div hidden={showTemplateManagement}>
        <div hidden={showTransactionVariableMatching}>
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
              Global Variable Matching
            </Typography>
            <TableContainer sx={{ maxHeight: 540 }}>
              <Table
                sx={{ minWidth: 50 }}
                aria-labelledby="tableTitle"
                size="small"
              >
                <TableHead>
                  <TableRow>
                    <StyledTableCell padding="checkbox" />
                    {columnNames.map((columnName) => (
                      <StyledTableCell
                        key={columnName.id}
                        align="left"
                        padding={columnName.disablePadding ? "none" : "normal"}
                      >
                        {columnName.label}
                      </StyledTableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {mappingConfig
                    .filter((values) => values.data.source === "input")
                    .map((fields, index) => {
                      return (
                        <TableRow key={index}>
                          <StyledTableCell padding="checkbox" />
                          <StyledTableCell>
                            {fields.data.header}
                          </StyledTableCell>

                          <StyledTableCell>
                            <FormControl fullWidth id="fullWidth" size="small">
                              <Select
                                //   onChange={(event) =>
                                //     handleChange(index, fields.data.header, event)
                                //   }
                                disabled="true"
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
                                <MenuItem value={"Customer Street Address"}>
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
                                <MenuItem value={"Customer Email Address"}>
                                  Customer Email Address
                                </MenuItem>
                                <MenuItem value={"Customer Mobile Number"}>
                                  Customer Mobile Number
                                </MenuItem>
                                <MenuItem value={"Customer Phone Number"}>
                                  Customer Phone Number
                                </MenuItem>
                                <MenuItem value={"Customer Telephone Number"}>
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
                                  value={"Vatable amount" || "vatAble Amount"}
                                >
                                  Vatable amount
                                </MenuItem>
                                <MenuItem value={"VAT amount" || "vat Amount"}>
                                  VAT amount
                                </MenuItem>
                                <MenuItem value={"Tax exempt amount"}>
                                  Tax exempt amount
                                </MenuItem>
                              </Select>
                            </FormControl>
                          </StyledTableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>

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
                    Next
                  </ButtonNext>
                </Box>
              </React.Fragment>
            </div>
          </Paper>
        </div>
      </div>
    </Box>
    //     </Box>
    //   </div>
  );
}

export default GlobalVariableMatching;
