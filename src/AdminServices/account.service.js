import axios from "axios";
import { authHeader } from "../Helper/Auth-header";
import { authenticationService } from "../Services/authentication.service";
import { adminAuthHeader } from "./tenant.controller";

export const adminAccountService = {
  getAllMerchant,
  createNewMerchant,
  createNewUser,
  getAllUsers,
  getMerchantThroughID,
  updateActiveTemplate,
  getActiveSubsById,
  getActiveSubsByMerchantId,
  // deleteMerchant,
  // deleteUser
  getActiveTemplateId,
};

function getActiveSubsByMerchantId(merchantId) {
  return axios
    .get(`${process.env.REACT_APP_API_URL + process.env.REACT_APP_API_GATEWAY}/active-subscription/active-subscriptions/` + merchantId, {
      headers: adminAuthHeader(merchantId),
    })
    .then((response) => response.data)
    .catch((error) => Promise.reject(error.response));
}
function getActiveTemplateId(merchantId) {
  return axios
    .get(`${process.env.REACT_APP_API_URL + process.env.REACT_APP_API_GATEWAY}/account-service/merchants/active-template-id`, {
      headers: adminAuthHeader(merchantId),
    })
    .then((response) => response.data)
    .catch((error) => Promise.reject(error.response));
}
function getActiveSubsById(templateId, merchantId) {
  return axios
    .get(`${process.env.REACT_APP_API_URL + process.env.REACT_APP_API_GATEWAY}/active-subscription-service/active-subscriptions/template-id/` + templateId, {
      headers: adminAuthHeader(merchantId),
    })
    .then((response) => response.data)
    .catch((error) => Promise.reject(error.response));
}

function getAllMerchant() {
  return axios
    .get(`${process.env.REACT_APP_API_URL + process.env.REACT_APP_API_GATEWAY}/account-service/merchants`, {
      headers: authHeader(),
    })
    .then((response) => response.data)
    .catch((error) => Promise.reject(error.response));
}

function getAllUsers(merchantId) {
  console.log("Test", merchantId);
  return axios
    .get(`${process.env.REACT_APP_API_URL + process.env.REACT_APP_API_GATEWAY}/account-service/users/merchant`, {
      headers: adminAuthHeader(merchantId),
    })
    .then((response) => response.data)
    .catch((error) => Promise.reject(error.response));
}


function createNewMerchant(userInformation) {
  const userInfo = new FormData();
  userInfo.append("subscriptionId", userInformation.subscriptionId);
  userInfo.append("companyName", userInformation.companyName);
  userInfo.append("companyTradeName", userInformation.companyTradeName);
  userInfo.append("companyAddress", '1');
  userInfo.append("companyStreetAddress", userInformation.companyStreetAddress);
  userInfo.append("companyCityAddress", userInformation.compantCityAddress);
  userInfo.append("companyRegion", userInformation.companyRegionAddress);
  userInfo.append("companyZipCode", userInformation.companyZipCode);
  userInfo.append("companyEmailAddress", userInformation.companyEmailAddress);
  userInfo.append("companyCustomerRelationsEmailAddress", userInformation.companyCustomerRelationsEmail);
  userInfo.append("companyMobileNumber1", userInformation.companyMobileNumber1);
  userInfo.append("companyMobileNumber2", userInformation.companyMobileNumber2);
  userInfo.append("companyTelephoneNumber1", userInformation.companyPhoneNumber1);
  userInfo.append("companyTelephoneNumber2", userInformation.companyPhoneNumber2);
  userInfo.append("companyWebsite", userInformation.companyWebsite);
  userInfo.append("companyFacebookPage", userInformation.companyFacebook);
  userInfo.append("companyTelegramPage", userInformation.companyInstagram);
  userInfo.append("companyInstagramPage", userInformation.companyInstagram);
  userInfo.append("companyCustomerServiceWebsite", userInformation.companyYoutube);
  userInfo.append("subscriptionStart", userInformation.subscriptionStart);
  userInfo.append("subscriptionPlan", userInformation.subscriptionExpiry);

  let formDataJsonString = JSON.stringify(Object.fromEntries(userInfo));
  const config = {
    headers: {
      Authorization: `Bearer ` + authenticationService.hasToken(),
      'content-type': 'application/json'
    }
  }

  return axios
    .post(`${process.env.REACT_APP_API_URL + process.env.REACT_APP_API_GATEWAY}/account-service/merchants`,
      formDataJsonString, config
    )
    // .then((response) => response.data)
    .then((response) =>
      response.data.id
    )
    .catch((error) => Promise.reject(error.response));
}

function createNewUser(userInformation) {
  const userInfo = new FormData();
  userInfo.append("username", userInformation.userName);
  userInfo.append("password", userInformation.password);
  userInfo.append("merchantId", userInformation.merchantId);
  userInfo.append("firstName", userInformation.firstName);
  userInfo.append("lastName", userInformation.lastName);
  userInfo.append("role", userInformation.role);

  let formDataJsonString = JSON.stringify(Object.fromEntries(userInfo));

  const config = {
    headers: {
      Authorization: `Bearer ` + authenticationService.hasToken(),
      'content-type': 'application/json'
    }
  }

  return axios
    .post(`${process.env.REACT_APP_API_URL + process.env.REACT_APP_API_GATEWAY}/account-service/users`,
      formDataJsonString, config
    )
    .then((response) => response.data)
    .catch((error) => Promise.reject(error.response));
}

function getMerchantThroughID(merchantId) {
  return axios
    .get(`${process.env.REACT_APP_API_URL + process.env.REACT_APP_API_GATEWAY}/account-service/merchants/merchant`, {
      headers: adminAuthHeader(merchantId),
    })
    .then((response) => response.data)
    .catch((error) => Promise.reject(error.response));
}

// function deleteMerchant(merchantId) {
//   console.log("Test", merchantId);
//   return axios
//       .delete(`${process.env.REACT_APP_API_URL + process.env.REACT_APP_API_GATEWAY}/account-service/merchants/` + merchantId
//       )
//       .then((response) => response.data)
//       .catch((error) => Promise.reject(error.response));
// }

// function deleteUser(merchantId) {
//   console.log("Test", merchantId);
//   return axios
//       .get(`${process.env.REACT_APP_API_URL + process.env.REACT_APP_API_GATEWAY}/account-service/merchants/` + merchantId, {
//         headers: authHeader(),
//       })
//       .then((response) => response.data)
//       .catch((error) => Promise.reject(error.response));
// }

function updateActiveTemplate(merchantId, templateId) {
  const config = {
    headers: {
      Authorization: `Bearer ` + authenticationService.hasToken(),
      'Custom-Merchant-Id': merchantId,
      'content-type': 'text/plain',
    }
  }

  return axios
    .put(`${process.env.REACT_APP_API_URL + process.env.REACT_APP_API_GATEWAY}/account-service/merchants/active-template-id`,
      templateId, config
    )
    .then((response) => response.data)
    .catch((error) => Promise.reject(error.response));
}