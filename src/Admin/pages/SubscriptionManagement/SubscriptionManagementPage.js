import { Backdrop } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import AdminNavbar from '../../../Components/AdminNavbar';
import Sidebar from '../../../Components/Sidebar';
import '../../../Styles/AdminPage.css'
import SubscriptionOverview from './Components/SubscriptionOverview';

function SubscriptionManagementPage(){
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

    useEffect(() => {
        const user = window.localStorage.getItem("userData");
        console.log((user))
        if (user != null) {
          if (!JSON.parse(user).roles === ('ADMIN')) {
            navigate(-1, {replace: true});

          }
          else {
            setLoading(false);
          }
        } else {
          navigate(-1, {replace: true});
        }
      }, []);

    return(
        <div className='adminMainPage'>
          {loading ? <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}>

        </Backdrop> :
        <>
            <AdminNavbar/>
            <Sidebar/>
            <SubscriptionOverview/>
            </>
}
        </div>
    )
}

export default SubscriptionManagementPage