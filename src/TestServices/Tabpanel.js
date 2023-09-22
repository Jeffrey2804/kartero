import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import EmailTab from './EmailTab';
import SmsTab from './SmsTab';
import PaymentTab from './PaymentTab';
import { Payment } from '@mui/icons-material';
const theme = createTheme({
    palette: {
        primary: {

            main: '#FD9A08',
        },
        secondary: {

            main: '#11cb5f',
        },
    },
});


function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function BasicTabs(props) {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    // const [account, setAccount] = useState({});
    // function extractAccount() {
    //     authenticationService
    //         .extractData()
    //         .then((curAccount) => {
    //             setAccount(curAccount);
    //         })
    //         .catch((error) => {
    //             console.log("invalid credentials");
    //             console.log(error);

    //         });
    // }


    // useEffect(() => {
    //    console.log(props.smsList);
    //    console.log(props.smtpList);
    // }, [props.smtpList]);

    useMemo(() => {
        console.log(props.smsList);
        console.log(props.smtpList);
    }, [props.smtpList]);
    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ width: '100%', height: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="Subscription Page"
                        variant="scrollable"
                        scrollButtons="auto"
                    >
                        <Tab className='tabHeader' label="Welcome to Test Service" {...a11yProps(0)} />
                        <Tab className='tabHeader' label="Email" {...a11yProps(1)} />
                        {/* <Tab className='tabHeader' label="Change Password" {...a11yProps(1)} /> */}
                        <Tab className='tabHeader' label="SMS" {...a11yProps(2)} />
                        {/* <Tab className='tabHeader' label="Select Template" {...a11yProps(3)} /> */}
                        <Tab className='tabHeader' label="Payment" {...a11yProps(3)} />

                    </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                   
                </TabPanel>
                <TabPanel value={value} index={1} >
                    <EmailTab smtpList={props.smtpList} statusList={props.smtpStatusList} />
                </TabPanel>
                {/* <TabPanel value={value} index={1}>
                    <ChangePassword />
                </TabPanel> */}
                <TabPanel value={value} index={2}>
                    <SmsTab smsList={props.smsList} statusList={props.statusList} />
                </TabPanel>
                {/* <TabPanel value={value} index={3}>
                    <SelectTemplate />
                </TabPanel> */}
                <TabPanel value={value} index={3}>
                    {/* <PaymentTab paymentList = {props.paymentList}/> */}
                </TabPanel>

            </Box>
        </ThemeProvider>
    );
}
