"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import React, { ReactNode } from "react";
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient();

const Provider = ({ children }: { children: ReactNode }) => {
  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        {children}
        <Toaster position="top-center" reverseOrder={false} />
      </QueryClientProvider>
    </SessionProvider>
  );
};

export default Provider;
