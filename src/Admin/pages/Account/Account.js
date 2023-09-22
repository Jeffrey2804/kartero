import React from 'react'
import AdminNavbar from '../../../Components/AdminNavbar';
import Sidebar from '../../../Components/Sidebar';
import CreateAccount from './Components/CreateAccount';
import '../../../Styles/AdminPage.css'

function Account(){
    return(
        <div className='adminMainPage'>
            <AdminNavbar/>
            <Sidebar/>
            <CreateAccount/>
            
            {/* <div className='AdminPage'>
                <div className='pageContent'>
                    <CreateAccount/>
                </div>
                
            </div> */}
        </div>
    )
}

export default Account