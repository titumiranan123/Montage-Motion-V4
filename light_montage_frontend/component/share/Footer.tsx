import Image from "next/image";
import Link from "next/link";
import React from "react";
import CustomLink from "./CustomLink";

const Footer: React.FC = () => {
  return (
    <div className="bg">
      <div className="container lg:pb-[104px] sectionGap">
        <style>{`
      .bg{
        background:   linear-gradient(179.93deg, #FFFFFF 0.07%, #CCF4FF 99.96%);
      }
      `}</style>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-9  text-(--text-primary)  lg:mt-12 mt-9 md:gap-16 gap-8 md:mb-8 mb-6">
          <div className="col-span-3 max-w-[312px]">
            <Link
              href={"/"}
              className="block md:w-[235px] md:h-[92px] w-[143px] h-14 box-border animated hover:scale-105 "
            >
              <Image
                src={"/assets/icon/logo.png"}
                className="md:w-[235px] md:h-[92px] w-[143px] h-14"
                alt="logo"
                priority
                title="logo"
                width={235}
                height={92}
              />
            </Link>
            <p className="text-[16px] opensans font-normal mt-10">
              Subscribe our newsletter to stay updated and get special offers.
            </p>
            <div className="max-w-[305px] hidden lg:mt-10 mt-6 max-h-[52px]  h-full rounded-2xl border border-[#585858]/20 bg-[#585858]/20 backdrop-blur-[22px]px-2  items-center justify-around">
              <input
                type="text"
                placeholder="Enter your email"
                className="border-none focus:outline-none outline-none py-2 px-3 max-w-full w-full opensans"
              />
              <button className="py-2 px-3 bg-[#25AAE1] max-w-28 max-h-9 text-nowrap rounded-xl flex justify-center items-center font-medium poppins me-2">
                Subscribe
              </button>
            </div>
          </div>
          <div className="w-full mx-auto col-span-2">
            <h2 className="font-semibold poppins text-[24px] leading-[30px]">
              Important Links{" "}
            </h2>
            <div className="flex flex-col gap-1 mt-4 opensans">
              <a
                className="text-[16px] font-normal leading-[150%] hover:scale-105 animated"
                href={"#faq"}
              >
                FAQ
              </a>
              <Link
                className="text-[16px] font-normal leading-[150%] hover:scale-105 animated"
                href={"/terms-and-conditions"}
              >
                Terms & Conditions
              </Link>
              <Link
                className="text-[16px] font-normal leading-[150%] hover:scale-105 animated"
                href={"/privacy-policy"}
              >
                Privacy Policy
              </Link>
              <Link
                className="text-[16px] font-normal leading-[150%] hover:scale-105 animated"
                href={"/refund-policy"}
              >
                Refund Policy
              </Link>
            </div>
          </div>
          <div className=" col-span-2">
            <h2 className="font-semibold poppins text-[24px] leading-[30px]">
              Services
            </h2>
            <div className="flex flex-col gap-1 mt-4 opensans">
              <Link
                className="text-[16px] font-normal leading-[150%] hover:scale-105 animated"
                href={"/advertising"}
              >
                Advertising
              </Link>
              <Link
                className="text-[16px] font-normal leading-[150%] hover:scale-105 animated"
                href={"/talking-head-editing-service"}
              >
                Talking Head Video Editing
              </Link>
              <Link
                className="text-[16px] font-normal leading-[150%] hover:scale-105 animated"
                href={"/podcast-editing-service"}
              >
                Podcast Video Editing
              </Link>
              <Link
                className="text-[16px] font-normal leading-[150%] hover:scale-105 animated"
                href={"/shorts-editing-service"}
              >
                Shorts / Reels Video Editing
              </Link>
              <Link
                className="text-[16px] font-normal leading-[150%] hover:scale-105 animated"
                href={"/graphic-design"}
              >
                Graphic Design
              </Link>
              <Link
                className="text-[16px] font-normal leading-[150%] hover:scale-105 animated"
                href={"/custom-website-design"}
              >
                Custom Website Design
              </Link>
            </div>
          </div>
          <div className=" col-span-2">
            <h2 className="font-semibold text-[24px] leading-[30px] poppins">
              Contact Info
            </h2>
            <div className="flex flex-col gap-1 mt-4 opensans">
              <a
                className="text-[16px] font-normal leading-[150%] hover:scale-105 animated"
                href={"mailto:hello@montagemotion.com"}
              >
                Hello@montagemotion.com
              </a>
              <Link
                className="text-[16px] font-normal leading-[150%] hover:scale-105 animated"
                href={"tel:+8801862938306"}
              >
                +8801862938306
              </Link>
              <p className="text-[16px] font-normal leading-[150%] hover:scale-105 animated">
                DOHS, Mirpur, Dhaka
              </p>
            </div>
          </div>
        </div>
        <div className="justify-between py-5 px-9 rounded-[12px] max-w-3xl ms-auto w-full lg:flex hidden border border-white   bg-white/40  glassShadow ">
          <CustomLink
            className="  text-(--text-primary) "
            href="/"
            title="Home"
          />
          <CustomLink className="" href="/portfolio" title="Portfolio" />
          <CustomLink className="" href="/careers" title="Careers" />
          <CustomLink className="" href="/blog" title="Blogs" />
          <CustomLink className="" href="/about-us" title="About" />
          <CustomLink className="" href="/contact-us" title="contact" />
        </div>
      </div>
    </div>
  );
};

export default Footer;
