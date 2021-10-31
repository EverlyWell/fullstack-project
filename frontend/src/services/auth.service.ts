import axios from "axios";
import { authenticationApiUrl } from "../api";

export const signup = async (email: string, password: string, password_confirmation: string) => {
  const response = await axios.post(`${authenticationApiUrl}/signup`, {
    email,
    password,
    password_confirmation
  });
  if (response.data.auth_token) {
    localStorage.setItem("user", JSON.stringify({ email: email, accessToken: response.data.auth_token }));
  }
};

export const login = async (email: string, password: string) => {
  const response = await axios.post(`${authenticationApiUrl}/signin`, {
    email,
    password,
  });
  if (response.data.auth_token) {
    localStorage.setItem("user", JSON.stringify({ email: email, accessToken: response.data.auth_token }));
  }
};

export const logout = () => {
  localStorage.removeItem("user");
};

export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user") || '{}');
};
