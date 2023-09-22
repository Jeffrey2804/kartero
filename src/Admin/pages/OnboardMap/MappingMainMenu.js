import React from 'react';
import AdminNavbar from '../../../Components/AdminNavbar';
import Sidebar from '../../../Components/Sidebar';
import "../../../Styles/AdminPage.css";
import OnboardMapStepper from './Components/OnboardMapStepper';

function MappingMainMenu() {
    return(
        <div>
            <AdminNavbar />
            <Sidebar />
            <OnboardMapStepper />
        </div>
    )
}

export default MappingMainMenu