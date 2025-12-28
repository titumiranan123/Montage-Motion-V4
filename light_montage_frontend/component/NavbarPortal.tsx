"use client";
import { createPortal } from "react-dom";
import Navbar from "./share/Navbar";

const NavbarPortal = () => {
  return createPortal(<Navbar />, document.body);
};

export default NavbarPortal;
