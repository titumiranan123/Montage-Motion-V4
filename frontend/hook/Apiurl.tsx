/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

export const api_url = axios.create({
  // baseURL: 'http://localhost:8001',
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

