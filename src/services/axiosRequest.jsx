import axios from "axios";
import useCookies from "../hooks/useCookies";

/// const urls = "http://192.168.1.13:5000"; // localHost
const home = "https://http-nodejs-production-ee73.up.railway.app";
export default function AxiosWithAuth({ url, method, data = null }) {
  const { cookies } = useCookies();

  const { loginToken } = cookies;
  return axios({
    headers: loginToken
      ? {
          Authorization: `Bearer ${loginToken}`,
        }
      : {},
    method: method || "get",
    url: home + url,
    data: data || null,
  });
}
