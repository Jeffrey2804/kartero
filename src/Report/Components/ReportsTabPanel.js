import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import PaymentBatchOverview_v2 from './PaymentBatchOverview_v2';
import DeliveryBatchOverview_v2 from './DeliveryBatchOverview_v2';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { authenticationService } from '../../Services/authentication.service';


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

export default function BasicTabs() {
    const [value, setValue] = React.useState(0);

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


    useEffect(() => {
        extractAccount();

    }, []);


    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ width: '100%', height: '30vh', color: "#979797" }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }} className="tabMenu">
                    <Tabs value={value} onChange={handleChange} aria-label="Reports page"
                        variant="scrollable"
                        scrollButtons="auto"

                    >

                        <Tab className='tabHeader' label="Payment Overview" {...a11yProps(0)} />
                        {/* <Tab className='tabHeader' label="Select Template" {...a11yProps(2)} /> */}
                        <Tab className='tabHeader' label="Delivery Overview" {...a11yProps(1)} />

                    </Tabs>
                </Box>

                <TabPanel value={value} index={0}>
                    <PaymentBatchOverview_v2 />
                </TabPanel>
                {/* <TabPanel value={value} index={3}>
                    <SelectTemplate />
                </TabPanel> */}
                <TabPanel value={value} index={1}>
                    <DeliveryBatchOverview_v2 />
                </TabPanel>


            </Box>
        </ThemeProvider>
    );
}
