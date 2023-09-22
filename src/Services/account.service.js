import axios from "axios";
import { authHeader } from "../Helper/Auth-header";
import jwt_decode from "jwt-decode";
import Cookies from "universal-cookie";

import { authenticationService } from "./authentication.service";
export const accountService = {
  getAccountByEmail,
  getAllAccount,
  getAccountSubscription,
  getAllAccountSubscription,
  changePassword,
  getActiveTemplateId,
};


function getAccountByEmail(emailAddress) {
  return axios
    .get(`${process.env.REACT_APP_API_URL}/gateway-service/accounts-service/users/u/${emailAddress}`, {
      headers: authHeader(),
    })
    .then((response) => response.data)
    .catch((error) => Promise.reject(error.response));

}

function getActiveTemplateId() {
  return axios
    .get(`${process.env.REACT_APP_API_URL}/gateway-service/account-service/merchants/active-template-id`, {
      headers: authHeader(),
    })
    .then((response) => response.data)
    .catch((error) => Promise.reject(error.response));

}

function getAllAccount() {
  return axios
    .get(`${process.env.REACT_APP_API_URL + process.env.REACT_APP_API_GATEWAY}/users`, {
      headers: authHeader(),
    })
    .then((response) => response.data)
    .catch((error) => Promise.reject(error.response));


}

function getAccountSubscription(subscriptionId) {
  return axios
    .get(`${process.env.REACT_APP_API_URL + process.env.REACT_APP_API_GATEWAY}/subscription-service/subscriptions/` + subscriptionId, {
      headers: authHeader(),
    })
    .then((response) => response.data)
    .catch((error) => Promise.reject(error.response));
}


function getAllAccountSubscription() {
  return axios
    .get(`${process.env.REACT_APP_API_URL + process.env.REACT_APP_API_GATEWAY}/account-service/merchants/merchant`, {
      headers: authHeader(),
    })
    .then((response) => response.data)
    .catch((error) => Promise.reject(error.response));
}


function changePassword(id, emailAddress, oldPassword, newPassword) {

  const config = {
    headers: {
      Authorization: `Bearer ` + authenticationService.hasToken(),
      'content-type': 'application/json'
    }
  }

  return axios
    .put(`${process.env.REACT_APP_API_URL}/gateway-service/account-service/users/update-password`,
      {
        "id": id,
        "emailAddress": emailAddress,
        "oldPassword": oldPassword,
        "newPassword": newPassword
      },
      config)
    .then((response) => response.data)
    .catch((error) => Promise.reject(error.response));
}