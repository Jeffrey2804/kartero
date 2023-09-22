import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Upload from '../../Images/upload.png';
import Report from '../../Images/report.png';
import Manage from '../../Images/manage.png';
import "../../Styles/HomePage.css"
import { useNavigate } from "react-router-dom";

import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';

import Box from '@mui/material/Box';

import { subscriptionService } from '../../Services/subscription.service';
import { privateRoute } from '../../util/PrivateRoute';
import sendingSummary from './SendingSummary';

function MainMenu(props) {
    const [subscription, setSubscription] = useState({});
    const navigate = useNavigate();
    const [userData, setUserData] = useState([]);
    function goTo(pageName, role) {
        // privateRoute.goTo(pageName, role);

        // console.log(checkRole(window.localStorage.getItem("userData")).roles, role);
        // if (checkRole(window.localStorage.getItem("userData")).roles, role) {

        navigate(pageName);
        // }
    }


    function checkRole(arr1, arr2) {
        return JSON.parse(arr1).some(item => arr2.includes(item))
    }


    const getSubscriptionStatus = (merchantId) => {

        subscriptionService
            .getCurrentSubscription(merchantId)
            .then((response) => {
                // localStorage.setItem("subData", JSON.stringify(response));
                // localStorage.setItem("tId", response.activeTemplateId);

                setSubscription(response);

            })
            .catch((error) => {
                console.log(error);
            });
    }

    const getCurrentDate = (curDate) => {

        curDate = new Date()
        let date = curDate.getDate();
        let month = curDate.getMonth() + 1;
        let year = curDate.getFullYear();

        return `${month < 10 ? `0${month}` : `${month}`}${'/'}${date}${'/'}${year}`
    }

    useEffect(() => {

        // storing input name
        const userData = window.localStorage.getItem("userData");
        if (userData !== null) {
            setUserData(JSON.parse(userData));

            getSubscriptionStatus(JSON.parse(userData).merchantId);
        } else {

            console.log("empty");
        }

    }, []);
    return (
        <div class="grid xl:grid-flow-col md:grid-flow-col sm:grid-flow-row gap-10 m-10 p-10 place-content-center ">
            <div className='bg-white rounded-md pb-14 h-131 place-content-center text-center shadow-md hover:shadow-equal transition ease-in-out hover:scale-102 2xl:w-131 laptop:w-112 cursor-pointer' 
            onClick={() => {
                goTo(process.env.REACT_APP_PATH + "/bill", ["ADMIN", "MERCHANT"]);
            }}>
                <img className='object-contain h-112 mx-auto px-auto xl:w-auto md:w-auto' src={Upload} />
                <div className='w-auto px-auto'>
                    <h1 className='xl:text-3xl md:text-2xl sm:text-xl xs:text-lg text-yellow-orange font-official'>UPLOAD BILLING</h1>
                </div>
            </div>
            <div className='bg-white rounded-md pb-14 h-131 place-content-center text-center shadow-md hover:shadow-equal transition ease-in-out hover:scale-102 2xl:w-131 laptop:w-112 cursor-pointer'
            onClick={() => {
                goTo(process.env.REACT_APP_PATH + "/report");
            }}>
                <img className='object-contain h-112 mx-auto px-auto xl:w-auto md:w-auto' src={Report} />
                <div className='w-auto px-auto'>
                    <h1 className='xl:text-3xl md:text-2xl sm:text-xl xs:text-lg text-yellow-orange font-official'>REPORT STATUS</h1>
                </div>
            </div>
            <div className='bg-white rounded-md pb-14 h-131 place-content-center text-center shadow-md hover:shadow-equal transition ease-in-out hover:scale-102 2xl:w-131 laptop:w-112 cursor-pointer'
            onClick={() => {
                goTo(process.env.REACT_APP_PATH + "/subscription");
            }}>
            <img className='object-contain h-112 mx-auto px-auto xl:w-auto md:w-auto' src={Manage} />
                <div className='w-auto px-auto'>
                    <h1 className='xl:text-3xl md:text-2xl sm:text-xl xs:text-lg text-yellow-orange font-official'>MANAGE SUBSCRIPTION</h1>
                </div>
            </div>
        </div>
    )
}

export default MainMenu