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
import React from "react";
import MuiButton from "@mui/material/Button";
import { adminConfigurationService } from "../../AdminServices/configuration.service";
import { useEffect } from "react";
import PDFMapping from "./PDFMapping";
import GlobalVariableMatching from "./GlobalVariableMatching";
import { useState } from "react";

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
    backgroundColor: '#BCC0C2',
    color: 'white',
    width: 100
  }));

  const ButtonNext = styled(
    MuiButton,
    options,
    )(({ rounded }) => ({
    borderRadius: rounded ? '24px' : null,
    backgroundColor: '#FD9A08',
    color: 'white',
    width: 100
    }));

function TransactionVariableMatching(props) {
    const [mappingConfig, setMappingConfig] = useState([]);
    const [showEditPDF, setShowEditPDF] = useState(false);
    const [showGlobalVariableMatching, setShowGlobalVariableMatching] = useState(false);

    const getConfigMap = () => {
        adminConfigurationService
            .getConfigMapping(props.templateId)
            .then((response) => {
                setMappingConfig(response);
            })
            .catch((error) => {
                console.log(error.data);
            })
    }

    useEffect(() => {
        getConfigMap();
    }, []);

    const nextClick = () => {
        setShowEditPDF(true);
    }

    const backClick = () => {
        setShowGlobalVariableMatching(true);
    }

    const handleChangeView = (response) => {
        setShowEditPDF(response);
        setShowGlobalVariableMatching(response);
    };

    const updateMappedValue = (index) => (e) => {
        const newArray = mappingConfig.map((values, i) => {
            if(index === values.name) {
                return {...values, [e.target.name]: e.target.value};
            } else {
                return values;
            }
        });
        setMappingConfig(newArray);
    };

    return(
        // <div className='template'>

            <Box className='mainContentBox'>
                {showEditPDF ? <PDFMapping
                templateId = {props.templateId}
                merchantId={props.merchantId}
                currentView={handleChangeView}
                /> : null}

                {showGlobalVariableMatching ? <GlobalVariableMatching
                templateId = {props.templateId}
                currentView={handleChangeView}
                /> : null}
                
                <div hidden={showEditPDF}>
                <div hidden={showGlobalVariableMatching}>
                {/* <Box className='billHolder'> */}
                <Paper sx={{ minWidth: '60.5vw', minHeight: '70vh', mb: 2, backgroundColor: 'transparent'}}>
            <Typography sx={{ mt: 2, mb: 1, py: 1, 
                            textAlign: 'center', fontSize: 25, fontWeight: 'bold' }}>
                            Transaction Variable Matching
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
                        {mappingConfig.filter(values => values.data.source !== "input")
                        .map((columnName, index) => {
                            return (
                            <TableRow key={index}>
                        <StyledTableCell padding="checkbox" />
                        <StyledTableCell>
                            {columnName.name}
                        </StyledTableCell>
                        
                        <StyledTableCell>

                    <FormControl fullWidth id="fullWidth" size="small">
                      <Select
                        onChange={updateMappedValue(columnName.name)}
                        value={columnName.data.value}
                        name="value"
                      >
                        <MenuItem value={"1"}>1</MenuItem>
                        <MenuItem value={"2"}>2</MenuItem>
                        <MenuItem value={"3"}>3</MenuItem>
                        <MenuItem value={"4"}>4</MenuItem>
                        <MenuItem value={"5"}>5</MenuItem>
                        <MenuItem value={"6"}>6</MenuItem>
                        <MenuItem value={"7"}>7</MenuItem>
                        <MenuItem value={"8"}>8</MenuItem>
                        <MenuItem value={"9"}>9</MenuItem>
                        <MenuItem value={"10"}>10</MenuItem>

                        <MenuItem value={"11"}>11</MenuItem>
                        <MenuItem value={"12"}>12</MenuItem>
                        <MenuItem value={"13"}>13</MenuItem>
                        <MenuItem value={"14"}>14</MenuItem>
                        <MenuItem value={"15"}>15</MenuItem>
                        <MenuItem value={"16"}>16</MenuItem>
                        <MenuItem value={"17"}>17</MenuItem>
                        <MenuItem value={"18"}>18</MenuItem>
                        <MenuItem value={"19"}>19</MenuItem>
                        <MenuItem value={"20"}>20</MenuItem>

                        <MenuItem value={"21"}>21</MenuItem>
                        <MenuItem value={"22"}>22</MenuItem>
                        <MenuItem value={"23"}>23</MenuItem>
                        <MenuItem value={"24"}>24</MenuItem>
                        <MenuItem value={"25"}>25</MenuItem>
                        <MenuItem value={"26"}>26</MenuItem>
                        <MenuItem value={"27"}>27</MenuItem>
                        <MenuItem value={"28"}>28</MenuItem>
                        <MenuItem value={"29"}>29</MenuItem>
                        <MenuItem value={"30"}>30</MenuItem>
                      </Select>
                    </FormControl>
                        </StyledTableCell>
                        </TableRow>
                        )})}
                        </TableBody>
                    </Table>
                    </TableContainer>
                    <div className='adminStepperButton'>
                            <React.Fragment>
                                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                    <ButtonBack
                                    variant="dashed"
                                    className='adminButtonBack'
                                    onClick={backClick}
                                    rounded
                                    >
                                    Back
                                    </ButtonBack>
                                
                                
                                <Box sx={{ flex: '1 1 auto' }} />

                                    <ButtonNext 
                                    variant="dashed"
                                    onClick={nextClick}
                                    rounded
                                    >
                                    
                                    Next
                                    </ButtonNext>
                                </Box>
                            </React.Fragment>
                        </div>
                </Paper>
                </div>
                </div>
                </Box>
    );
}

export default TransactionVariableMatching;