import React, { useState, useEffect, useMemo } from 'react'
import SuccessImage from '../Images/successPayment.png';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import "../Styles/LandingPage.css";
import Stack from '@mui/material/Stack';
import PaymentLandingPageNavBar from './Components/PaymentLandingPageNavBar';
function SuccessPayment() {

    useEffect(() => {
        localStorage.clear();
    }, []);

    return (
        <div >
            <PaymentLandingPageNavBar />

            <Box sx={{ width: '100%' }} className='successPaymentPage'>
                <Stack direction="column"
                    justifyContent="center"
                    alignItems="center"
                    spacing={2}>
                    <img src={SuccessImage} />


                    <div className='successPaymentTitle'>Transaction Completed Successfully!</div>
                    <div className='successPaymentText'>Thank you for your Billing. You will receive
                        an email confirming the successful transaction.
                    </div>
                </Stack>
            </Box>

        </div>
    )
}

export default SuccessPayment