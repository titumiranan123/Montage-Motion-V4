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

const SESSION_CACHE_MS = 30_000;
let sessionPromise: ReturnType<typeof getSession> | null = null;
let sessionCacheExpiresAt = 0;

const getCachedSession = () => {
  if (!sessionPromise || Date.now() >= sessionCacheExpiresAt) {
    sessionCacheExpiresAt = Date.now() + SESSION_CACHE_MS;
    sessionPromise = getSession().catch((error) => {
      sessionPromise = null;
      sessionCacheExpiresAt = 0;
      throw error;
    });
  }

  return sessionPromise;
};

api_url.interceptors.request.use(async (config) => {
  const session: any = await getCachedSession();
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
      sessionPromise = null;
      sessionCacheExpiresAt = 0;
      // Token is expired or invalid - log out the user
      await signOut({ redirect: true, callbackUrl: "/signin" });
    }
    return Promise.reject(error);
  },
);
