import axios from "axios";

export const PaymentProxy = {
    getPaymentList,
};


function getPaymentList() {

    return axios
        .get(`${process.env.REACT_APP_API_URL_PROXY}/payment-simulator-service/api/batch-status`, {
            auth: {
                username: 'username',
                password: 'password'
            }
        })
        .then((response) => response.data)
        .catch((error) => Promise.reject(error.response));
}



function getStatusList() {

    return axios
        .get(`${process.env.REACT_APP_API_URL_PROXY}/sms-simulator-service/status`, {
            auth: {
                username: 'username',
                password: 'password'
            }
        })
        .then((response) => response.data)
        .catch((error) => Promise.reject(error.response));
}




function saveStatus(id, status) {


    const config = {
        headers: {
            auth: {
                username: 'username',
                password: 'password'
            },
            'content-type': 'plain/text'
        }

    }

    const formData = new FormData();
    formData.append('id', id);
    formData.append('status', status);

    const value = [{
        "id" : id,
        "status" : status,
    }]


   
    return axios
        .post(`${process.env.REACT_APP_API_URL}/sms-simulator-service/status/push`,

        value
            , config

        )
        .then((response) => response.data)
        .catch((error) => Promise.reject(error.response));
}
