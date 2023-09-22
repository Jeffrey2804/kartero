import React, { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar'
import "../Styles/HomePage.css"
// import MainMenu from './pages/MaineMenu'

import MainMenu from './pages/MainMenu'
import WelcomeMessage from './pages/WelcomeMessage'

import { authenticationService } from '../Services/authentication.service';

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import SendingSummary from '../home/pages/SendingSummary'
import { useNavigate } from "react-router-dom";
import Stack from '@mui/material/Stack';
function HomePage() {

  const navigate = useNavigate();
  const [account, setAccount] = useState({});

  const [loading, setLoading] = useState(true);

  function extractAccount() {



    authenticationService
      .extractData()
      .then((User) => {
        localStorage.setItem("userData", JSON.stringify(User))
        localStorage.setItem("uid", User.merchantId);
        authenticationService.init();
        if (User.role != 'MERCHANT') {

          navigate(-1);

        }
        setAccount(User);
        setLoading(false);
      })
      .catch((error) => {
        navigate(-1);
        console.log(error);

      });


    console.log(localStorage.getItem("karteroId"));

    // if (!localStorage.getItem("karteroId")) {
    //   navigate(process.env.REACT_APP_PATH + "/");
    // }

  }

  useEffect(() => {
    // storing input name
    extractAccount();
  }, []);




  return (
    <div className='homePage'>
      <Navbar />
      {loading ? <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
        :
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={0}
        >

          <WelcomeMessage merchantName={account.firstName + " " + account.lastName} />
          <MainMenu merchantId={account.merchantId} />
          {/* <SendingSummary /> */}
        </Stack>
      }
    </div>
  )
}

export default HomePage