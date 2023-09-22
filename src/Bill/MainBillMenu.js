import React, { useEffect } from 'react'
import Navbar from '../Components/Navbar'

import { useNavigate } from "react-router-dom";
import BreadCrumbs from 'react-bootstrap/Breadcrumb';
import KarteroStepper from '../Bill/Components/KarteroStepper'
import Template from './Template/Template';
import '../Styles/BillMenu.css'
function MainBilling(props) {

  const navigate = useNavigate();
  const pull_data = (data) => {
    console.log(data); // LOGS DATA FROM CHILD (My name is Dean Winchester... &)
  }


  useEffect(() => {
    const user = JSON.parse(window.localStorage.getItem("userData"));
  

    if (user != null) {
      if (user.role != 'MERCHANT') {


        navigate(-1, { replace: true });

      }
    } else {
      navigate(-1, { replace: true });
    }
  }, []);


  return (
    <div className='mainBillMenu'>
      <Navbar />

      <KarteroStepper />

    </div>
  )
}

export default MainBilling