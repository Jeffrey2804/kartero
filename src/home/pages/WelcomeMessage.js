import React, { useEffect, useState } from 'react'
import "../../Styles/HomePage.css"
import { localstorageService } from '../../Services/localstorage.service';
import { authenticationService } from '../../Services/authentication.service';

import { accountService } from '../../Services/account.service';
function WelcomeMessage(props) {
  // const [account, setAccount] = useState({});


  // function extractAccount() {
  //   authenticationService
  //     .extractData()
  //     .then((User) => {
  //       setAccount(User);
  //     })
  //     .catch((error) => {
  //       console.log("invalid credentials");
  //       console.log(error);

  //     });
  // }

  // useEffect(() => {
  //   // storing input name
  //   extractAccount();
  // }, []);

  return (
    <div className='welcomeMessage'>Welcome to Dashboard,&nbsp;
      <div className='welcomeUser'> {props.merchantName}
      </div>
    !</div>
  )
}

export default WelcomeMessage