import axios from "axios";

const token = sessionStorage.getItem("wsstfaarvav");
const api_key = import.meta.env.REACT_APP_API_KEY;

export const INSTANCE = axios.create({
  headers: {
    "Content-Type": "application/json",
    "x-auth-token": token,
    "x-api-key": api_key,
  },
});

export const IMAGE_INSTANCE = axios.create({
  headers: {
    Accept: "multipart/form-data",
    "Content-Type": "multipart/form-data",
    "x-auth-token": token,
    "x-api-key": api_key,
  },
});
