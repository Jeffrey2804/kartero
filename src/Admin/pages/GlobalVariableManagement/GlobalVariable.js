import { Backdrop } from '@mui/material';
import React, { useEffect, useState } from 'react'
import AdminNavbar from '../../../Components/AdminNavbar';
import Sidebar from '../../../Components/Sidebar';
import "../../../Styles/AdminPage.css";
import GlobalVariableList from './Components/GlobalVariableList'

function GlobalVariable() {
    const [loading, setLoading] = useState(false);
    return (
        <div className='adminMainPage'>
            {loading ? <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading}>

            </Backdrop> :
                <>
                    <AdminNavbar />
                    <Sidebar />
                    <GlobalVariableList />
                </>
            }
        </div>
    )
}

export default GlobalVariable