import axios from "axios";
import { authHeader } from "../Helper/Auth-header";
import jwt_decode from "jwt-decode";
import Cookies from "universal-cookie";
import { authenticationService } from "../Services/authentication.service";

export const adminTemplateService = {
    getPdf,
    getHtml
}

function getPdf(pdfPath) {

    const config = {
      headers: {
        Authorization: `Bearer ` + authenticationService.hasToken(),
        'Custom-Merchant-Id': 0,
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

function getHtml(htmlPath) {

    const config = {
      headers: {
        Authorization: `Bearer ` + authenticationService.hasToken(),
        'Custom-Merchant-Id': 0,
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