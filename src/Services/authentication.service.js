import axiosInstance from "../Helper/axios.instance";
import Cookies from "universal-cookie";
import { authHeader } from "../Helper/Auth-header";
import { subscriptionService } from "./subscription.service";
export const authenticationService = {
  login,
  logout,
  hasToken,
  extractData,
  hasRefreshToken,
  getMerchantId,
  init,
};

const cookies = new Cookies();

function login(username, password) {
  return axiosInstance
    // .post(`http://192.168.1.163:8080/dit-api-gateway/api/auth`, {
    .post(`${process.env.REACT_APP_API_URL + process.env.REACT_APP_API_GATEWAY}/auth`, {
      username,
      password,

    })
    .then((response) => {
      cookies.set("karteroId", response.data, { path: "/" });
      cookies.set("karteroRefreshToken", response.data.refreshToken, { path: "/" });
      return Promise.resolve(extractData());
    })
    .catch((error) => Promise.reject(error));
}

function extractData() {
  return (

    axiosInstance
      .post(`${process.env.REACT_APP_API_URL + process.env.REACT_APP_API_GATEWAY}/auth/extract`,

        hasToken(),
      )
      .then((response) => response.data)
      .catch((error) => Promise.reject(error.response))
  );
}

function getMerchantId() {
  axiosInstance
    .post(`${process.env.REACT_APP_API_URL + process.env.REACT_APP_API_GATEWAY}/auth/extract`,

      hasToken(),
    )
    .then((response) => {
      return response.data.merchantId;
    })
    .catch((error) => Promise.reject(error.response))
}
function init() {
  const userId = window.localStorage.getItem("uid");
  subscriptionService
    .getCurrentSubscription(userId)
    .then((response) => {
      console.log("initialize" + response);
      localStorage.setItem("subData", JSON.stringify(response));
      localStorage.setItem("tId", response.activeTemplateId);
    })
    .catch((error) => {
      console.log(error.data);
    });
}

function logout() {
  cookies.remove("karteroId", { path: "/" });
  localStorage.clear();
  return Promise.resolve("logged out");
}

function hasToken() {

  return cookies.get("karteroId") && cookies.get("karteroId").token;

}

function hasRefreshToken() {
  return cookies.get("karteroRefreshToken") && cookies.get("karteroRefreshToken").refreshToken;
}
