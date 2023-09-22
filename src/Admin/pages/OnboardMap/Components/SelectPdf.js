import React, { useState, useEffect, useRef } from 'react'
import Box from '@mui/material/Box';
import Card from 'react-bootstrap/Card';
import samplePdf2 from '../../../../Images/samplePDF1.png';
import Grow from '@mui/material/Grow';
import { Event } from '@mui/icons-material';
import { templateService } from '../../../../Services/template.service';
import {styled} from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import MuiButton from '@mui/material/Button';
import '../../../../Styles/AdminStepper.css';
import { FormControl, Grid, MenuItem, Paper, Select, Table, TableBody, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import { adminConfigurationService } from '../../../../AdminServices/configuration.service';
import { Stack } from '@mui/system';
import { adminTemplateService } from '../../../../AdminServices/template.service';

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

function SelectPdf(props) {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [colorSelected, setColorSelected] = useState({ color: 'red' });
    const [checked, setChecked] = React.useState(false);
    const [pdfFilePreview, setPdfFilePreview] = useState();
    const [pdfList, setPdfList] = useState([]);
    const ref = useRef(null);
    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }


    const templateSelected = event => {
      
        const cardSelected = ref.current;

        cardSelected.className = "cardSelected";
        console.log("items Selected " + event.currentTarget.className);
        //console.log(props.getName);
        setColorSelected({ color: 'orange' });

      //  props.templateId("793759");
    }

    const getPdfFile = (filePath) => {
        adminTemplateService
            .getPdf(filePath)
            .then((response) => {
                setPdfFilePreview(response);
              })
              .catch((error) => {
        
                console.log(error.data);
              });
    }

    const getPdfList = () => {
        adminConfigurationService
            .getPDFList()
            .then((response) => {
                setPdfList(response);
            })
            .catch((error) => {
                console.log(error.data);
            })
    }

    useEffect(() => {
        getPdfList();
        setChecked((prev) => !prev);
        return () => {
            setChecked((prev) => !prev);
        };
    }, []);

    function getData(id, path) {
        getPdfFile(path);
        props.pdfData(id, path);
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
                                    <Grid item xs={4}>
                                        <TableContainer className='tableListContainer'>
                                            <Table sx={{minWidth: 80}}>
                                                <TableHead>
                                                    <TableRow>
                                                        <StyledTableCell align='center'>Templates</StyledTableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {/* <TableRow >
                                                        <StyledTableCell align='center'>Template 1</StyledTableCell>
                                                    </TableRow> */}
                                                    {pdfList.map((values, index) => (
                                                        <TableRow key={index}
                                                        onClick={(event) => getData(values.pdfId, values.filepath)}>
                                                            <StyledTableCell align='center'>{values.filename}</StyledTableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    </Grid>
                                    <Grid item xs={8}>
                                        <TableContainer className='previewHolder'>
                                            <Table stickyHeader sx={{minWidth: 100}}>
                                                <TableHead>
                                                    <TableRow>
                                                        <StyledTableCell align='center'>Preview</StyledTableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    <TableRow >
                                                        <StyledTableCell align='center'>
                                                        <iframe src={`data:application/pdf;base64,${pdfFilePreview}#toolbar=0`} className='selectIframeHolder'></iframe>
                                                        </StyledTableCell>
                                                    </TableRow>
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

export default SelectPdf