import axios from "axios";

// TODO: get from env variables
const API_URL = "http://localhost:3010/api/v1/authentication/";

export const signup = async (email: string, password: string, password_confirmation: string) => {
  const response = await axios.post(API_URL + "signup", {
    email,
    password,
    password_confirmation
  });
  if (response.data.auth_token) {
    localStorage.setItem("user", JSON.stringify({ email: email, accessToken: response.data.auth_token }));
  }
};

export const login = async (email: string, password: string) => {
  const response = await axios.post(API_URL + "signin", {
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
