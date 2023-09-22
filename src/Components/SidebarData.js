import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import React, { useState } from 'react';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
export const SidebarData = [
    {
        title: "Dashboard",
        icon: <MenuIcon />,
        link: process.env.REACT_APP_PATH + "/dashboard"
    },
    // {
    //     title : "Accounts",
    //     icon : "",
    //     link : process.env.REACT_APP_PATH + "/account"
    // },
    // {
    //     title : "SOA Creation",
    //     icon : "",
    //     link : process.env.REACT_APP_PATH + "/soa-creation"
    // },
    // {
    //     title : "Application Settings",
    //     icon : "",
    //     link : process.env.REACT_APP_PATH + "/app-settings"
    // },
    // {
    //     title : "Profile",
    //     icon : "",
    //     link : process.env.REACT_APP_PATH + "/profile"
    // },
    // {
    //     title : "Payment Reports",
    //     icon : "",
    //     link : process.env.REACT_APP_PATH + "/payment-reports"
    // }
    {
        title: "Accounts Management",
        icon: <AccountCircleIcon/>,
        link: process.env.REACT_APP_PATH + "/accountsManagement",
    },
    {
        title: "Pattern Management",
        icon: <FileCopyIcon/>,
        link: process.env.REACT_APP_PATH + "/patternManagement",
    },
    {
        title: "Subscription Planner",
        icon: <CalendarMonthIcon/>,
        link: process.env.REACT_APP_PATH + "/subscriptionManagement",
    },
    {
        title: "Global Variables",
        icon: <AccountTreeIcon/>,
        link: process.env.REACT_APP_PATH + "/globalVariable",
    },

];

