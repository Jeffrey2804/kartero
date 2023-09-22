import React, { useState, useEffect, useMemo } from 'react'
import PaymentLandingPageNavBar from './Components/PaymentLandingPageNavBar';
import { useParams } from "react-router-dom";
import Stack from '@mui/material/Stack';
import "../Styles/LandingPage.css";

import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import Divider from '@mui/material/Divider';
import { verificationService } from '../Services/verification.service';
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

function LandingPage() {


    const [transaction, setTransaction] = useState([]);
    const { verificationCode } = useParams();
    const queryParameters = new URLSearchParams(window.location.search)
    const requestId = queryParameters.get("requestId");
    const merchantId = queryParameters.get("merchantId");
    const [transactionIsValid, setTransactionIsValid] = useState(false);
    const getCustomerInformation = () => {

        verificationService
            .getCustomerInfo(merchantId, requestId)
            .then((response) => {
                console.log(response);
                setTransaction(response);
                localStorage.setItem("transactionInfo", JSON.stringify(response))
            })
            .catch((error) => {
                // navigate(process.env.REACT_APP_PATH + "/expiredLink");
                // console.log(error.response.data);

            });
    }
    const verifyLink = (transId) => {

        verificationService
            .verify(transId)
            .then((response) => {
                console.log("transaction Verified");
                setTransactionIsValid(true);
            })
            .catch((error) => {
                console.log("transaction is not valid");
                setTransactionIsValid(false);
                // navigate(process.env.REACT_APP_PATH + "/expiredLink");
                // console.log(error.response.data);

            });
    }



    useEffect(() => {

        console.log(requestId);
        // verifyLink(verificationCode);
        console.log("Verify Link boolean : " + transactionIsValid);
        // if (transactionIsValid === true) {
        //     const transactionInfo = window.localStorage.getItem("transactionInfo");
        //     if (transactionInfo !== null) {
        //         setTransaction(JSON.parse(transactionInfo));
        //     } else {

        getCustomerInformation(verificationCode);
        //     }
        // }
    }, [transactionIsValid]);



    const navigate = useNavigate();
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
                        Confirmation Details

                    </div>

                    <Box sx={{ width: '30%' }}>
                        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                            <Grid item xs={12}>
                                <Divider variant="middle" />
                            </Grid>
                            <Grid item xs={6}>
                                <div className='titleHolder'>Name :</div>
                            </Grid>
                            <Grid item xs={6}>
                                <div className='contentHolder'>{transaction.customerName}</div>
                            </Grid>
                            <Grid item xs={6}>
                                <div className='titleHolder'>Address :</div>
                            </Grid>
                            <Grid item xs={6}>
                                <div className='contentHolder'>{transaction.address}</div>
                            </Grid>
                            {/* <Grid item xs={6}>
                                <div className='titleHolder'>Phone Number :</div>

                            </Grid>

                            <Grid item xs={6}>
                                <div className='contentHolder'>{transaction.mobileNumber}</div>

                            </Grid> */}
                            <Grid item xs={12}>

                                <Divider variant="middle" />
                            </Grid>
                        </Grid>
                    </Box>
                    <Box sx={{ width: '30%' }}>
                        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                            <Grid item xs={12}>
                                <Divider variant="middle" />
                            </Grid>
                            {/* <Grid item xs={6}>
                                <div className='titleHolder'>Unit Number :</div>

                            </Grid>
                            <Grid item xs={6}>
                                <div className='contentHolder'>{transaction.billingAddress1}</div>
                            </Grid> */}
                            <Grid item xs={6}>
                                <div className='titleHolder'>Billing Cycle :</div>

                            </Grid>

                            <Grid item xs={6}>
                                <div className='contentHolder'>{transaction.billingCycle}</div>

                            </Grid>
                            <Grid item xs={6}>
                                <div className='titleHolder'>Service :</div>

                            </Grid>
                            <Grid item xs={6}>
                                <div className='contentHolder'>{transaction.serviceType}</div>
                            </Grid>
                            <Grid item xs={6}>
                                <div className='titleHolder'>Account Number :</div>
                            </Grid>
                            <Grid item xs={6}>
                                <div className='contentHolder'>{transaction.accountNo}</div>
                            </Grid>
                            <Grid item xs={6}>
                                <div className='titleHolder'>Amount Due :</div>
                            </Grid>
                            <Grid item xs={6}>
                                <div className='contentHolder'>{transaction.amount}</div>
                            </Grid>
                            <Grid item xs={12}>
                                <Divider variant="middle" />
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

                        <Button variant="contained" color='secondary' className="backButton" >
                            Back
                        </Button>
                        <Button onClick={() => { confirmClick(); }} variant="contained" size="large" className="confirmButton" >
                            Confirm
                        </Button>
                    </Grid>
                </Stack>





            </div>
        </ThemeProvider >
    )

    function confirmClick() {
        navigate(process.env.REACT_APP_PATH + "/dummyPaymentPage");
    }
}

export default LandingPage