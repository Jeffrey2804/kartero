import { Backdrop } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import AdminNavbar from '../../../Components/AdminNavbar';
import Sidebar from '../../../Components/Sidebar';
import { authenticationService } from '../../../Services/authentication.service';
import "../../../Styles/AdminPage.css";
import DashboardOverview from './Components/DashboardOverview';
// import DashboardPage from './Components/DashboardPage';

function Dashboard(){
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

    function extractData() {
        authenticationService
          .extractData()
          .then((User) => {
            localStorage.setItem("userData", JSON.stringify(User))
            localStorage.setItem("uid", User.merchantId);
            authenticationService.init();

            if (User.role != 'ADMIN') {

              navigate(-1);
    
            }else{
              setLoading(false);
            }
           
          })
          .catch((error) => {
            navigate(-1)

            console.log(error);
          });
      }
      useEffect(() => {
        extractData();
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
            <DashboardOverview/>
            </>
          }
        </div>

    )
}

export default Dashboard