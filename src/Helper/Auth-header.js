import Cookies from "universal-cookie";
const cookies = new Cookies();
export function authHeader() {
  const karteroId = cookies.get("karteroId");
  if (karteroId && karteroId.token) return { Authorization: `Bearer ${karteroId.token}` };
  else return {};
}
