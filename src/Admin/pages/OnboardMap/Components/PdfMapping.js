import React, { useState, useEffect, useRef } from 'react'
// import '../../Styles/Template.css';
import Box from '@mui/material/Box';
// import Card from '@mui/material/Card';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { FormControl, Grid, MenuItem, Paper, Select, Table, TableBody, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import Card from 'react-bootstrap/Card';
// import { FormControl, Grid, MenuItem, Select, TextField } from '@mui/material';
import '../../../../Styles/Mapping.css';
import {styled} from '@mui/material/styles';
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

function PdfMapping(props) {
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
        for(var i = 0; i < pdfHeaders.length; i++) {
            const addToArraylist = ({globalVariable: '',
                        name: '',
                        statementField: pdfHeaders[i],
                        emailPlaceholder: '',
                        type: '',
                        format: '',
                        data: {
                            source: '',
                            header: '',
                        }});
            listOfValues.push(addToArraylist);
            
        }
        return listOfValues;
    }
    console.log(pdfHeaders.length);
    const addToList = addValueToList();
    
    useEffect(() => {
        setValues(addToList);
    }, [listOfValues.length]);

    const handleChange = (index, id, event) => {
        const rowValue = {...values};

        const updatePDFMappingValue = values.map(i => {
            if(id === rowValue[index].statementField) {
                rowValue[index][event.target.name] = event.target.value
                if(event.target.name === 'globalVariable') {
                    rowValue[index].name = event.target.value.name
                    rowValue[index].data.source = event.target.value.data.source
                    rowValue[index].data.header = event.target.value.data.header
                } 
            }
            return i
        });
        setValues(updatePDFMappingValue);

        const pdfMappedValues = values.map((mappedValues) => {return(
            {name: mappedValues.name, 
            emailPlaceholder: mappedValues.emailPlaceholder,
            statementField: mappedValues.statementField,
            data: {
                source: mappedValues.data.source,
                header: mappedValues.data.header,
                type: mappedValues.type,
                format: mappedValues.format,
            }
        })});
        console.log(pdfMappedValues);
        props.mappingConfigData(pdfMappedValues);
        
    }

    const getFormat = (dataType) => {
        const formatLists = data.filter((type) => type.dataType === dataType)
        .map((availableFormats) => (
            availableFormats.formats
        )) 
        return formatLists[0]
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
                                <TableContainer className='mappingTable' sx={{width: '33vw'}}>
                                            <Table stickyHeader sx={{minWidth: 100}}>
                                                <TableHead>
                                                    <TableRow>
                                                        <StyledTableCell align='center'>Metadata Field</StyledTableCell>
                                                        <StyledTableCell align='center'>CSV Header Name</StyledTableCell>
                                                        <StyledTableCell align='center'>Data Type</StyledTableCell>
                                                        <StyledTableCell align='center'>Format</StyledTableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                {values.map((fields, index) => (
                                                    <TableRow key={index}>
                                                        <StyledTableCell align='center'>{fields.statementField}</StyledTableCell>
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
                                                        <StyledTableCell align='center'>
                                                            <FormControl fullWidth id='fullWidth' size="small">
                                                                <Select 
                                                                    onChange={event => handleChange(index, fields.statementField, event)}
                                                                    value={fields.type}
                                                                    name="type">
                                                                        {data.map((dataTypes) => (
                                                                            <MenuItem value={dataTypes.dataType}>{dataTypes.dataType}</MenuItem>
                                                                        ))}
                                                                </Select>
                                                            </FormControl>
                                                        </StyledTableCell>
                                                        <StyledTableCell align='center'>
                                                            {fields.type === "Numeric" || fields.type === ''? (
                                                                <FormControl fullWidth id='fullWidth' size="small" disabled>
                                                                    <Select 
                                                                        onChange={event => handleChange(index, fields.statementField, event)}
                                                                        value={fields.format}
                                                                        name="format">
                                                                    </Select>
                                                                </FormControl>
                                                            ) : (
                                                                <FormControl fullWidth id='fullWidth' size="small">
                                                                    <Select 
                                                                        onChange={event => handleChange(index, fields.statementField, event)}
                                                                        value={fields.format}
                                                                        name="format">
                                                                            {getFormat(fields.type).map((formatList) => (
                                                                                <MenuItem value={formatList.formatType}>{formatList.formatType}</MenuItem>
                                                                            ))}
                                                                    </Select>
                                                                </FormControl>
                                                            )}
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

export default PdfMapping