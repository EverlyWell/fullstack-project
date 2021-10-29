import { AxiosRequestHeaders } from "axios";

export default function authHeader(): AxiosRequestHeaders {
  const user = JSON.parse(localStorage.getItem("user") || '{}');

  if (user && user.accessToken) {
    return { Authorization: user.accessToken };
  } else {
    return {};
  }
}
