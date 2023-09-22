import axios from "axios";
import { authHeader } from "../Helper/Auth-header";
import { authenticationService } from "../Services/authentication.service";
import { adminAuthHeader } from "./tenant.controller";

export const adminSubscriptionService = {
  getSubscriptionList,
  createNewSubscription,
  updateSubscriptionVisibility,
  //   getSubscriptionByID,
  deleteSubscription,
  getActiveSubscriptionById,
  createActiveSubscription,
  deleteActiveSubscription,
  getActiveSubscriptionBySubId,
  updateActiveSubscription
};

function updateActiveSubscription(subscriptionId, dateStart, merchantId) {
  return axios
    .put(`${process.env.REACT_APP_API_URL + process.env.REACT_APP_API_GATEWAY}/active-subscription-service/active-subscriptions/` + subscriptionId
      , { "subscriptionStart": dateStart }

      , {
        headers: adminAuthHeader(merchantId),
        'content-type': 'application/json'
      })
    .then((response) => response.data)
    .catch((error) => Promise.reject(error.response));


}

function getActiveSubscriptionBySubId(subscriptionId, merchantId) {
  return axios
    .get(`${process.env.REACT_APP_API_URL + process.env.REACT_APP_API_GATEWAY}/active-subscription-service/active-subscriptions/` + subscriptionId, {
      headers: adminAuthHeader(merchantId),
    })
    .then((response) => response.data)
    .catch((error) => Promise.reject(error.response));
}


function deleteActiveSubscription(subscriptionId, merchantId) {

  return axios
    .delete(`${process.env.REACT_APP_API_URL + process.env.REACT_APP_API_GATEWAY}/active-subscription-service/active-subscriptions/` + subscriptionId,

      {
        headers: adminAuthHeader(merchantId),
        'content-type': 'application/json'
      }
    )
    .then((response) => response.data)
    .catch((error) => Promise.reject(error.response));
}

function createActiveSubscription(subscription, subscriptionStart, merchantId) {


  return axios
    .post(`${process.env.REACT_APP_API_URL + process.env.REACT_APP_API_GATEWAY}/active-subscription-service/active-subscriptions`,

      {
        'subscriptionId': subscription,
        'subscriptionStart': subscriptionStart,
        'amountPayable': 0
      }
      ,
      {
        headers: adminAuthHeader(merchantId),
        'content-type': 'application/json'
      }
    )
    .then((response) => response.data)
    .catch((error) => Promise.reject(error.response));
}

function getActiveSubscriptionById(merchantId) {
  return axios
    .get(`${process.env.REACT_APP_API_URL + process.env.REACT_APP_API_GATEWAY}/active-subscription-service/active-subscriptions/`, {
      headers: adminAuthHeader(merchantId),
    })
    .then((response) => response.data)
    .catch((error) => Promise.reject(error.response));
}

function getSubscriptionList() {
  return axios
    .get(`${process.env.REACT_APP_API_URL + process.env.REACT_APP_API_GATEWAY}/subscription-service/subscriptions`, {
      headers: authHeader(),
    })
    .then((response) => response.data)
    .catch((error) => Promise.reject(error.response));
}

function createNewSubscription(subscriptionData) {
  const subscriptionInfo = new FormData();
  subscriptionInfo.append("name", subscriptionData.name);
  subscriptionInfo.append("emailVolume", subscriptionData.emailVolume);
  subscriptionInfo.append("smsVolume", subscriptionData.smsVolume);
  subscriptionInfo.append("lengthInMonth", subscriptionData.lengthInMonth);
  subscriptionInfo.append("accountCreationVisible", subscriptionData.accountCreationVisible);

  let formDataJsonString = JSON.stringify(Object.fromEntries(subscriptionInfo));

  const config = {
    headers: {
      Authorization: `Bearer ` + authenticationService.hasToken(),
      'content-type': 'application/json'
    }
  }

  return axios
    .post(`${process.env.REACT_APP_API_URL + process.env.REACT_APP_API_GATEWAY}/subscription-service/subscriptions`,
      formDataJsonString, config
    )
    .then((response) => response.data)
    .catch((error) => Promise.reject(error.response));
}

function updateSubscriptionVisibility(id, accountCreationVisible) {
  const config = {
    headers: {
      Authorization: `Bearer ` + authenticationService.hasToken(),
    }
  }

  return axios
    .put(`${process.env.REACT_APP_API_URL + process.env.REACT_APP_API_GATEWAY}/subscription-service/subscriptions`,
      { id, accountCreationVisible }, config
    )
    .then((response) => response.data)
    .catch((error) => Promise.reject(error.response));
}

function deleteSubscription(subscriptionID) {
  return axios
    .delete(`${process.env.REACT_APP_API_URL + process.env.REACT_APP_API_GATEWAY}/subscription-service/subscriptions/` + subscriptionID, {
      headers: authHeader(),
    })
    .then((response) => response.data)
    .catch((error) => Promise.reject(error.response));
}