import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import SubscriptionStatus from './SubscriptionStatus';
import SelectTemplate from './SelectTemplate';
import ChangePassword from '../Components/ChangePassword_v2';
import ContactSupport from './ContactSupport';
import RunScheduler from './RunScheduler';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { authenticationService } from '../../Services/authentication.service';
import TemplateManagement from './TemplateManagement';
import { subscriptionService } from '../../Services/subscription.service';
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
    const [headerTitle, setHeaderTitle] = useState("Subscription Status");
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

    const [activeSubscription, setActiveSubscription] = useState([]);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const [account, setAccount] = useState({});
    function extractAccount() {
        authenticationService
            .extractData()
            .then((curAccount) => {
                setAccount(curAccount);
            })
            .catch((error) => {
                console.log("invalid credentials");
                console.log(error);

            });
    }



    const getActiveSubscription = () => {

        subscriptionService
            .getActiveSubscription()
            .then((response) => {
                setActiveSubscription(response);
            })
            .catch((error) => {

            })
    }
    useEffect(() => {
        extractAccount();
        getActiveSubscription();
    }, []);


    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ width: '100%', height: '100%', color: "#979797" }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }} className="tabMenu">
                    <Tabs value={value} onChange={handleChange} aria-label="Subscription Page"
                        variant="scrollable"
                        scrollButtons="auto"

                    >
                        <Tab className='tabHeader' label="Subscription Status" {...a11yProps(0)} />

                        <Tab className='tabHeader' label="Contact Support" {...a11yProps(1)} />
                        {/* <Tab className='tabHeader' label="Select Template" {...a11yProps(2)} /> */}
                        <Tab className='tabHeader' label="Template Management" {...a11yProps(2)} />
                        <Tab className='tabHeader' label="Run Scheduler" {...a11yProps(3)} />
                        <Tab className='tabHeader' label="Change Password" {...a11yProps(4)} />
                    </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                    <SubscriptionStatus activeSubscription={activeSubscription} merchantId={account.merchantId} />
                </TabPanel>

                <TabPanel value={value} index={1}>
                    <ContactSupport />
                </TabPanel>
                {/* <TabPanel value={value} index={3}>
                    <SelectTemplate />
                </TabPanel> */}
                <TabPanel value={value} index={2}>
                    
                    <TemplateManagement merchantId={account.merchantId} />
                </TabPanel>
                <TabPanel value={value} index={3}>
                    <RunScheduler />
                </TabPanel>
                <TabPanel value={value} index={4}>
                    <ChangePassword />
                </TabPanel>
            </Box>
        </ThemeProvider>
    );
}
