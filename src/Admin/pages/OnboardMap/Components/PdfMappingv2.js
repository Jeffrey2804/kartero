import React, { useState, useEffect, useRef } from 'react'
// import '../../Styles/Template.css';
import Box from '@mui/material/Box';
// import Card from '@mui/material/Card';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { FormControl, Grid, MenuItem, Paper, Select, Table, TableBody, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import Card from 'react-bootstrap/Card';
// import { FormControl, Grid, MenuItem, Select, TextField } from '@mui/material';
import '../../../../Styles/Mapping.css';
import { styled } from '@mui/material/styles';
import samplePdf2 from '../../../../Images/samplePDF1.png';
import MuiButton from '@mui/material/Button';
import Grow from '@mui/material/Grow';
import { Stack } from '@mui/system';
import '../../../../Styles/AdminStepper.css';
import { adminConfigurationService } from '../../../../AdminServices/configuration.service';
import { templateService } from '../../../../Services/template.service';
import { adminTemplateService } from '../../../../AdminServices/template.service';
import data from '../../Validations/dataValidation.json';

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
    shouldForwardProp: (prop) => prop !== 'rounded',
};

const Button = styled(
    MuiButton,
    options,
)(({ rounded }) => ({
    borderRadius: rounded ? '24px' : null,
    backgroundColor: '#FD9A08'
}));

function PdfMappingv2(props) {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [colorSelected, setColorSelected] = useState({ color: 'red' });
    const [pdfHeaders, setPdfHeaders] = useState([]);
    const [pdfFile, setPdfFile] = useState();
    const ref = useRef(null);
    const listOfValues = [];
    const globalVariablesList = [...props.globalVariablesList];

    const viewPdfHeaders = () => {
        adminConfigurationService
            .getStatementField(props.pdfId)
            .then((response) => {
                setPdfHeaders(response);
                props.setPdfHeaders(response);
                console.log(response);
            })
            .catch((error) => {

            });
    }

    const getPdfFile = () => {
        adminTemplateService
            .getPdf(props.pdfPath)
            .then((response) => {
                setPdfFile(response);
            })
            .catch((error) => {

                console.log(error.data);
            });
    }

    useEffect(() => {
        getPdfFile();
        viewPdfHeaders();
    }, []);

    const [values, setValues] = useState([]);

    function addValueToList() {
        for (var i = 0; i < pdfHeaders.length; i++) {
            console.log(pdfHeaders[i].field);

            const addToArraylist = ({
                globalVariable: '',
                name: pdfHeaders[i].field,
                statementField: pdfHeaders[i],
                emailPlaceholder: '',
                data: {
                    source: '',
                    header: '',
                    type: '',
                    format: '',
                }
            });
            listOfValues.push(addToArraylist);

        }
        return listOfValues;
    }
    console.log(pdfHeaders.length);
    const addToList = addValueToList();

    useEffect(() => {
        setValues(addToList);

        console.log(globalVariablesList);
    }, [listOfValues.length]);

    const handleChange = (index, id, event) => {
        const rowValue = { ...values };

        const updatePDFMappingValue = values.map(i => {
            if (id === rowValue[index].statementField) {

                console.log(event.target);
                console.log(event.target.value.name);
                console.log(event.target.value);
                
                rowValue[index][event.target.name] = event.target.value
                rowValue[index].name = event.target.value.name
                
                console.log(rowValue[index]);
                // rowValue[index].data.source = event.target.value.data.source
                // rowValue[index].data.header = event.target.value.data.header
                // rowValue[index].data.type = event.target.value.data.type
                // rowValue[index].data.format = event.target.value.data.format
            }
            return i
        });
        setValues(updatePDFMappingValue);

        const pdfMappedValues = values.map((mappedValues) => {
            return (
                {
                    name: mappedValues.globalVariable.name,
                    emailPlaceholder: mappedValues.globalVariable.id,
                    pdfField: mappedValues.globalVariable.id,
                    statementField: mappedValues.statementField,
                    globalVariableId : mappedValues.globalVariable.id,
                    data: {
                        // source: mappedValues.data.source,
                        header: mappedValues.data.header,
                        type: mappedValues.data.type,
                        format: mappedValues.data.format,
                    }
                })
        });
        console.log(pdfMappedValues);
        props.mappingConfigData(pdfMappedValues);

    }

    return (
        <div className='template'>

            <Box className='mainContentBox'>
                <Box className='billHolder'>
                    <Paper className='paperHolder'>
                        <Stack
                            direction="column"
                            justifyContent="left"
                            alignItems="left"
                            spacing={4}
                        >
                            <Box className='boxHolder'>
                                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                    <Grid item xs={5}>
                                        {/* <div className='previewHolder'> */}
                                        <iframe src={`data:application/pdf;base64,${pdfFile}#toolbar=0`} className='previewIframeHolder'></iframe>
                                        {/* </div> */}

                                    </Grid>
                                    <Grid item sx={7}>
                                        <TableContainer className='mappingTable' sx={{ width: '33vw' }}>
                                            <Table stickyHeader sx={{ minWidth: 100 }}>
                                                <TableHead>
                                                    <TableRow>
                                                        <StyledTableCell align='center'>Metadata Field</StyledTableCell>
                                                        <StyledTableCell align='center'>CSV Header Name</StyledTableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {values.map((fields, index) => (
                                                        <TableRow key={index}>
                                                            <StyledTableCell align='center'>{fields.name}</StyledTableCell>
                                                            <StyledTableCell align='center'>
                                                                <FormControl fullWidth id='fullWidth' size="small">
                                                                    <Select
                                                                        onChange={event => handleChange(index, fields.statementField, event)}
                                                                        value={fields.globalVariable}
                                                                        name="globalVariable">
                                                                        {globalVariablesList.map((globalVariables) => (
                                                                            <MenuItem value={globalVariables}>{globalVariables.name}</MenuItem>
                                                                        ))}
                                                                    </Select>
                                                                </FormControl>
                                                            </StyledTableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Stack>
                    </Paper>

                </Box>


            </Box>


        </div >
    )
}

export default PdfMappingv2