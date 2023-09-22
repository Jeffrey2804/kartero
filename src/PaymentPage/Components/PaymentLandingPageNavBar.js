import React, { useEffect, useState } from 'react';
import '../../Styles/Navbar.css'
import navbarLogo from '../../Images/logo.png';
import { useNavigate } from "react-router-dom";
import { Outlet, Link } from "react-router-dom";
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import Badge from '@mui/material/Badge';
import Stack from '@mui/material/Stack';

function Navbar() {
  const navigate = useNavigate();


  

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };



 


  return (
    <div className="navbar">
      <Link className="homeButtonText" to={process.env.REACT_APP_PATH + "/home"}>
        <img className="navbarLogo" src={navbarLogo}></img>
      </Link>



      <React.Fragment>
        <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
          <div className="links">
            <Link className="homeButtonText" to={process.env.REACT_APP_PATH + "/home"}>
              {/* <button className='homeButton' > */}
                {/* Return to Account */}
              {/* </button> */}
            </Link>


          </div>
           {/* <Typography sx={{ minWidth: 100 }}>Profile</Typography> */}
          
        </Box>
        
      </React.Fragment>
    </div>
  )
}

export default Navbar