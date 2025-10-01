"use client"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { Toaster } from 'react-hot-toast';
import AOSInit from '../component/Aosinit';
import SmoothFollower from '../component/Followercursor';
const queryClient = new QueryClient()
const Provider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <QueryClientProvider client={queryClient}>
            {children}
            <Toaster />
            <SmoothFollower />
            <AOSInit />
        </QueryClientProvider>
    );
};

export default Provider;