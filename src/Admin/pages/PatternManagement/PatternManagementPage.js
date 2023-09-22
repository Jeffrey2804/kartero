import { Backdrop } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import AdminNavbar from '../../../Components/AdminNavbar';
import Sidebar from '../../../Components/Sidebar';
import '../../../Styles/AdminPage.css'
import PatternPage from './Components/PatternPage';

function PatternManagementPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = JSON.parse(window.localStorage.getItem("userData"));
    console.log((user))
    if (user != null) {
      if (user.role != 'ADMIN') {

        navigate(-1);

      } else {
        setLoading(false);
      }
    } else {
      navigate(-1, { replace: true });
    }
  }, []);

  return (
    <div className='adminMainPage'>
      {loading ? <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}>

      </Backdrop> :
        <>
          <AdminNavbar />
          <Sidebar />
          <PatternPage />
        </>
      }
    </div>
  )
}

export default PatternManagementPage