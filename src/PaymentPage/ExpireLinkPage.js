import React from 'react'
import linkExpired from '../Images/linkExpired.png';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import "../Styles/LandingPage.css";
import Stack from '@mui/material/Stack';
import PaymentLandingPageNavBar from './Components/PaymentLandingPageNavBar';

function ExpireLinkPage() {
    return (
        <div>

            <PaymentLandingPageNavBar />

            <Box sx={{ width: '100%' }} className='failedPaymentPage'>
                <Stack direction="column"
                    justifyContent="center"
                    alignItems="center"
                    spacing={2}>
                    <img src={linkExpired} />


                    <div className='linkExpiredTitle'>Link Expired!</div>
                    {/* <div className='failedPaymentText'>Thank you for your Billing. You will receive
                        an email confirming the successful transaction.
                    </div> */}
                    <div className='failedPaymentText'>
                        The link was set to expired after a certain amount of time.
                        You cannot access the link anymore.
                    </div>
                </Stack>
            </Box>
        </div>
    )
}

export default ExpireLinkPage