import React, { useEffect } from 'react';
import "../Styles/LoginPage.css";
import cloud from '../Images/cloud.png';
import LoginForm from '../login/Components/LoginForm';
import { privateRoute } from '../util/PrivateRoute';
function Login() {

 

  return (
    <div className='login'>
      <img className='topCloudImage' src={cloud} />

      <LoginForm />
      <img className='botCloudImage' src={cloud} />
    </div>
  )
}

export default Login