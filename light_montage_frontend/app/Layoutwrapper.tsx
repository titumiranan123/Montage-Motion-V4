"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/component/share/Navbar";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const hideNavbarRoutes = [""];
  const shouldHideNavbar = hideNavbarRoutes.includes(pathname);

  return (
    <>
      {shouldHideNavbar && <Navbar />}
      {children}
    </>
  );
}
