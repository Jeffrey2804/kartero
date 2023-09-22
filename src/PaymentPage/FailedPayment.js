import React from 'react'
import FailedPaymentImg from '../Images/paymentFailed.png';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import "../Styles/LandingPage.css";
import Stack from '@mui/material/Stack';
import PaymentLandingPageNavBar from './Components/PaymentLandingPageNavBar';

function FailedPayment() {
    return (
        <div>

            <PaymentLandingPageNavBar />

            <Box sx={{ width: '100%' }} className='failedPaymentPage'>
                <Stack direction="column"
                    justifyContent="center"
                    alignItems="center"
                    spacing={2}>
                    <img src={FailedPaymentImg} />


                    <div className='failedPaymentTitle'>Transaction Failed!</div>
                    {/* <div className='failedPaymentText'>Thank you for your Billing. You will receive
                        an email confirming the successful transaction.
                    </div> */}
                    <div className='failedPaymentText'>
                        Oh no! Something went wrong. We aren't able to process the transaction. Please try again.
                    </div>
                </Stack>
            </Box>
        </div>
    )
}

export default FailedPayment