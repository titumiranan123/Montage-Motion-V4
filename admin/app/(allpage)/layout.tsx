import React, { ReactNode } from "react";
import Provider from "../Provider";
import MainLayout from "@/component/Mainlayout";
export const dynamic = "force-dynamic";
const PublicLayout = async ({ children }: { children: ReactNode }) => {
  return (
    <Provider>
      <MainLayout>{children}</MainLayout>
    </Provider>
  );
};

export default PublicLayout;
