import axios from "axios";
import { authHeader } from "../Helper/Auth-header";

import { authenticationService } from "./authentication.service";

export const transactionService = {
    startSendTransaction,
    getTransactionStatus,

};


function getTransactionStatus() {

    return axios
        .get(`${process.env.REACT_APP_API_URL}/gateway-service/report-service/transactions/status4`, {
            headers: authHeader(),
        })
        .then((response) => response.data)
        .catch((error) => Promise.reject(error.response));


}

function startSendTransaction(customers, templateId, serviceType, deliveryDate, dueDate) {

    const formData = new FormData();
    formData.append('metadata',customers);
    const config = {
        headers: {
            Authorization: `Bearer ` + authenticationService.hasToken(),
            // 'content-type': 'text/plain;charset=utf-8',
             'content-type': 'application/json',
            // 'content-type': 'multipart/form-data'
        }
    }

    return axios
        .post(`${process.env.REACT_APP_API_URL}/gateway-service/transaction-service/batch/save-requests-temp`,
        customers, config

        )
        .then((response) => response.data)
        .catch((error) => Promise.reject(error.response));
}
