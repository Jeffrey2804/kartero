import React, { useState, useEffect } from 'react'
import Navbar from '../Components/Navbar'
import KarteroTab from './Components/KarteroTab'
import ReportsTabPanel from './Components/ReportsTabPanel'
import PaymentBatchOverview from './Components/PaymentBatchOverview'
import PaymentIndividualOverview from './Components/PaymentIndividualOverview'

import { createTheme, ThemeProvider } from '@mui/material/styles';

import { green, orange } from '@mui/material/colors';

import { useNavigate } from "react-router-dom";
import '../Styles/ReportsPage.css';
function Report() {
  const navigate = useNavigate();
  const defaultTheme = createTheme({
    palette: {
      primary: {
        main: orange[500],
      },
      secondary: {
        main: green[500],
      },
    }
  });





  useEffect(() => {
    const user = JSON.parse(window.localStorage.getItem("userData"));
    if (user != null) {
    
      if (user.role != 'MERCHANT') {
        navigate(-1);

      }
    } else {
      navigate(-1, { replace: true });
    }
  }, []);


  return (
    <div className='report'>
      <Navbar />
      <ThemeProvider theme={defaultTheme}>

        <ReportsTabPanel />
      </ThemeProvider>
      {/* <BatchOverview/> */}
    </div>
  )
}

export default Report