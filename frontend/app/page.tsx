import Header from "@/component/home/Header";
import OurProcess from "@/component/home/OurProcess";
import OurWorkSection from "@/component/home/OurWorkSection";
import PatnersSection from "@/component/home/PatnersSection";
import React from "react";

const HomePage = () => {
  return (
    <div className="">
      <Header />
      <PatnersSection />
      <OurWorkSection />
      <OurProcess />
    </div>
  );
};

export default HomePage;
