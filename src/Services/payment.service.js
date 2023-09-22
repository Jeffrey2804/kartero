import axios from "axios";

export const paymentService = {
    getRequest,
    payRequest,
};


function getRequest(requestId) {
    return axios
        .get(`${process.env.REACT_APP_API_URL_PROXY}/payment-service/api/request/` + requestId, {
            // headers: authHeader(),
        })
        .then((response) => response.data)
        .catch((error) => Promise.reject(error.response));
}



function payRequest(transaction) {

    const config = {
        headers: {
            // Authorization: `Bearer ` + authenticationService.hasToken(),
            'content-type': 'text/plain'
        }
    }

    return axios
        .post(`${process.env.REACT_APP_API_URL_PROXY}/payment-simulator-service/api/pay`, transaction, {
            config,
        })
        .then((response) => response.data)
        .catch((error) => Promise.reject(error.response));
}
