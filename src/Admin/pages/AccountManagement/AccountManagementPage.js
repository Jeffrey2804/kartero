import { Backdrop } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import AdminNavbar from '../../../Components/AdminNavbar';
import Sidebar from '../../../Components/Sidebar';
import '../../../Styles/AdminPage.css'
import MerchantOverviewPage from './Components/MerchantOverviewPage';

function AccountManagementPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

    useEffect(() => {
        const user = JSON.parse(window.localStorage.getItem("userData"));
        if (user != null) {
          if (user.role != 'ADMIN') {

            navigate(-1);
    
          } else {
            setLoading(false);
          }
        } else {
          navigate(-1, {replace: true});
        }
      }, []);

    return(
        <div>
            {loading ? <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}>

        </Backdrop> :
        <>
            <AdminNavbar/>
            <Sidebar/>
            <MerchantOverviewPage/>
            </>
}
        </div>
    );
}

export default AccountManagementPage