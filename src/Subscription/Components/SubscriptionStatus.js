import React, { useState, useEffect } from 'react'
import '../../Styles/ManageSubscription.css';

import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { subscriptionService } from '../../Services/subscription.service';
import { accountService } from '../../Services/account.service';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import ProgressBar from "@ramonak/react-progress-bar";
import SendingSummary from './SendingSummary';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';
import { styled } from "@mui/material/styles";
import { TableContainer } from '@mui/material';
import { Table } from '@mui/material';
import { Grid } from '@mui/material';
import { TableRow } from '@mui/material';
import { TableHead } from '@mui/material';
import { TableBody } from '@mui/material';
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import SubscriptionAccordion from './SubscriptionAccordion';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "rgb(148, 147, 147)",
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
        border: 'none'
    },
}));
function SubscriptionStatus(props) {

    const [subscription, setSubscription] = useState([]);
    const [accountSubscription, setAccountSubscription] = useState([]);
    const [allAccountSubs, setAllAccountSubs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState([]);
    const [activeSubscription, setActiveSubscription] = useState([]);

    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };


    // const getSubscriptionStatus = async() => {

    //     subscriptionService
    //         .getCurrentSubscription(props.merchantId)
    //         .then((response) => {
    //             setSubscription(response);
    //             // setLoading(false);
    //         })
    //         .catch((error) => {
    //         });
    // }
    const getAccountSubscription = (subscriptionId) => {
        // console.log(activeSubscription.subscriptionId);
        accountService
            .getAccountSubscription(subscriptionId)
            .then((response) => {
                setAccountSubscription(response);
                setLoading(false);
            })
            .catch((error) => {
            });

    }
    const getAllAccountSubscription = (subscriptionId) => {
        console.log(subscriptionId);
        accountService
            .getAllAccountSubscription()
            .then((response) => {
                setAllAccountSubs(response);
                setLoading(false);
            })
            .catch((error) => {
            });

    }


    const getActiveSubscription = () => {

        subscriptionService
            .getActiveSubscription()
            .then((response) => {
                setActiveSubscription(response);
                getAccountSubscription(response[0].subscriptionId);
                // console.log(response[0].subscriptionId);
                setLoading(false);
            })
            .catch((error) => {

            })
    }

    const getCurrentDate = (dateToParse) => {

        let newDate = new Date()
        let date = dateToParse;
        let month = newDate.getMonth() + 1;
        let year = newDate.getFullYear();

        return `${month < 10 ? `0${month}` : `${month}`}${'/'}${date}${'/'}${year}`
    }

    const formatDate = (curDate) => {

        curDate = new Date()
        let date = curDate.getDate();
        let month = curDate.getMonth() + 1;
        let year = curDate.getFullYear();

        return `${month < 10 ? `0${month}` : `${month}`}${'/'}${date}${'/'}${year}`
    }



    useEffect(() => {
        console.log(props);
        getActiveSubscription();

        const userSub = window.localStorage.getItem("subData");
        console.log(activeSubscription);
        if (userSub !== null) {
            console.log(JSON.parse(userSub));
            setSubscription(JSON.parse(userSub));

            // getAllAccountSubscription();
        } else {

            console.log("empty");
        }


        // getSubscriptionStatus();
        // getAccountSubscription();
        return () => {
        };
    }, []);

    return (
        <div className='subscriptionStatus'>
            {loading ? <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
                :
                activeSubscription.map(object =>
                    <div className="m-2 space-y-2 ">
                        <div
                            className="group flex flex-col gap-2 rounded-3xl bg-white  text-black border-b-gray-300 border-2 focus:bg-neutral-400 focus:text-white"
                            tabindex="1"
                        >
                            <div className="flex cursor-pointer items-center justify-between p-5 text-center">
                                <span className='w-full font-bold'>{object.subscriptionName}</span>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                                    className="w-6 h-6 transition-all text-orange-400 duration-500 group-focus:-rotate-180 ">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 5.25l-7.5 7.5-7.5-7.5m15 6l-7.5 7.5-7.5-7.5" />
                                </svg>
                            </div>
                            <div
                                className="invisible 
                                group-focus:bg-white
                                group-focus:text-black
                                xl:pl-96
                                h-auto 
                                max-h-0 
                                items-center 
                                opacity-0 
                                transition-all 
                                group-focus:visible 
                                group-focus:max-h-screen 
                                group-focus:opacity-100 
                                group-focus:duration-1000
                                md:pl-32"
                            >
                                <TableContainer
                                    sx={{
                                        // marginTop: '4vw',
                                        // marginLeft: '10vw',
                                        borderTopLeftRadius: 10,
                                        height: '600',
                                        minWidth: 250,
                                        width: "100%",
                                        // border: 1,
                                        // borderRadius: 4
                                    }}>
                                    <Table sx={{ minWidth: 80 }}>
                                        {/* <TableHead>
                            <TableRow>
                                <StyledTableCell align="left">

                                </StyledTableCell>
                                <StyledTableCell align="left" sx={{ fontSize: 23 }}>
                                    Subscription Status
                                </StyledTableCell>
                                <StyledTableCell align="left">

                                </StyledTableCell>
                            </TableRow>


                        </TableHead> */}
                                        <TableBody style={{ cursor: 'pointer' }}>

                                            <TableRow>
                                                <StyledTableCell align="left" >
                                                    <div className='titleHolder'>Subscription Start</div>
                                                </StyledTableCell>
                                                <StyledTableCell align="center" >

                                                </StyledTableCell>
                                                <StyledTableCell align="left" >
                                                    <div className='titleHolder'> {object.dateSubscribed}</div>

                                                </StyledTableCell>
                                            </TableRow>
                                            <TableRow>
                                                <StyledTableCell align="left" >
                                                    <div className='titleHolder'>Subscription Expiry</div>
                                                </StyledTableCell>

                                                <StyledTableCell align="center" >

                                                </StyledTableCell>
                                                <StyledTableCell align="left" >
                                                    <div className='titleHolder'>{object.dateExpire}</div>

                                                </StyledTableCell>
                                            </TableRow>
                                            <TableRow>
                                                <StyledTableCell align="left" >
                                                    <div className='titleHolder'>Emails Remaining</div>
                                                </StyledTableCell>
                                                <StyledTableCell align="center" >

                                                </StyledTableCell>
                                                <StyledTableCell align="left" >
                                                    <div className='titleHolder'>{object.emailsRemaining}/{accountSubscription.emailVolume}</div>

                                                </StyledTableCell>
                                            </TableRow>
                                            <TableRow>
                                                <StyledTableCell align="left" >
                                                    <div className='titleHolder'>SMS Remaining</div>
                                                </StyledTableCell>
                                                <StyledTableCell align="center" >

                                                </StyledTableCell>
                                                <StyledTableCell align="left" >
                                                    <div className='titleHolder'>{object.smsRemaining}/{accountSubscription.smsVolume}</div >

                                                </StyledTableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </div>
                        </div>



                    </div>








                )}






        </div>
    )
}

export default SubscriptionStatus