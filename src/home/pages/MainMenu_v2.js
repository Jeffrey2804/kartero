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
        <div>


            <article class="overflow-hidden rounded-lg shadow transition hover:shadow-lg">
                <img
                    alt="Office"
                    src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
                    class="h-56 w-full object-cover"
                />

                <div class="bg-white p-4 sm:p-6">
                    <time datetime="2022-10-10" class="block text-xs text-gray-500">
                        10th Oct 2022
                    </time>

                    <a href="#">
                        <h3 class="mt-0.5 text-lg text-gray-900">
                            How to position your furniture for positivity
                        </h3>
                    </a>

                    <p class="mt-2 line-clamp-3 text-sm/relaxed text-gray-500">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae
                        dolores, possimus pariatur animi temporibus nesciunt praesentium dolore
                        sed nulla ipsum eveniet corporis quidem, mollitia itaque minus soluta,
                        voluptates neque explicabo tempora nisi culpa eius atque dignissimos.
                        Molestias explicabo corporis voluptatem?
                    </p>
                </div>
            </article>


            <article class="overflow-hidden rounded-lg shadow transition hover:shadow-lg">
                <img
                    alt="Office"
                    src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
                    class="h-56 w-full object-cover"
                />

                <div class="bg-white p-4 sm:p-6">
                    <time datetime="2022-10-10" class="block text-xs text-gray-500">
                        10th Oct 2022
                    </time>

                    <a href="#">
                        <h3 class="mt-0.5 text-lg text-gray-900">
                            How to position your furniture for positivity
                        </h3>
                    </a>

                    <p class="mt-2 line-clamp-3 text-sm/relaxed text-gray-500">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae
                        dolores, possimus pariatur animi temporibus nesciunt praesentium dolore
                        sed nulla ipsum eveniet corporis quidem, mollitia itaque minus soluta,
                        voluptates neque explicabo tempora nisi culpa eius atque dignissimos.
                        Molestias explicabo corporis voluptatem?
                    </p>
                </div>
            </article>

            <article class="overflow-hidden rounded-lg shadow transition hover:shadow-lg">
                <img
                    alt="Office"
                    src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
                    class="h-56 w-full object-cover"
                />

                <div class="bg-white p-4 sm:p-6">
                    <time datetime="2022-10-10" class="block text-xs text-gray-500">
                        10th Oct 2022
                    </time>

                    <a href="#">
                        <h3 class="mt-0.5 text-lg text-gray-900">
                            How to position your furniture for positivity
                        </h3>
                    </a>

                    <p class="mt-2 line-clamp-3 text-sm/relaxed text-gray-500">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae
                        dolores, possimus pariatur animi temporibus nesciunt praesentium dolore
                        sed nulla ipsum eveniet corporis quidem, mollitia itaque minus soluta,
                        voluptates neque explicabo tempora nisi culpa eius atque dignissimos.
                        Molestias explicabo corporis voluptatem?
                    </p>
                </div>
            </article>
        </div>
    )
}

export default MainMenu