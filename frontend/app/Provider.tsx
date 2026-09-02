"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { Toaster } from "react-hot-toast";
import AOSInit from "../component/Aosinit";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30_000,
      gcTime: 10 * 60_000,
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});
const Provider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <noscript>
        <style>{`
          [data-aos] {
            opacity: 1 !important;
            transform: none !important;
          }
        `}</style>
      </noscript>
      {children}
      <Toaster />
      {/* <SmoothFollower /> */}
      <AOSInit />
    </QueryClientProvider>
  );
};

export default Provider;
