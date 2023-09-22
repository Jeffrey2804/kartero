import React, { useState, useEffect, useRef } from 'react'
// import '../../Styles/Template.css';
import Box from '@mui/material/Box';
import Card from 'react-bootstrap/Card';
import { Stack } from '@mui/system';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { FormControl, Grid, MenuItem, Paper, Select, Table, TableBody, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import MuiButton from '@mui/material/Button';
import { styled } from '@mui/material/styles';
// import { MenuItem, Select, TextField } from '@mui/material';
import samplePdf2 from '../../../../Images/email.png';
import { adminConfigurationService } from '../../../../AdminServices/configuration.service';
import Grow from '@mui/material/Grow';
import '../../../../Styles/AdminStepper.css';
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

function HtmlMappingv2(props) {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [colorSelected, setColorSelected] = useState({ color: 'red' });
    // const [checked, setChecked] = React.useState(false);
    const [htmlFile, setHtmlFile] = useState();
    const [emailPlaceholder, setEmailPlaceholder] = useState([]);
    const ref = useRef(null);
    const listOfValues = [];
    const globalVariablesList = [...props.globalVariablesList];

    const viewEmailPlaceholder = () => {
        adminConfigurationService
            .getEmailPlaceholders(props.htmlId)
            .then((response) => {
                setEmailPlaceholder(response);
                props.setEmailPlaceholder(response);
            })
            .catch((error) => {

            });
    }

    const getHtmlFile = () => {
        adminTemplateService
            .getHtml(props.htmlPath)
            .then((response) => {
                setHtmlFile(response);
            })
            .catch((error) => {

                console.log(error.data);
            });
    }

    useEffect(() => {
        getHtmlFile();
        viewEmailPlaceholder();
    }, []);

    const [values, setValues] = useState([]);

    function addValueToList() {
        for (var i = 0; i < emailPlaceholder.length; i++) {
            const addToArraylist = ({
                globalVariable: '',
                name: emailPlaceholder[i].field,
                statementField: '',
                emailPlaceholder: emailPlaceholder[i],
                type: '',
                format: '',
                data: {
                    source: '',
                    header: '',
                }
            });
            listOfValues.push(addToArraylist);
        }
        return listOfValues
    }

    const addToList = addValueToList();

    useEffect(() => {
        setValues(addToList);
    }, [listOfValues.length]);

    const handleChange = (index, id, event) => {
        const rowValue = { ...values };
        const updateHtmlMappingValue = values.map(i => {
            if (id === rowValue[index].emailPlaceholder) {
                rowValue[index][event.target.name] = event.target.value
                rowValue[index].name = event.target.value.name
                // rowValue[index].data.source = event.target.value.data.source
                // rowValue[index].data.header = event.target.value.data.header
                // rowValue[index].data.type = event.target.value.data.type
                // rowValue[index].data.format = event.target.value.data.format
            }
            return i
        });
        setValues(updateHtmlMappingValue);

        const htmlMappedValues = values.map((mappedValues) => {
            return (
                {
                    name: mappedValues.globalVariable.name,
                    htmlPlaceholder: mappedValues.globalVariable.id,
                    statementField: mappedValues.emailPlaceholder,
                    globalVariableId : mappedValues.globalVariable.id,
                    data: {
                        // source: mappedValues.data.source,
                        header: mappedValues.data.header,
                        type: mappedValues.data.type,
                        format: mappedValues.data.format,
                    }
                })
        });

        props.mappingConfigData(htmlMappedValues);
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
                                        <iframe src={`data:text/html;base64,${htmlFile}#toolbar=0`} className='previewIframeHolder'></iframe>
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
                                                            {/* <StyledTableCell align='center'>{fields.emailPlaceholder}</StyledTableCell> */}
                                                            <StyledTableCell align='center'>
                                                                <FormControl fullWidth id='fullWidth' size="small">
                                                                    <Select
                                                                        onChange={event => handleChange(index, fields.emailPlaceholder, event)}
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

export default HtmlMappingv2