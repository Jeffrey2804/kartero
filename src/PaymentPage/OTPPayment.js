import React from 'react'
import OTPPaymentImage from '../Images/OTPPayment.png';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import "../Styles/LandingPage.css";
import Stack from '@mui/material/Stack';

import TextField from '@mui/material/TextField';
import PaymentLandingPageNavBar from './Components/PaymentLandingPageNavBar';

import Button from '@mui/material/Button';

import { createTheme, ThemeProvider } from '@mui/material/styles';

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

function OTPPayment() {
    return (
        <div>
            <ThemeProvider theme={theme}>
                <PaymentLandingPageNavBar />

                <Box sx={{ width: '100%' }} className='failedPaymentPage'>
                    <Stack direction="column"
                        justifyContent="center"
                        alignItems="center"
                        spacing={1}>

                        <Box sx={{ width: '50%' }} className=''>
                            <Stack direction="column"
                                justifyContent="center"
                                alignItems="center"
                                spacing={2}>
                                <img src={OTPPaymentImage} />
                                <div className='otpTitle'>OTP Verification</div>
                                <Stack direction="row" spacing={2}>
                                    <div className='otpText'>Enter the OTP sent to </div>
                                    <div className='otpTextColored'>+639 01 234 5678</div>
                                </Stack>
                                <Box
                                    sx={{
                                        width: 380,
                                        maxWidth: '100%',
                                    }}
                                >
                                    <TextField fullWidth label="One Time Password" />
                                </Box>

                                <Stack direction="row" spacing={2}>
                                    <div className='otpText'>Didn`t receive the OTP? </div>
                                    <div className='otpTextColored'>Resend Again</div>
                                </Stack>

                                <Button variant="contained">Verify and Proceed</Button>
                            </Stack>



                        </Box>

                    </Stack>
                </Box>
            </ThemeProvider>
        </div>
    )
}

export default OTPPayment