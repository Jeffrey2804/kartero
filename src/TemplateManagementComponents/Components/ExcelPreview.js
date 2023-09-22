import React, { useState } from 'react';
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
import { Typography } from '@mui/material';
import {styled} from '@mui/material/styles';
import MuiButton from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import { adminConfigurationService } from '../../AdminServices/configuration.service';

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

export default function ExcelPreview(props) {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(50);
    const config = props.configValues;

    const updateMapping = () => {
        const stringifyValues = JSON.stringify(config);
        adminConfigurationService.updateMappingConfig(
            props.templateId, stringifyValues
        ).then((response) => {

        }).catch((error) => {

        })
    }

    function testDownload() {
        const headers = config.map((getHeaders) => {
            return getHeaders.name});
        const stringifyValues = JSON.stringify(headers);
        const test = stringifyValues.replace("[,],'","");
        const file = new Blob([test], {type: 'text/csv'});
        const element = document.createElement("a");
        element.href = URL.createObjectURL(file);
        element.download = "Input-File-"+Date.now()+".csv";
        document.body.appendChild(element);
        element.click();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        {updateMapping()};
        window.location.reload(false);
    };

    function saveAndDownloadClick() {
        {updateMapping()};
        testDownload();
        window.location.reload(false);
    }

    const backClick = () => {
        window.location.reload(false);
    }


    return (
        // <div className='template'>

            <Box className='mainContentBox'>

                {/* <Box className='billHolder'> */}
                
                <Paper sx={{ minWidth: '60.5vw', minHeight: '70vh', mb: 2, backgroundColor: '#f5f5f5'}}>
                    <Typography sx={{ mt: 2, mb: 1, py: 1, 
                        textAlign: 'center', fontSize: 25, fontWeight: 'bold' }}>
                        Excel Preview
                    </Typography>
                    <Grid
                                container
                                direction="row"
                                justifyContent="right"
                                alignItems="right"
                                columnGap={0}
                            >

                            
                                <Button onClick={() => {saveAndDownloadClick();}} 
                                    variant="contained" size="large" disableElevation>
                                    Confirm and Download
                                </Button>
                            </Grid>
                    <TableContainer sx={{ maxHeight: 440 }}>
                        <Table sx={{minWidth: 700}}>
                            <TableHead>
                                <TableRow>
                                {config.map((test) => {return (
                                    <StyledTableCell align="center" key={test.name}>{test.name}</StyledTableCell>
                                )})}    
                                </TableRow>
                            </TableHead>
                        </Table>
                    </TableContainer>
                {config.map((test) => {return ( 
                    <TableContainer sx={{ maxHeight: 440 }}>
                        <Table sx={{minWidth: 700}}>
                            <TableBody>
                                <TableRow>
                                    <StyledTableCell align="center">{test.delimeter}</StyledTableCell>  
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                )})}
                
                </Paper>
                <div className='adminStepperButton'>
                            <React.Fragment>
                                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                    <Button
                                    color="secondary"
                                    variant="dashed"
                                    className='adminButtonBack'
                                    onClick={backClick}
                                    >
                                    <KeyboardArrowLeft/>
                                    Back
                                    </Button>
                                
                                
                                <Box sx={{ flex: '1 1 auto' }} />

                                    <Button 
                                    color="secondary"
                                    variant="dashed"
                                    onClick={handleSubmit}
                                    >
                                    
                                    Submit
                                    <KeyboardArrowRight />
                                    </Button>
                                </Box>
                            </React.Fragment>
                        </div>

            {/* </Box> */}
            </Box>
            // </div>
        
    );
}