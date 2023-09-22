import axios from "axios";
import { authHeader } from "../Helper/Auth-header";
import jwt_decode from "jwt-decode";
import Cookies from "universal-cookie";

import { authenticationService } from "./authentication.service";
export const verificationService = {
    verify,
    getCustomerInfo,
};


function getCustomerInfo(merchantId, requestId) {
   
    return axios
        .get(`${process.env.REACT_APP_API_URL_PROXY}/payment-service/api/request?merchantId=`+merchantId+`&requestId=` + requestId, {
            // headers: authHeader(),
        })
        .then((response) => response.data)
        .catch((error) => Promise.reject(error.response));
}


function verify(verificationCode) {
    return axios
        .get(`${process.env.REACT_APP_API_URL}/gateway-service/public/verification/verify/` + verificationCode, {
            // headers: authHeader(),
        })
        .then((response) => response.data)
        .catch((error) => Promise.reject(error.response));
}


function generateCode(requestId) {

    return axios
        .get(`${process.env.REACT_APP_API_URL}/transaction-service/verification/generate/` + requestId)
        .then((response) => response.data)
        .catch((error) => Promise.reject(error.response));
}
