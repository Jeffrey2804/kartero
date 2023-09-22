import axios from "axios";
import { authHeader } from "../Helper/Auth-header";
import { authenticationService } from "../Services/authentication.service";
import { adminAuthHeader } from "./tenant.controller";

export const referenceService = {
    getRegionReference,
    getCityReference,
    getRolesReference,

};
function getRegionReference() {
    return axios
        .get(`${process.env.REACT_APP_API_URL + process.env.REACT_APP_API_GATEWAY}/reference-tables/regions`, {
            headers: authHeader(),
        })
        .then((response) => response.data)
        .catch((error) => Promise.reject(error.response));
}

function getCityReference() {
    return axios
        .get(`${process.env.REACT_APP_API_URL + process.env.REACT_APP_API_GATEWAY}/reference-tables/cities`, {
            headers: authHeader(),
        })
        .then((response) => response.data)
        .catch((error) => Promise.reject(error.response));
}

function getRolesReference() {
    return axios
        .get(`${process.env.REACT_APP_API_URL + process.env.REACT_APP_API_GATEWAY}/reference-tables/roles`, {
            headers: authHeader(),
        })
        .then((response) => response.data)
        .catch((error) => Promise.reject(error.response));
}