import axios from "axios";
import { authHeader } from "../Helper/Auth-header";
import { authenticationService } from "../Services/authentication.service";
import { adminAuthHeader } from "./tenant.controller";

export const globalVariablesService = {
    getGlobalAllVarialbes,
    createGlobalVariable,
    deleteGlobalVariable,
    updateGlobalVariable,

};
function getGlobalAllVarialbes(adminId) {
    return axios
        .get(`${process.env.REACT_APP_API_URL + process.env.REACT_APP_API_GATEWAY}/mapping-service/global-variable`, {
            headers: adminAuthHeader(adminId),
        })
        .then((response) => response.data)
        .catch((error) => Promise.reject(error.response));
}

function deleteGlobalVariable(varId,adminId) {
    return axios
        .delete(`${process.env.REACT_APP_API_URL + process.env.REACT_APP_API_GATEWAY}/mapping-service/global-variable/`+varId, {
            headers: adminAuthHeader(adminId),
        })
        .then((response) => response.data)
        .catch((error) => Promise.reject(error.response));
}

function createGlobalVariable(variable, merchantId) {
    const globalVariable = new FormData();
    globalVariable.append("name", variable.name);
    globalVariable.append("table", variable.table);
    globalVariable.append("column", variable.column);
    globalVariable.append("type", variable.type);
    globalVariable.append("format", variable.format);
    globalVariable.append("max", variable.max);
    globalVariable.append("min", variable.min);
    globalVariable.append("alwaysVisible", variable.alwaysVisible);



    // let formDataJsonString = JSON.stringify(Object.fromEntries(globalVariable));

    const config = {
        headers: {
            Authorization: `Bearer ` + authenticationService.hasToken(),
            // 'Custom-Merchant-Id': merchantId,
            "content-type": "multipart/form-data"
        }
    }
    return axios
        .post(`${process.env.REACT_APP_API_URL + process.env.REACT_APP_API_GATEWAY}/mapping-service/global-variable`,
        globalVariable, config
        )
        .then((response) => response.data)
        .catch((error) => Promise.reject(error.response));
}



function updateGlobalVariable(variable, merchantId) {
    const globalVariable = new FormData();
    globalVariable.append("name", variable.name);
    globalVariable.append("table", variable.table);
    globalVariable.append("column", variable.column);
    globalVariable.append("type", variable.type);
    globalVariable.append("format", variable.format);
    globalVariable.append("max", variable.max);
    globalVariable.append("min", variable.min);
    globalVariable.append("alwaysVisible", variable.alwaysVisible);



    // let formDataJsonString = JSON.stringify(Object.fromEntries(globalVariable));

    const config = {
        headers: {
            Authorization: `Bearer ` + authenticationService.hasToken(),
            // 'Custom-Merchant-Id': merchantId,
            "content-type": "multipart/form-data"
        }
    }
    return axios
        .put(`${process.env.REACT_APP_API_URL + process.env.REACT_APP_API_GATEWAY}/mapping-service/global-variable/`+variable.id,
        globalVariable, config
        )
        .then((response) => response.data)
        .catch((error) => Promise.reject(error.response));
}