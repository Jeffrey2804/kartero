import axios from "axios";

export const SmtpProxy = {
    getSmtpList,
    saveStatus,
    saveStatusAll,
    getStatusList
};


function getSmtpList() {

    return axios
        .get(`${process.env.REACT_APP_API_URL_PROXY}/smtp-simulator-service/status/simulated`, {
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
        .get(`${process.env.REACT_APP_API_URL_PROXY}/smtp-simulator-service/status`, {
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
            // 'content-type': 'plain/text'
        }

    }

  
    const value = [{
        "id" : id,
        "status" : status,
    }]


   
    return axios
        .post(`${process.env.REACT_APP_API_URL_PROXY}/smtp-simulator-service/status/push`,

        value
            , config

        )
        .then((response) => response.data)
        .catch((error) => Promise.reject(error.response));
}


function saveStatusAll(status) {

    return axios
        .post(`${process.env.REACT_APP_API_URL_PROXY}/smtp-simulator-service/status/push-all/`+ status

           
          

        )
        .then((response) => response.data)
        .catch((error) => Promise.reject(error.response));
}
