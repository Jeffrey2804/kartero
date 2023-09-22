import React, { useEffect } from 'react'
import { TabPane } from 'react-bootstrap'
import Navbar from '../Components/Navbar'
import TabPanel from './Components/Tabpanel';
import '../Styles/ManageSubscription.css';

import { useNavigate } from "react-router-dom";
import TitleBar from './Components/TitleBar';
function Subscription() {

  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(window.localStorage.getItem("userData"));

    if (user.role != 'MERCHANT') {

      navigate(process.env.REACT_APP_PATH + "/");

    }
  }, []);


  const getHeaderTitle = (headerTitle) => {

    console.log(headerTitle);
  }

  return (
    <div className='manageSubscription'>
      <Navbar />
      <TitleBar />
      <TabPanel headerTitle={getHeaderTitle}/>
    </div>
  )
}

export default Subscription