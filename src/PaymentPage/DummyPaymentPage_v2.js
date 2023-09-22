
import React, { useState, useEffect } from 'react';
import PaymentLandingPageNavBar from './Components/PaymentLandingPageNavBar';
import Stack from '@mui/material/Stack';
import "../Styles/LandingPage.css";
import { useParams } from "react-router-dom";
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import { TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { verificationService } from '../Services/verification.service';
import { paymentService } from '../Services/payment.service';
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



function DummyPaymentPage_v2() {
    const navigate = useNavigate();
    const [transaction, setTransaction] = useState([]);

    const [age, setAge] = React.useState('');
    const [method, setMethod] = useState();
    const [channel, setChannel] = useState();
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


    useEffect(() => {
        // const transactionInfo = window.localStorage.getItem("transactionInfo");
        // setTransaction(JSON.parse(transactionInfo));
        getCustomerInformation();
    }, []);

    const handleChange = (event) => {
        // setAge(event.target.value);
        setMethod(event.target.value);
        setMenuItems(event.target.value);
    };

    const handleChannelChange = (event) => {
        console.log(event);


        setChannel(event.target.value);
        console.log(method + " " + channel);
    }

    const setMenuItems = (value) => {

        if (value === "bank") {
            return [

                <MenuItem value="bpi">BPI</MenuItem>,
                <MenuItem value="bdo">BDO</MenuItem>,
                <MenuItem value="ub">Union Bank</MenuItem>

            ];
        }


        return (
            [
                <MenuItem value="gcash">Gcash</MenuItem>,
                <MenuItem value="maya">Maya</MenuItem>,
                <MenuItem value="grabpay">Grab Pay</MenuItem>
            ]
        );
    }




    const paymentRequest = (paymentStatus) => {
        const transactionNew = {
            "id": requestId,
            "customerName": transaction.customerName,
            "amount": transaction.amount,
            "status": paymentStatus,
            "remark": "payment completed",
            "merchantId" : merchantId,
            // "createTime": "06/01/2023 08:59:31",
            // "returnTime": "06/01/2023 08:59:31",
            "paymentMethod": method,
            "paymentChannel": channel
        };

        paymentService
            .payRequest(transactionNew)
            .then((response) => {


            })
            .catch((error) => {
                console.log("test");

                navigate(process.env.REACT_APP_PATH + "/expiredLink");
            });
    }


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
                                {/* <Divider variant="middle" /> */}
                            </Grid>
                            <Grid item xs={6}>
                                <div className='titleHolder'>Transaction Time </div>
                            </Grid>
                            <Grid item xs={6}>
                                <div className='contentHolder'>
                                    {new Date().toLocaleString([],
                                        { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                                </div>
                            </Grid>
                            <Grid item xs={6}>
                                <div className='titleHolder'>Request ID </div>
                            </Grid>
                            <Grid item xs={6}>
                                <div className='contentHolder'>
                                    {requestId}
                                </div>
                            </Grid>
                            <Grid item xs={6}>
                                <div className='titleHolder'>Account No </div>
                            </Grid>
                            <Grid item xs={6}>
                                <div className='contentHolder'>
                                    {transaction.accountNo}
                                </div>
                            </Grid>
                            <Grid item xs={12}>

                                {/* <Divider variant="middle" /> */}
                            </Grid>
                            <Grid item xs={6}>
                                <div className='titleHolder'>Name </div>
                            </Grid>
                            <Grid item xs={6}>
                                <div className='contentHolder'>
                                    {transaction.customerName}
                                </div>
                            </Grid>
                            <Grid item xs={6}>
                                <div className='titleHolder'>Email </div>
                            </Grid>
                            <Grid item xs={6}>
                                <div className='contentHolder'>
                                    {transaction.email}
                                </div>
                            </Grid>
                            <Grid item xs={6}>
                                <div className='titleHolder'>Mobile Number </div>
                            </Grid>
                            <Grid item xs={6}>
                                <div className='contentHolder'>
                                    {transaction.mobileNo}
                                </div>
                            </Grid>

                            <Grid item xs={12}>

                                {/* <Divider variant="middle" /> */}
                            </Grid>
                            <Grid item xs={6}>
                                <div className='titleHolder'>Amount </div>

                            </Grid>

                            <Grid item xs={6}>
                                <div className='contentHolder'>
                                {new Intl.NumberFormat().format(transaction.amount) + ".00"}
                                   
                                </div>

                            </Grid>
                            <Grid item xs={12}>

                                {/* <Divider variant="middle" /> */}
                            </Grid>
                        </Grid>
                    </Box>
                    <Box sx={{ width: '650px' }}>
                        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                            <Grid item xs={12}>
                                {/* <Divider variant="middle" /> */}
                            </Grid>
                            <Grid item xs={6}>
                                <div className='titleHolder'>Payment Method </div>

                            </Grid>

                            <Grid item xs={6}>
                                <FormControl fullWidth>
                                    {/* <InputLabel id="demo-simple-select-label">Method</InputLabel> */}
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={method}
                                        // label="Age"
                                        onChange={handleChange}
                                    >
                                        <MenuItem value="bank">Bank</MenuItem>
                                        <MenuItem value="ewallet">E-Wallet</MenuItem>

                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                                <div className='titleHolder'>Payment Channel </div>

                            </Grid>

                            <Grid item xs={6}>
                                <FormControl fullWidth>
                                    {/* <InputLabel id="demo-simple-select-label">Channel</InputLabel> */}
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={channel}
                                        // label="Age"
                                        onChange={handleChannelChange}
                                    >
                                        {setMenuItems(method)}
                                    </Select>
                                </FormControl>

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


                        <Button 
                        sx={{borderRadius : 5, textTransform: 'capitalize'}}
                        onClick={() => { successClick(); }}
                            variant="contained" size="large" disableElevation>
                            Move to Success Page
                        </Button>
                        <Button 
                          sx={{borderRadius : 5,textTransform: 'capitalize'}}
                        onClick={() => { failClick(); }}
                            variant="contained" size="large" disableElevation >
                            Move to Fail Page
                        </Button>
                    </Grid>
                </Stack>





            </div>
        </ThemeProvider >
    )

    function successClick() {
        paymentRequest("paid");
        navigate(process.env.REACT_APP_PATH + "/successPaymentPage", { replace: true });
        // navigate(process.env.REACT_APP_PATH + "/successPaymentPage");
    }
    function failClick() {
        paymentRequest("unpaid");
        navigate(process.env.REACT_APP_PATH + "/failedPaymentPage", { replace: true });
    }
}

export default DummyPaymentPage_v2