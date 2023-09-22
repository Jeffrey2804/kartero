import React, { useEffect, useState } from 'react';
import '../Styles/Navbar.css'
import navbarLogo from '../Images/logo.png';
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
import { authenticationService } from '../Services/authentication.service';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Chip from '@mui/material/Chip';


function Navbar() {
  const navigate = useNavigate();


  const [account, setAccount] = useState({});
  const [emailAddress, setEmailAdress] = useState("");


  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  function goTo(pageName) {

    navigate(pageName);
  };


  function extractAccount() {
    authenticationService
      .extractData()
      .then((User) => {
        setAccount(User);
      })
      .catch((error) => {
        console.log("invalid credentials");
        console.log(error);

      });
  }

  function logout() {
    authenticationService.logout();
    navigate(process.env.REACT_APP_PATH + "/");
    window.location.reload();
  }

  useEffect(() => {
    // storing input name
    extractAccount();
  }, []);


  return (
    <div className="navbar">
      <Link className="homeButtonText" to={process.env.REACT_APP_PATH + "/home"}>
        <img className="navbarLogo" src={navbarLogo}></img>
      </Link>



      <React.Fragment>
        <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
          <div className="links">
            <Link className="homeButtonText" to={process.env.REACT_APP_PATH + "/home"}>
              <button className='homeButton' >
                {/* <HomeIcon /> */}
                Home
              </button>


            </Link>


          </div>
          <div className='userNavName'>
            <Chip
              icon={<AccountCircleIcon />}
              label={account.username}
              onClick={handleClick}

            />

          </div>
          {/* <Typography sx={{ minWidth: 100 }}>Profile</Typography> */}
          {/* <Tooltip title="Account settings">
            <Badge color="secondary" badgeContent={99}>
              <IconButton
                onClick={handleClick}
                size="small"
                sx={{ ml: 3 }}
                aria-controls={open ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
              >
                <Avatar sx={{ width: 32, height: 32 }}>

                  <MenuOutlinedIcon />

                </Avatar>
              </IconButton>
            </Badge>
          </Tooltip> */}
        </Box>
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          {/* <MenuItem>
            <Avatar /> Profile
          </MenuItem> */}
          {/* <MenuItem>
            <Avatar /> My account
          </MenuItem> */}
          <Divider />
          {/* <MenuItem>
            <ListItemIcon>
              <PersonAdd fontSize="small" />
            </ListItemIcon>
            Add another account
          </MenuItem> */}
          <MenuItem onClick={() => {
            goTo(process.env.REACT_APP_PATH + "/subscription");
          }}>
            <ListItemIcon>
              <Settings fontSize="small" />
            </ListItemIcon>
            Manage Subscription
          </MenuItem>
          <MenuItem onClick={logout}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
      </React.Fragment>
    </div>
  )
}

export default Navbar