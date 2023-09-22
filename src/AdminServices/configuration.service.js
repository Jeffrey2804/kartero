import axios from "axios";
import { authHeader } from "../Helper/Auth-header";
import { authenticationService } from "../Services/authentication.service";
import { adminAuthHeader } from "./tenant.controller";

export const adminConfigurationService = {
  updateMappingConfig,
  updateSmsConfig,
  getStatementField,
  getEmailPlaceholders,
  updateSchedule,
  getConfigMapping,
  getConfigThroughMerchantID,
  getSMS,
  createConfig,
  getPDFList,
  getHTMLList,
  getHeaders,
  uploadHTML,
  uploadPDF,
  getHtmlPathByTemplateID,
  getPdfPathByTemplateID,
  initializeDatabase,
  
};

function createConfig(
 
  merchantID,
  transactionVar,
  statementTemplateFilePath,
  emailTemplateFilePath,
  smsTemplateContent,
  serviceType,
  activeSubscriptionId,
  templateName) {
  const userInfo = new FormData();
  // userInfo.append("mappingConfig", mappingConfig);
  userInfo.append("dayOfMonthDelivery", 1);
  userInfo.append("dayOfMonthDue", 1);
  userInfo.append("statementTemplateFilePath", statementTemplateFilePath);
  userInfo.append("emailTemplateFilePath", emailTemplateFilePath);
  userInfo.append("smsTemplateContent", smsTemplateContent.text);
  userInfo.append("serviceType", 'email');
  userInfo.append("activeSubscriptionId",activeSubscriptionId);
  userInfo.append("templateName", templateName);
  // let formDataJsonString = JSON.stringify(Object.fromEntries(userInfo));

  const config = {
    headers: {
      Authorization: `Bearer ` + authenticationService.hasToken(),
      'Custom-Merchant-Id': merchantID,
      'content-type': 'multipart/form-data'
    }
  }

  return axios
    .post(`${process.env.REACT_APP_API_URL + process.env.REACT_APP_API_GATEWAY}/configuration-service/configs`,
      userInfo, config
    )
    .then((response) => response.data)
    .catch((error) => Promise.reject(error.response));
}

function updateMappingConfig(templatesID, fields) {

  const config = {
    headers: {
      Authorization: `Bearer ` + authenticationService.hasToken(),
      'content-type': 'application/json'
    }
  }

  return axios
    .put(`${process.env.REACT_APP_API_URL + process.env.REACT_APP_API_GATEWAY}/configuration-service/templates/`
      + templatesID + '/mapping-config',
      fields, config
    )
    .then((response) => response.data)
    .catch((error) => Promise.reject(error.response));
}

function updateSmsConfig(templatesID, sms) {

  const config = {
    headers: {
      Authorization: `Bearer ` + authenticationService.hasToken(),
      'content-type': 'application/json'
    }
  }

  return axios
    .put(`${process.env.REACT_APP_API_URL + process.env.REACT_APP_API_GATEWAY}/configuration-service/templates/`
      + templatesID + '/sms',
      sms, config
    )
    .then((response) => response.data)
    .catch((error) => Promise.reject(error.response));
}

function getStatementField(pdfID) {
  return axios
    .get(`${process.env.REACT_APP_API_URL + process.env.REACT_APP_API_GATEWAY}/template-manager-service/patterns/statement-fields/` + pdfID, {
      headers: adminAuthHeader(0),
    })
    .then((response) => response.data)
    .catch((error) => Promise.reject(error.response));
}

function getEmailPlaceholders(htmlID) {
  return axios
    .get(`${process.env.REACT_APP_API_URL + process.env.REACT_APP_API_GATEWAY}/template-manager-service/patterns/email-placeholders/` + htmlID, {
      headers: adminAuthHeader(0),
    })
    .then((response) => response.data)
    .catch((error) => Promise.reject(error.response));
}

function updateSchedule(templatesID, dayOfTheMonthDelivery) {

  const config = {
    headers: {
      Authorization: `Bearer ` + authenticationService.hasToken(),
      'content-type': 'application/json'
    }
  }
  return axios

    .put(`${process.env.REACT_APP_API_URL}/gateway-service/configuration-service/` +
      templatesID + `/set/dayOfMonthDelivery`,
      dayOfTheMonthDelivery, config)
    .then((response) => response.data)
    .catch((error) => Promise.reject(error.response));
}

function getConfigMapping(templatesId, merchantID) {
  return axios
    .get(`${process.env.REACT_APP_API_URL + process.env.REACT_APP_API_GATEWAY}/configuration-service/templates/`
      + templatesId + '/mapping-config', {
      headers: adminAuthHeader(merchantID),
    })
    .then((response) => response.data)
    .catch((error) => Promise.reject(error.response));
}

function getConfigThroughMerchantID(merchantID) {
  return axios
    .get(`${process.env.REACT_APP_API_URL + process.env.REACT_APP_API_GATEWAY}/configuration-service/configs`
      , {
        headers: adminAuthHeader(merchantID),
      })
    .then((response) => response.data)
    .catch((error) => Promise.reject(error.response));
}

function getSMS(templatesID) {
  return axios
    .get(`${process.env.REACT_APP_API_URL + process.env.REACT_APP_API_GATEWAY}/configuration-service/templates/`
      + templatesID + '/sms', {
      headers: authHeader(),
    })
    .then((response) => response.data)
    .catch((error) => Promise.reject(error.response));
}

function getPDFList() {
  return axios
    .get(`${process.env.REACT_APP_API_URL + process.env.REACT_APP_API_GATEWAY}/template-manager-service/patterns/pdfs`, {
      headers: adminAuthHeader(0),
    })
    .then((response) => response.data)
    .catch((error) => Promise.reject(error.response));
}

function getHTMLList() {
  return axios
    .get(`${process.env.REACT_APP_API_URL + process.env.REACT_APP_API_GATEWAY}/template-manager-service/patterns/htmls`, {
      headers: adminAuthHeader(0),
    })
    .then((response) => response.data)
    .catch((error) => Promise.reject(error.response));
}

function getHeaders(file) {
  console.log(file.size);
  if (file.size > 50000000) {
    console.log("File Size Limit");
    return Promise.reject("File Size Limit");
  }

  const byteFile = readFileDataAsBase64(file);
  const formData = new FormData();
  formData.append('file', file);
  const config = {
    headers: {
      Authorization: `Bearer ` + authenticationService.hasToken(),
      'Custom-Merchant-Id': 0,
      'content-type': 'multipart/form-data'
    }
  }
  return axios
    .post(`${process.env.REACT_APP_API_URL}/gateway-service/template-manager-service/patterns/get-headers`,
      formData,
      config)
    .then((response) => response.data)
    .catch((error) => Promise.reject(error.response));

}

function uploadHTML(htmlFile) {
  console.log(htmlFile.size);
  if (htmlFile.size > 50000000) {
    console.log("File Size Limit");
    return Promise.reject("File Size Limit");
  }

  const byteFile = readFileDataAsBase64(htmlFile);
  const formData = new FormData();
  formData.append('file', htmlFile);
  const config = {
    headers: {
      Authorization: `Bearer ` + authenticationService.hasToken(),
      'Custom-Merchant-Id': 0,
      'content-type': 'multipart/form-data'
    }
  }
  return axios
    .post(`${process.env.REACT_APP_API_URL}/gateway-service/template-manager-service/patterns/htmls`,
      formData, config)
    .then((response) => response.data)
    .catch((error) => Promise.reject(error.response));

}

function uploadPDF(pdfFile) {
  console.log(pdfFile.size);
  if (pdfFile.size > 50000000) {
    console.log("File Size Limit");
    return Promise.reject("File Size Limit");
  }

  const byteFile = readFileDataAsBase64(pdfFile);
  const formData = new FormData();
  formData.append('file', pdfFile);
  const config = {
    headers: {
      Authorization: `Bearer ` + authenticationService.hasToken(),
      'Custom-Merchant-Id': 0,
      'content-type': 'multipart/form-data'
    }
  }
  return axios
    .post(`${process.env.REACT_APP_API_URL}/gateway-service/template-manager-service/patterns/pdfs`,
      formData, config)
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

function getPdfPathByTemplateID(templateId, merchantId) {
  return axios
    .get(`${process.env.REACT_APP_API_URL + process.env.REACT_APP_API_GATEWAY}/configuration-service/` + templateId + `/get/statement-template-path`, {
      headers: adminAuthHeader(merchantId),
    })
    .then((response) => response.data)
    .catch((error) => Promise.reject(error.response));
}

function getHtmlPathByTemplateID(templateId, merchantId) {
  return axios
    .get(`${process.env.REACT_APP_API_URL + process.env.REACT_APP_API_GATEWAY}/configuration-service/` + templateId + `/get/email-template-path`, {
      headers: adminAuthHeader(merchantId),
    })
    .then((response) => response.data)
    .catch((error) => Promise.reject(error.response));
}

function initializeDatabase(merchantId) {
  return axios
    .get(`${process.env.REACT_APP_API_URL + process.env.REACT_APP_API_GATEWAY}/tenants/initialize-database`, {
      headers: adminAuthHeader(merchantId),
    })
    .then((response) => response.data)
    .catch((error) => Promise.reject(error.response));
}