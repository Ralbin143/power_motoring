import axios from "axios";

export const INSTANCE = axios.create({
  headers: {
    Accept: "application/json",
  },
});

export const DOCUMENT_INSTANCE = axios.create({
  headers: {
    "Content-Type": "multipart/form-data",
  },
});
