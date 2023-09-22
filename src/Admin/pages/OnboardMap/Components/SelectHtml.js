import React, { useState, useEffect, useRef } from 'react'
import Box from '@mui/material/Box';
import Card from 'react-bootstrap/Card';
import samplePdf2 from '../../../../Images/email.png';
import '../../../../Styles/Mapping.css';
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

function SelectHtml(props) {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(0);
    const [colorSelected, setColorSelected] = useState({ color: 'red' });
    const [checked, setChecked] = React.useState(false);
    const [htmlFilePreview, setHtmlFilePreview] = useState();
    const [htmlList, setHtmlList] = useState([]);
    const [test, setTest] = useState();
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

    const getHtmlFile = (filePath) => {
        adminTemplateService
        .getHtml(filePath)
        .then((response) => {
            setHtmlFilePreview(response);
            setTest(response);
          })
          .catch((error) => {
            console.log(error.data);
          });
    }

    console.log("This is a test ", test);

    const getHtmlList = () => {
        adminConfigurationService
            .getHTMLList()
            .then((response) => {
                setHtmlList(response);
              })
              .catch((error) => {
        
                console.log(error.data);
              });
    }

    useEffect(() => {
        getHtmlList();
        setChecked((prev) => !prev);
        return () => {
            setChecked((prev) => !prev);
        };
    }, []);

    function selectFilePath(filePath, htmlID) {
        getHtmlFile(filePath);
        props.htmlData(htmlID, filePath);
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
                                                    {htmlList.map((list, index) => (
                                                    <TableRow key={index} onClick={(event) => selectFilePath(list.filepath, list.htmlId)}>
                                                        <StyledTableCell align='center'>{list.filename}</StyledTableCell>
                                                    </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    </Grid>
                                    <Grid item xs={8}>
                                        <TableContainer className='tableListContainer'>
                                            <Table stickyHeader sx={{minWidth: 100}}>
                                                <TableHead>
                                                    <TableRow>
                                                        <StyledTableCell align='center'>Preview</StyledTableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    <TableRow >
                                                        <StyledTableCell align='center'>
                                                        <iframe src={`data:text/html;base64,${htmlFilePreview}#toolbar=0`} width="600vw" height="550vh"></iframe>
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

export default SelectHtml