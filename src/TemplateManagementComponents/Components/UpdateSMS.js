import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import '../../Styles/Mapping.css';
import '../../Styles/Template.css';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Box } from '@mui/system';
import { TextField, Typography } from '@mui/material';
import {styled} from '@mui/material/styles';
import MuiButton from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import { adminConfigurationService } from '../../AdminServices/configuration.service';
import HTMLMapping from './HTMLMapping';
import PDFMapping from './PDFMapping';
import TransactionVariableMatching from './TransactionVariableMatching';

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

const ButtonBack = styled(
    MuiButton,
    options
  )(({ rounded }) => ({
    borderRadius: rounded ? "24px" : null,
    backgroundColor: "#BCC0C2",
    color: "white",
    width: 150,
  }));
  
  const ButtonNext = styled(
    MuiButton,
    options
  )(({ rounded }) => ({
    borderRadius: rounded ? "24px" : null,
    backgroundColor: "#FD9A08",
    color: "white",
    width: 150,
  }));

export default function UpdateSMS(props) {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(50);
    const [existingSMS, setExistingSMS] = useState("");
    const [smsContent, setSmsContent] = React.useState({
        text: ''
    });
    const [showTransactionVariableMatching, setShowTransactionVariableMatching] = useState(false);
    const [showUpdatePdfTemplate, setShowUpdatePdfTemplate] = useState(false);
    const [showUpdateHtmlTemplate, setShowUpdateHtmlTemplate] = useState(false);
    const [showUpdateSmsTemplate, setShowUpdateSms] = useState(false);

    const handleChange = (prop) => (event) => {
        setSmsContent({...smsContent, [prop]: event.target.value});
        if(smsContent === '\n'){
            setSmsContent({...smsContent, [prop]: event.target.value.con});
        }
    }

    const updateMapping = () => {
        const stringifyValues = JSON.stringify(smsContent.text);
        adminConfigurationService.updateSmsConfig(
            props.templateId, stringifyValues
        ).then((response) => {

        }).catch((error) => {

        })
    };

    const viewSMS = () => {
        adminConfigurationService.getSMS(
            props.templateId
        ).then((response) => {
            setExistingSMS(response);
          })
          .catch((error) => {
    
    
          });
    };

    useEffect(() => {
        viewSMS();
      }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        {updateMapping()};
        window.location.reload(false);
    };

    const backClick = () => {
        setShowTransactionVariableMatching(true);
    }

    function showEditPDF() {
        setShowUpdatePdfTemplate(true);
    }

    function showEditHTML() {
        setShowUpdateHtmlTemplate(true);
    }
    
    function showEditSMS() {
        setShowUpdateSms(true);
    }

    const handleChangeView = (response) => {
        setShowUpdateSms(response);
        setShowUpdatePdfTemplate(response);
        setShowUpdateHtmlTemplate(response);
        setShowTransactionVariableMatching(response);
    };

    return (
        // <div className='template'>

            <Box className='mainContentBox'>

                {showUpdateHtmlTemplate ? <HTMLMapping 
                    templateId = {props.templateId}
                    currentView={handleChangeView}
                /> : null}

                {showUpdatePdfTemplate ? <PDFMapping 
                    templateId = {props.templateId}
                    currentView={handleChangeView}
                /> : null}

{showTransactionVariableMatching ? (
        <TransactionVariableMatching
            templateId={props.templateId}
            currentView={handleChangeView}
        />
      ) : null}

                <div hidden={showUpdateHtmlTemplate}>
                <div hidden={showUpdatePdfTemplate}>
                <div hidden={showTransactionVariableMatching}>
                
                <Paper sx={{ minWidth: '60.5vw', minHeight: '70vh', mb: 2, backgroundColor: 'transparent'}}>
                    <Typography sx={{ mt: 2, mb: 1, py: 1, 
                        textAlign: 'center', fontSize: 25, fontWeight: 'bold' }}>
                        Update SMS
                    </Typography>
                    <Grid container spacing={2} columns={5}>
                        <Grid item xs={1}>
                            <div className='contentHolder'>
                                <TableContainer sx={{ maxHeight: 480}}>
                                    <Table sx={{minWidth: 80}}>
                                        <TableHead>
                                        <TableRow>
                                            <StyledTableCell align='center'>PDF Pattern</StyledTableCell>
                                        </TableRow>
                                        </TableHead>
                                        <TableBody style={{ cursor: 'pointer' }}>
                                            <TableRow >
                                                <StyledTableCell align='center' onClick={() => {showEditPDF();}} sx={{color: "#707070", fontWeight: 500}}>PDF</StyledTableCell>
                                            </TableRow>
                                            <TableRow >
                                                <StyledTableCell align='center' onClick={() => {showEditHTML();}} sx={{color: "#707070", fontWeight: 500}}>HTML</StyledTableCell>
                                            </TableRow>
                                            <TableRow >
                                                <StyledTableCell align='center' sx={{color: "#FD9A08", fontWeight: "bold"}}>SMS</StyledTableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                 </TableContainer>
                            </div>
                        </Grid>

                        <Grid item xs>
                        <Paper sx={{ minWidth: '40.5vw', minHeight: '10vh', mb: 2}}>
                            <Box component="form"
                                sx={{"& .MuiTextField-root": { m: 14, maxWidth: "50.5vw", lm: 100 
                                // alignItems: "center", justifyContent: "center" 
                                }}}
                                noValidate
                                autoComplete="off">
                                <div >
                                    <TextField id='outlined-multiline-static' multiline rows={7} 
                                        fullWidth
                                        sx={{placeholder: 'red'}}
                                        value={smsContent.text}
                                        onChange={handleChange('text')}
                                        label=""
                                        placeholder={existingSMS}/>
                                </div>
                                <div className='title'>
                                    <ul>
                                        <li>
                                            Do not put any links
                                        </li>
                                        <li>
                                            The same message will be sent to all contacts of the merchant
                                        </li>
                                    </ul>
                                </div>
                            </Box>
                            </Paper>
                        </Grid>
                    </Grid>
                
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

                    <ButtonNext variant="dashed" onClick={handleSubmit} rounded>
                      Save Changes
                    </ButtonNext>
                  </Box>
                </React.Fragment>
              </div>
                </Paper>
                

            </div>
            </div>
            </div>
            </Box>
            // </div>
        
    );
}