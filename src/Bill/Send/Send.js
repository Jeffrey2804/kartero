import React, { useState, useEffect } from 'react';
import Stack from '@mui/material/Stack';
import '../../Styles/SendPage.css';
import Alert from '@mui/material/Alert';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';

import dayjs from 'dayjs';
import { useNavigate } from "react-router-dom";

import { transactionService } from '../../Services/transaction.service';

import { configService } from '../../Services/config.service';
import { authenticationService } from "../../Services/authentication.service";
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

function Send(props) {

  const navigate = useNavigate();
  const [dateValue, setDateValue] = useState(dayjs());
  const [dateString, setDateString] = useState("");
  function goTo(pageName) {
    navigate(pageName);
  }


  const uploadFile = () => {


    const customers = JSON.stringify(props.dataFromUpload);
    const templateId = window.localStorage.getItem("tId");
    const serviceType = "email";
    // const deliveryDate = formatDate(props.dateUpload[0].startDate);
    // const dueDate = formatDate(props.dateUpload[0].endDate);


    console.log(customers);
    console.log(props.dataFromUpload);

    transactionService
      .startSendTransaction(
        customers,
        templateId,
        serviceType
        // deliveryDate,
        // dueDate

      )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {

        console.log(error.data);
      });




  }
  const getScheduledRun = () => {
    const templateId = window.localStorage.getItem("tId");

    const current = new Date();
    configService
      .getScheduledRun(
        templateId)
      .then((response) => {

        console.log(response);
        setDateValue(dateValue.date(response));
        setDateString(current.getMonth() + 1 + "/" + response + "/" + current.getFullYear());
        console.log(current.getMonth() + 1 + "/" + response + "/" + current.getFullYear());
        console.log(response);
      })
      .catch((error) => {
      });
  }



  useEffect(() => {
    getScheduledRun();
    uploadFile();
  }, [props.dataFromUpload]);


  return (
    <div className='send'>
      <ThemeProvider theme={theme}>
        <Stack spacing={2} className='sendPageContainer' direction="column" alignItems="center">

          {/* <Alert variant="filled" icon={false} className='successMessage' color='primary' > */}

          <div className='sendingDate'>  Sending scheduled for <b>{dateString}</b></div>

          {/* </Alert> */}

          {/* <Button
            onClick={() => {
              goTo(process.env.REACT_APP_PATH + "/home");
            }}

            variant="text" className='homeSendButton'>Back to Home</Button> */}

          <div className='homeSendButton hover:bg-dark-yellow-orange transition ease-in-out'
            onClick={() => {
              goTo(process.env.REACT_APP_PATH + "/home");
            }}>
            Back to Home

          </div>


        </Stack>
      </ThemeProvider>
    </div>
  )
}

export default Send