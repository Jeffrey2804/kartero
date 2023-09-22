import React from 'react'

import "../../Styles/LoginPage.css";
import logo from '../../Images/logo.png';
function LogoContainer() {
    return (
        <div className='logoContainer'>
            <img className='logoImage' src={logo} />
        </div>
    )
}

export default LogoContainer