import Cookies from "universal-cookie";
const cookies = new Cookies();
export function adminAuthHeader(customMerchantId) {
    const karteroId = cookies.get("karteroId");
    if (karteroId && karteroId.token) return { Authorization: `Bearer ${karteroId.token}`, 'Custom-Merchant-Id': customMerchantId  };
    else return {};
}