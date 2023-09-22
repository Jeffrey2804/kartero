import axios from "axios";
import { authHeader } from "../Helper/Auth-header";
import { adminAuthHeader } from "./tenant.controller";

export const adminReportsService = {
    getPaymentBatchOverview,
    getPaymentIndividualOverview,
    getDeliveryBatchOverview,
    getDeliveryIndividualOverview,
};


function getPaymentBatchOverview(merchantId) {
    return axios
        .get(`${process.env.REACT_APP_API_URL}/gateway-service/report-service/reports/batch-payment`, {
            headers: adminAuthHeader(merchantId),
        })
        .then((response) => response.data)
        .catch((error) => Promise.reject(error.response));
}

function getPaymentIndividualOverview(statementId) {
    return axios
        .get(`${process.env.REACT_APP_API_URL }/gateway-service/report-service/reports/customer-payment/` + statementId, {
            headers: authHeader(),
        })
        .then((response) => response.data)
        .catch((error) => Promise.reject(error.response));


}


function getDeliveryBatchOverview(merchantId) {
    return axios
        .get(`${process.env.REACT_APP_API_URL}/gateway-service/report-service/reports/batch-delivery`, {
            headers: adminAuthHeader(merchantId),
        })
        .then((response) => response.data)
        .catch((error) => Promise.reject(error.response));
}

function getDeliveryIndividualOverview(statementId) {
    return axios
        .get(`${process.env.REACT_APP_API_URL}/gateway-service/report-service/reports/customer-delivery/` + statementId, {
            headers: authHeader(),
        })
        .then((response) => response.data)
        .catch((error) => Promise.reject(error.response));
}