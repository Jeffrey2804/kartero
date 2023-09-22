import axios from "axios";
import { authHeader } from "../Helper/Auth-header";
import jwt_decode from "jwt-decode";
import Cookies from "universal-cookie";

import { authenticationService } from "./authentication.service";
import { adminAuthHeader } from "../AdminServices/tenant.controller";
export const subscriptionService = {
    getCurrentSubscription,
    testThis,
    getActiveSubscription,
    getActiveSubscriptionById,
};

function getActiveSubscriptionById(merchantId, adminId) {
    return axios
        .get(`${process.env.REACT_APP_API_URL}/gateway-service/active-subscription-service/active-subscriptions` , {
            headers: adminAuthHeader(merchantId),
        })
        .then((response) => response.data)
        .catch((error) => Promise.reject(error.response));

}
function getCurrentSubscription(merchantId) {
    return axios
        .get(`${process.env.REACT_APP_API_URL}/gateway-service/account-service/merchants/merchant`, {
            headers: authHeader(),
        })
        .then((response) => response.data)
        .catch((error) => Promise.reject(error.response));

}


function getActiveSubscription() {
    return axios
        .get(`${process.env.REACT_APP_API_URL}/gateway-service/active-subscription-service/active-subscriptions`, {
            headers: authHeader(),
        })
        .then((response) => response.data)
        .catch((error) => Promise.reject(error.response));
}



function testThis(path) {
    const config = {
        headers: {
            Authorization: `Bearer ` + authenticationService.hasToken(),
            'content-type': 'text/plain'
        }
    }
    return axios

        .put(`${process.env.REACT_APP_API_URL}/gateway-service/configuration-service/patterns/statement-fields`, path, config)
        .then((response) => response.data)
        .catch((error) => Promise.reject(error.response));

}
