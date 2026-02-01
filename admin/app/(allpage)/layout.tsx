import React, { ReactNode } from "react";
import Provider from "../Provider";
import MainLayout from "@/component/Mainlayout";
import { getData } from "@/utils/getDate";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import getQueryClient from "@/utils/getQueryClient";

const PublicLayout = async ({ children }: { children: ReactNode }) => {
  const queryClient = getQueryClient();

  // Prefetch TanStack Query data on server
  await queryClient.prefetchQuery({
    queryKey: ["categories"],
    queryFn: await getData({ slug: "website/service/type" }),
  });
  return (
    <Provider>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <MainLayout>{children}</MainLayout>
      </HydrationBoundary>
    </Provider>
  );
};

export default PublicLayout;
