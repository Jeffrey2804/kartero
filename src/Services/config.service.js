import axios from "axios";
import { authHeader } from "../Helper/Auth-header";
import jwt_decode from "jwt-decode";
import Cookies from "universal-cookie";

import { authenticationService } from "./authentication.service";
export const configService = {
    updateScheduledRun,
    getScheduledRun,
    updateScheduledRunWithDueDate,
    updateDayOfTheMonthDue,
    updateDayOfTheMonthDelivery,
    getDayOfDue,
    getDayOfDelivery
};


function getDayOfDelivery(id) {
    const config = {
        headers: {
            Authorization: `Bearer ` + authenticationService.hasToken(),
            'content-type': 'application/json'
        }
    }
    return axios

        .get(`${process.env.REACT_APP_API_URL}/gateway-service/configuration-service/` + id + `/get/day-of-month-delivery`,
            config)
        .then((response) => response.data)
        .catch((error) => Promise.reject(error.response));
}

function getDayOfDue(id) {
    const config = {
        headers: {
            Authorization: `Bearer ` + authenticationService.hasToken(),
            'content-type': 'application/json'
        }
    }
    return axios

        .get(`${process.env.REACT_APP_API_URL}/gateway-service/configuration-service/` + id + `/get/day-of-month-due`,
            config)
        .then((response) => response.data)
        .catch((error) => Promise.reject(error.response));
}



function updateDayOfTheMonthDue(id, dayOfTheMonthDelivery) {

    const config = {
        headers: {
            Authorization: `Bearer ` + authenticationService.hasToken(),
            'content-type': 'application/json'
        }
    }
    return axios

        .put(`${process.env.REACT_APP_API_URL}/gateway-service/configuration-service/` +
            id +
            `/set/day-of-month-due`,
            dayOfTheMonthDelivery, config)
        .then((response) => response.data)
        .catch((error) => Promise.reject(error.response));
}
function updateDayOfTheMonthDelivery(id, dayOfTheMonthDelivery) {

    const config = {
        headers: {
            Authorization: `Bearer ` + authenticationService.hasToken(),
            'content-type': 'application/json'
        }
    }
    return axios

        .put(`${process.env.REACT_APP_API_URL}/gateway-service/configuration-service/` +
            id +
            `/set/day-of-month-delivery`,
            dayOfTheMonthDelivery, config)
        .then((response) => response.data)
        .catch((error) => Promise.reject(error.response));
}



function updateScheduledRun(id, dayOfTheMonthDelivery) {

    const config = {
        headers: {
            Authorization: `Bearer ` + authenticationService.hasToken(),
            'content-type': 'application/json'
        }
    }
    return axios

        .put(`${process.env.REACT_APP_API_URL}/gateway-service/configuration-service/` +
            id +
            `/set/dayOfMonthDelivery`,
            dayOfTheMonthDelivery, config)
        .then((response) => response.data)
        .catch((error) => Promise.reject(error.response));
}



function updateScheduledRunWithDueDate(id, dayOfTheMonthDelivery, dueDate) {

    const config = {
        headers: {
            Authorization: `Bearer ` + authenticationService.hasToken(),
            'content-type': 'application/json'
        }
    }
    return axios

        .put(`${process.env.REACT_APP_API_URL}/gateway-service/transaction-service/transactions/update/due-date?dayOfMonthDelivery=` + dayOfTheMonthDelivery +
            "&daysUntilDueDate=" + dueDate,
            dayOfTheMonthDelivery, config)
        .then((response) => response.data)
        .catch((error) => Promise.reject(error.response));
}


function getScheduledRun(id) {
    const config = {
        headers: {
            Authorization: `Bearer ` + authenticationService.hasToken(),
            'content-type': 'application/json'
        }
    }
    return axios

        .get(`${process.env.REACT_APP_API_URL}/gateway-service/configuration-service/` + id + `/get/day-of-month-delivery`,
            config)
        .then((response) => response.data)
        .catch((error) => Promise.reject(error.response));
}