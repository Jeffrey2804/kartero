import axios from "axios";
import { authHeader } from "../Helper/Auth-header";
import jwt_decode from "jwt-decode";
import Cookies from "universal-cookie";
import { authenticationService } from "./authentication.service";

export const reportsService = {
    getPaymentBatchOverview,
    getPaymentIndividualOverview,
    getDeliveryBatchOverview,
    getDeliveryIndividualOverview,
    getIndividualDelivery,
};


function getPaymentBatchOverview(merchantId) {
    return axios
        .get(`${process.env.REACT_APP_API_URL}/gateway-service/report-service/reports/batch-payment`, {
            headers: authHeader(),
        })
        .then((response) => response.data)
        .catch((error) => Promise.reject(error.response));
}

function getPaymentIndividualOverview(statementId) {
    return axios
        .get(`${process.env.REACT_APP_API_URL}/gateway-service/report-service/reports/customer-payment/` + statementId, {
            headers: authHeader(),
        })
        .then((response) => response.data)
        .catch((error) => Promise.reject(error.response));


}


function getDeliveryBatchOverview(merchantId) {

    return axios
        .get(`${process.env.REACT_APP_API_URL}/gateway-service/report-service/reports/batch-delivery`, {
            headers: authHeader(),


        })
        .then((response) => response.data)
        .catch((error) => Promise.reject(error.response));
}

function getDeliveryIndividualOverview(statementId) {
    const config = {
        headers: {
            Authorization: `Bearer ` + authenticationService.hasToken(),
            'content-type': 'application/json;UTF-8',
            charset: 'utf-8',
            responseEncodig: 'utf-8'
        }
    }
    return axios
        .get(`${process.env.REACT_APP_API_URL}/gateway-service/report-service/reports/customer-delivery/` + statementId, config)
        .then((response) => response.data)
        .catch((error) => Promise.reject(error.response));
}



function getIndividualDelivery(requestId) {
    return axios
        .get(`${process.env.REACT_APP_API_URL}/gateway-service/report-service/requests/` + requestId, {
            headers: authHeader(),
        })
        .then((response) => response.data)
        .catch((error) => Promise.reject(error.response));
}