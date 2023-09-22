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
import '../../../../Styles/AdminStepper.css';
import MuiButton from "@mui/material/Button";

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
    fontSize: 16,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 16,
  },
}));

const options = {
  shouldForwardProp: (prop) => prop !== "rounded",
};

const Button = styled(
  MuiButton,
  options
)(({ rounded }) => ({
  borderRadius: rounded ? "24px" : null,
  backgroundColor: "#FD9A08",
}));

function GlobalVariableMatching(props) {
  const headerNames = [...props.headerList];
  const listOfValues = [];

  function addValueToList() {
    for(var i = 0; i < headerNames.length; i++) {
      const addToArraylist = ({
        name: '',
        data: {
          source: 'input',
          header: headerNames[i],
          type: 'string',
          format: 'string'
        },
      });
      listOfValues.push(addToArraylist);
    }
    return listOfValues;
  }

  const addToList = addValueToList();
  const [values, setValues] = useState(addToList);
  console.log(values)

  console.log(listOfValues)

  const handleChange = (index, id, event) => {
    const globalVariables = {...values};
    const updatedGlobalVariables = values.map(i => {
      if(id === globalVariables[index].data.header) {
        globalVariables[index][event.target.name] = event.target.value
      }
    return i;
    })
    setValues(updatedGlobalVariables);
    props.globalVariablesData(values);
  }

  return (
    <div className="template">
      <Box className="mainContentBox">
        <Box className="billHolder">
          <Paper className="paperHolder">
            <TableContainer sx={{ height: 'calc(63.5vh - 80px)' }}>
              <Table
                sx={{ minWidth: 50 }}
                aria-labelledby="tableTitle"
                size="medium"
                stickyHeader
              >
                <TableHead>
                  <TableRow>
                    {columnNames.map((columnName) => (
                      <StyledTableCell
                        key={columnName.id}
                        align="center"
                        padding={columnName.disablePadding ? "none" : "normal"}
                      >
                        {columnName.label}
                      </StyledTableCell>
                    ))}
                    <StyledTableCell/>
                  </TableRow>
                </TableHead>
                <TableBody>
                {values.map((fields, index) => {
                    return (
                    <TableRow key={index}>
                  <StyledTableCell align="center">{fields.data.header}</StyledTableCell>
                  
                  <StyledTableCell align="center">
                    <FormControl fullWidth id="fullWidth" size="small">
                      <Select
                        onChange={(event) =>
                          handleChange(index, fields.data.header, event)
                        }
                        value={fields.name}
                        name="name"
                      >
                        <MenuItem value={"Customer First Name"}>Customer First Name</MenuItem>
                        <MenuItem value={"Customer Middle Name"}>Customer Middle Name</MenuItem>
                        <MenuItem value={"Customer Last Name"}>Customer Last Name</MenuItem>
                        <MenuItem value={"Customer Street Address"}>Customer Street Address</MenuItem>
                        <MenuItem value={"Customer City Address"}>Customer City Address</MenuItem>
                        <MenuItem value={"Customer Region"}>Customer Region</MenuItem>
                        <MenuItem value={"Customer Zip Code"}>Customer Zip Code</MenuItem>
                        <MenuItem value={"Customer Email Address"}>Customer Email Address</MenuItem>
                        <MenuItem value={"Customer Mobile Number"}>Customer Mobile Number</MenuItem>
                        <MenuItem value={"Customer Phone Number"}>Customer Phone Number</MenuItem>
                        <MenuItem value={"Total Amount Due"}>Total Amount Due</MenuItem>
                        <MenuItem value={"Previous Amount Due"}>Previous Amount Due</MenuItem>
                        <MenuItem value={"Previous Amount Paid"}>Previous Amount Paid</MenuItem>
                        <MenuItem value={"Amount Collected"}>Amount Collected</MenuItem>
                        <MenuItem value={"CustomField1"}>CustomField1</MenuItem>
                        <MenuItem value={"CustomField2"}>CustomField2</MenuItem>
                        <MenuItem value={"CustomField3"}>CustomField3</MenuItem>
                        <MenuItem value={"CustomField4"}>CustomField4</MenuItem>
                        <MenuItem value={"CustomField5"}>CustomField5</MenuItem>
                        <MenuItem value={"Account Number"}>Account Number</MenuItem>
                        <MenuItem value={"Invoice Number"}>Invoice Number</MenuItem>
                        <MenuItem value={"Vatable amount"}>Vatable amount</MenuItem>
                        <MenuItem value={"VAT amount"}>VAT amount</MenuItem>
                        <MenuItem value={"Tax exempt amount"}>Tax exempt amount</MenuItem>
                      </Select>
                    </FormControl>
                  </StyledTableCell>
                  <StyledTableCell/>
                  </TableRow>
                  )})}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Box>
      </Box>
    </div>
  );
}

export default GlobalVariableMatching;
