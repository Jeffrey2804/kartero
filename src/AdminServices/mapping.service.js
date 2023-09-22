import axios from "axios";
import { authHeader } from "../Helper/Auth-header";
import { authenticationService } from "../Services/authentication.service";
import { adminAuthHeader } from "./tenant.controller";

export const mappingService = {
  createMappingConfig,

};


function createMappingConfig(mappingConfig, templateId, merchantId) {

  const mappingInfo = new FormData();
  // userInfo.append("mappingConfig", mappingConfig);
  mappingInfo.append("mappingConfig", mappingConfig);
  const config = {
    headers: {
      Authorization: `Bearer ` + authenticationService.hasToken(),
      'Custom-Merchant-Id': merchantId,
      'content-type': 'application/json'
    }
  }

  return axios
    .post(`${process.env.REACT_APP_API_URL + process.env.REACT_APP_API_GATEWAY}/mapping-service/mapping/` + templateId,
    mappingConfig,
      config
    )
    .then((response) => response.data)
    .catch((error) => Promise.reject(error.response));
}