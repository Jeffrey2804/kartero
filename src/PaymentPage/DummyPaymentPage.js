
import React, { useState, useEffect } from 'react';
import PaymentLandingPageNavBar from './Components/PaymentLandingPageNavBar';
import Stack from '@mui/material/Stack';
import "../Styles/LandingPage.css";

import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import Divider from '@mui/material/Divider';
import { TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
const theme = createTheme({
    palette: {
        primary: {

            main: '#FD9A08',
            contrastText: '#fff',
        },
        secondary: {

            main: '#FFFFFF',
        },
    },
});



function DummyPaymentPage() {
    const navigate = useNavigate();
    const[transaction, setTransaction] = useState([]);


    useEffect(() => {
        // const transactionInfo = window.localStorage.getItem("transactionInfo");
        // setTransaction(JSON.parse(transactionInfo));

    }, []);
    return (
        <ThemeProvider theme={theme}>
            <div className='paymentLandingPage'>
                <PaymentLandingPageNavBar />
                <Stack
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    spacing={6}
                >
                    <div className="confirmationText">
                        Payment Details

                    </div>

                    <Box sx={{ width: '650px' }}>
                        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                            <Grid item xs={12}>
                                <Divider variant="middle" />
                            </Grid>
                            <Grid item xs={6}>
                                <div className='titleHolder'>Transaction Time :</div>
                            </Grid>
                            <Grid item xs={6}>
                                <div className='contentHolder'>
                                    {new Date().toLocaleString([],
                                        { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                                </div>
                            </Grid>
                            <Grid item xs={6}>
                                <div className='titleHolder'>Request ID :</div>
                            </Grid>
                            <Grid item xs={6}>
                                <div className='contentHolder'>
                                    0921a9c7800277ce
                                </div>
                            </Grid>
                            <Grid item xs={6}>
                                <div className='titleHolder'>Amount :</div>

                            </Grid>

                            <Grid item xs={6}>
                                <div className='contentHolder'>
                                    {transaction.amountDue}
                                </div>

                            </Grid>
                            <Grid item xs={12}>

                                <Divider variant="middle" />
                            </Grid>
                        </Grid>
                    </Box>
                    <Box sx={{ width: '650px' }}>
                        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                            <Grid item xs={12}>
                                <Divider variant="middle" />
                            </Grid>
                            <Grid item xs={6}>
                                <div className='titleHolder'>Payment Method :</div>

                            </Grid>
                            <Grid item xs={6}>
                                <div className='contentHolder'>
                                    <TextField fullWidth label='Payment Method' id='fullWidth' />
                                </div>
                            </Grid>
                            <Grid item xs={6}>
                                <div className='titleHolder'>Payment Channel :</div>

                            </Grid>

                            <Grid item xs={6}>
                                <div className='contentHolder'>
                                    <TextField fullWidth label='Payment Channel' id='fullWidth' />
                                </div>

                            </Grid>
                        </Grid>
                    </Box>

                    <Grid
                        container
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                        columnGap={2}
                    >


                        <Button onClick={() => { successClick(); }}
                            variant="contained" size="large" disableElevation>
                            Move to Success Page
                        </Button>
                        <Button onClick={() => { failClick(); }}
                            variant="contained" size="large" disableElevation >
                            Move to Fail Page
                        </Button>
                    </Grid>
                </Stack>





            </div>
        </ThemeProvider >
    )

    function successClick() {
        navigate(process.env.REACT_APP_PATH + "/successPaymentPage");
    }
    function failClick() {
        navigate(process.env.REACT_APP_PATH + "/failedPaymentPage");
    }
}

export default DummyPaymentPage