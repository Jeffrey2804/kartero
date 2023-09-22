import React, { useEffect } from 'react'
import somethingWentWrong from '../Images/wentWrong.png';
import { useNavigate } from 'react-router-dom'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import "../Styles/LandingPage.css";
import Stack from '@mui/material/Stack';
import PaymentLandingPageNavBar from '../PaymentPage/Components/PaymentLandingPageNavBar';
import {authenticationService} from '../Services/authentication.service';
function SomethingWentWrong() {

    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            authenticationService.logout();
            navigate(process.env.REACT_APP_PATH + "/");
            window.location.reload();
        }, 5000)
    }, []);

    return (
        <div>

            <PaymentLandingPageNavBar />

            <Box sx={{ width: '100%' }} className='failedPaymentPage'>
                <Stack direction="column"
                    justifyContent="center"
                    alignItems="center"
                    spacing={2}>
                    <img src={somethingWentWrong} />
                    <div className='linkExpiredTitle'>Something went wrong</div>
                    {/* <div className='failedPaymentText'>Thank you for your Billing. You will receive
                        an email confirming the successful transaction.
                    </div> */}
                    <div className='failedPaymentText'>
                        We keep track of these errors, but feel free to contact us if refreshing doesn’t fix things.
                    </div>
                </Stack>
            </Box>
        </div>
    )
}

export default SomethingWentWrong