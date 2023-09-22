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
import React, { useEffect, useState } from "react";
import '../../../../Styles/AdminStepper.css';
import MuiButton from "@mui/material/Button";
import data from '../../Validations/dataValidation.json';

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
  // {
  //   id: "dataType",
  //   numeric: false,
  //   disablePadding: true,
  //   label: "Data Type",
  // },
  // {
  //   id: "format",
  //   numeric: true,
  //   disablePadding: true,
  //   label: "Format",
  // },
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

function GlobalVariableMatchingv2(props) {
  const headerNames = [...props.headerList];
  const listOfValues = [];
  const [values, setValues] = useState([]);

  function addValueToList() {
    for (var i = 0; i < headerNames.length; i++) {
      const addToArraylist = ({
        name: '',
        type: '',
        format: '',
        globalVariableId:'',
        data: {
          source: 'input',
          header: headerNames[i],

        },
      });
      listOfValues.push(addToArraylist);
    }
    return listOfValues;
  }

  const addToList = addValueToList();
  useEffect(() => {
    setValues(addToList);
  }, [listOfValues.length]);


  const handleChange = (index, id, event) => {
    const globalVariables = { ...values };
    const updatedGlobalVariables = values.map(i => {
      if (id === globalVariables[index].data.header) {
        globalVariables[index][event.target.name] = event.target.value
      }
      return i;
    })
    setValues(updatedGlobalVariables);

    const globalVariableValues = values.map((mappedValues) => {

      return (
        {
          name: mappedValues.name,
          globalVariableId: mappedValues.id,
          statementField: mappedValues.data.header,
          data: {
            source: mappedValues.data.source,
            header: mappedValues.data.header,
            // type: mappedValues.type,
            // format: mappedValues.format,
          }
        })
    });
    props.metaDataHeader(globalVariableValues);
  }

  const getFormat = (dataType) => {
    const formatLists = data.filter((type) => type.dataType === dataType)
      .map((availableFormats) => (
        availableFormats.formats
      ))
    return formatLists[0]
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
                    <StyledTableCell />
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
                              {props.globalVariablesList.map((globalVariable) => (
                                <MenuItem value={globalVariable.id}>{globalVariable.name}</MenuItem>



                              ))}

                            </Select>
                          </FormControl>
                        </StyledTableCell>
                        {/* <StyledTableCell align='center'>
                          <FormControl fullWidth id='fullWidth' size="small">
                            <Select
                              onChange={event => handleChange(index, fields.data.header, event)}
                              value={fields.type}
                              name="type">
                              {data.map((dataTypes) => (
                                <MenuItem value={dataTypes.dataType}>{dataTypes.dataType}</MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </StyledTableCell>
                        <StyledTableCell align='center'>
                          {fields.type === "Numeric" || fields.type === '' ? (
                            <FormControl fullWidth id='fullWidth' size="small" disabled>
                              <Select
                                onChange={event => handleChange(index, fields.data.header, event)}
                                value={fields.format}
                                name="format">
                              </Select>
                            </FormControl>
                          ) : (
                            <FormControl fullWidth id='fullWidth' size="small">
                              <Select
                                onChange={event => handleChange(index, fields.data.header, event)}
                                value={fields.format}
                                name="format">
                                {getFormat(fields.type).map((formatList) => (
                                  <MenuItem value={formatList.formatType}>{formatList.formatType}</MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                          )}
                        </StyledTableCell> */}
                        <StyledTableCell />
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Box>
      </Box>
    </div>
  );
}

export default GlobalVariableMatchingv2;
