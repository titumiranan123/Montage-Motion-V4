/* eslint-disable @typescript-eslint/no-explicit-any */

import axios from "axios";
import { getSession, signOut } from "next-auth/react";

export const api_url = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

api_url.interceptors.request.use(async (config) => {
  const session: any = await getSession();
  console.log(session?.user?.token);
  if (session?.user?.token) {
    config.headers.Authorization = `Bearer ${session?.user?.token}`;
  }
  return config;
});

// Add response interceptor to handle token expiration
api_url.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Token is expired or invalid - log out the user
      await signOut({ redirect: true, callbackUrl: "/signin" });
    }
    return Promise.reject(error);
  }
);
