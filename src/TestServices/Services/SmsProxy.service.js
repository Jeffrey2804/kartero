import axios from "axios";

export const SmsProxy = {
    getSmsList,
    getStatusList,
    saveStatus,
    saveStatusAll,
};


function getSmsList() {

    return axios
        .get(`${process.env.REACT_APP_API_URL_PROXY}/sms-simulator-service/status/simulated`, {
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

            // 'Content-Type': 'application/json'
        },
    }
    const formData = new FormData();
    formData.append('id', id);
    formData.append('status', status);

    const value = [{
        "id": id,
        "status": status,
    }]

    return axios
        .post(`${process.env.REACT_APP_API_URL_PROXY}/sms-simulator-service/status/push`

            , value
            , config

        )
        .then((response) => response.data)
        .catch((error) => Promise.reject(error.response));
}



function saveStatusAll(status) {

    return axios
        .post(`${process.env.REACT_APP_API_URL_PROXY}/sms-simulator-service/status/push-all/`+ status

           
          

        )
        .then((response) => response.data)
        .catch((error) => Promise.reject(error.response));
}
