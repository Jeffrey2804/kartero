import axios from "axios";
import { authHeader } from "../Helper/Auth-header";
import jwt_decode from "jwt-decode";
import Cookies from "universal-cookie";
import { authenticationService } from "./authentication.service";
export const templateService = {
  uploadFile,
  updateActiveTemplate,
  getPdf,
  getPdfPath,
  getHtmlPath,
  getHtml,
  getSms,
  downloadIndividualPdf,
};

function uploadFile(name, file, templateId) {
  console.log(file.size);
  if (file.size > 2000000) {
    console.log("File Size Limit");
    return Promise.reject("File Size Limit");
  }

  const byteFile = readFileDataAsBase64(file);
  const formData = new FormData();
  formData.append('file', file);
  formData.append('templateId', templateId);
  const config = {
    headers: {
      Authorization: `Bearer ` + authenticationService.hasToken(),
      'content-type': 'multipart/form-data'
    }
  }
  return axios
    .post(`${process.env.REACT_APP_API_URL}/gateway-service/template-service/upload/customer`,
      formData,
      config)
    .then((response) => response.data)
    .catch((error) => Promise.reject(error));
}

function updateActiveTemplate(userId, templateId) {

  const config = {
    headers: {
      Authorization: `Bearer ` + authenticationService.hasToken(),
      'content-type': 'text/plain'
    }
  }

  return axios
    .put(`${process.env.REACT_APP_API_URL}/gateway-service/account-service/merchants/merchants/active-template-id`,
      templateId,
      config)
    .then((response) => response.data)
    .catch((error) => Promise.reject(error.response));
}

function getPdf(pdfPath) {

  const config = {
    headers: {
      Authorization: `Bearer ` + authenticationService.hasToken(),
      'content-type': 'text/plain'
    }
  }

  return axios
    .post(`${process.env.REACT_APP_API_URL}/gateway-service/template-service/download/statement-template`,
      pdfPath,
      config)
    .then((response) => response.data)
    .catch((error) => Promise.reject(error.response));
}



function getSms(templateId) {

  const config = {
    headers: {
      Authorization: `Bearer ` + authenticationService.hasToken(),
      'content-type': 'text/plain'
    }
  }

  return axios
    .get(`${process.env.REACT_APP_API_URL}/gateway-service/configuration-service/templates/` + templateId + `/sms`,

      config)
    .then((response) => response.data)
    .catch((error) => Promise.reject(error.response));
}



function getHtml(htmlPath) {

  const config = {
    headers: {
      Authorization: `Bearer ` + authenticationService.hasToken(),
      'content-type': 'text/plain'
    }
  }


  return axios
    .post(`${process.env.REACT_APP_API_URL}/gateway-service/template-service/download/email-template`,
      htmlPath,
      config)
    .then((response) => response.data)
    .catch((error) => Promise.reject(error.response));
}
function getPdfPath(templateId) {

  const config = {
    headers: {
      Authorization: `Bearer ` + authenticationService.hasToken(),
      'content-type': 'text/plain'
    }
  }
  console.log(config);

  return axios
    .get(`${process.env.REACT_APP_API_URL}/gateway-service/configuration-service/` + templateId + `/get/statement-template-path`,
      config)
    .then((response) => response.data)
    .catch((error) => Promise.reject(error.response));
}


function getHtmlPath(templateId) {

  const config = {
    headers: {
      Authorization: `Bearer ` + authenticationService.hasToken(),
      'content-type': 'text/plain'
    }
  }
  console.log(config);

  return axios
    .get(`${process.env.REACT_APP_API_URL}/gateway-service/configuration-service/` + templateId + `/get/email-template-path`,
      config)
    .then((response) => response.data)
    .catch((error) => Promise.reject(error.response));
}



function downloadIndividualPdf(requestId) {

  const config = {
    headers: {
      Authorization: `Bearer ` + authenticationService.hasToken(),
      // 'content-type': 'text/plain'
    }
  }

  return axios
    .get(`${process.env.REACT_APP_API_URL}/gateway-service/template-service/download/` + requestId + `/customer-statement`,
      config)
    .then((response) => response.data)
    .catch((error) => Promise.reject(error.response));
}



function readFileDataAsBase64(e) {
  const file = e;

  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      resolve(event.target.result);
    };

    reader.onerror = (err) => {
      reject(err);
    };

    reader.readAsDataURL(file);
  });
}
