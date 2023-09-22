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
    TextField,
    Typography,
} from "@mui/material";
import '../../../../Styles/AdminStepper.css';
import React, { useState } from "react";
import MuiButton from "@mui/material/Button";

const columnNames = [
    {
        id: "variables",
        numeric: false,
        disablePadding: true,
        label: "Variables",
    },
    {
        id: "value",
        numeric: true,
        disablePadding: true,
        label: "Value",
    },
];

const rowNames = [
    {
        id: "sendingDate",
        numeric: false,
        disablePadding: true,
        label: "Sending Date",
    },
    {
        id: "dayBeforeDue",
        numeric: true,
        disablePadding: true,
        label: "Day Before Due",
    },
    {
        id: "billingCycleResetDate",
        numeric: true,
        disablePadding: true,
        label: "Billing Cycle Reset Date",
    },
];

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
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

function TransactionVariableMatching(props) {
    const listOfValues = [];

    function addValueToList() {
        const names = rowNames.map(nameValue => {return nameValue.label})

        for(var i = 0; i < names.length; i++) {
            const addToArraylist = ({
                name: names[i],
                data: {
                    source: 'constant',
                    value: ''
                }
            });
            listOfValues.push(addToArraylist);
        }
        return listOfValues;
    }

    const addToList = addValueToList();
    const [values, setValues] = useState(addToList);
    const days = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 
        16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28];

    const handleChange = (index, id, event) => {
        const rowValue = {...values};
    
        const updatTransacVar = values.map(i => { 
            if(id === rowValue[index].name) {
                rowValue[index].data.value = event.target.value
            }
            return i;
        });
        setValues(updatTransacVar);
        props.transactionVariablesData(values);
        console.log(values)
      }

    return(
        <div className='template'>

            <Box className='mainContentBox'>
                <Box className='billHolder'>
                <Paper className="paperHolder">
                    <TableContainer sx={{ maxHeight: 540 }}>
                    <Table
                        sx={{ minWidth: 50 }}
                        aria-labelledby="tableTitle"
                        size="medium"
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
                        {values.map((columnName, index) => {
                            return (
                            <TableRow key={index}>
                        <StyledTableCell
                                key={columnName.id}
                                align="center"
                                padding={columnName.disablePadding ? "none" : "normal"}
                            >
                                {columnName.name}
                            </StyledTableCell>
                        
                        <StyledTableCell align="center">
                    <FormControl fullWidth id="fullWidth" size="small">
                      <Select
                        onChange={event => handleChange(index, columnName.name, event)}
                        value={columnName.data.value}
                        name="value"
                      >
                        {days.map((values) => 
                            <MenuItem value={values}>{values}</MenuItem>
                        )}
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

export default TransactionVariableMatching;