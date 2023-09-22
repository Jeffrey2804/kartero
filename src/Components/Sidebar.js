import React from 'react';
import {SidebarData} from './SidebarData';
import "../Styles/Sidebar.css";
import { InputAdornment, TextField } from '@mui/material';
import { Search } from '@mui/icons-material';

function Sidebar(){
  return(
    <div className='Sidebar'>
      <div className='searchContainer'>
        <form>
          <input type="text"  name='search' className='searchBox' style={{border: 'hidden', backgroundColor: 'transparent'}}/>
          {/* <TextField placeholder='Search' 
            InputProps={{
              startAdornment : (
                <InputAdornment position='end'>
                  <Search/>
                </InputAdornment>
              )
            }} /> */}
          
        </form>
      </div>
      <div className='label'>
        {/* <p>General</p> */}
      </div>
      <ul className='SidebarList'>
        {SidebarData.map((val, key) => {
          return (
            <li key = {key}
            className='row'
            id = {window.location.pathname == val.link ? "active" : ""}
            onClick = {() => {window.location.pathname = val.link}}>
              <div id='icon'>{val.icon}</div>
              <div id='pages'>{val.title}</div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Sidebar;