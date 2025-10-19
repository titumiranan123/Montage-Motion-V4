import Image from "next/image";
import Link from "next/link";
import React from "react";
import CustomLink from "./CustomLink";
import Gradientcard from "./Gradientcard";

const Footer = () => {
  return (
    <div className="container lg:mb-[104px] sectionGap">
      <div className="flex justify-between items-center">
        <Link href={"/"} className="block ">
          <Image
            src={"/assets/icon/logo.png"}
            className="md:w-[235px] md:h-[92px] w-[143px] h-[56px]"
            alt="logo"
            priority
            title="logo"
            width={235}
            height={92}
          />
        </Link>
        <div className="flex gap-2 items-center">
          <Link
            href={"https://www.facebook.com/MontageMotion"}
            className="block "
          >
            <Image
              src={"/assets/icon/fb.png"}
              alt="facebook"
              title="facebook"
              priority
              width={24}
              height={24}
            />
          </Link>
          <Link href={"/"} className="block ">
            <Image
              src={"/assets/icon/insta.png"}
              alt="Instagram"
              title="Instagram"
              priority
              width={24}
              height={24}
            />
          </Link>
          <Link
            href={"https://www.linkedin.com/company/montagemotion"}
            className="block "
          >
            <Image
              src={"/assets/icon/link.png"}
              alt="linkdin"
              title="Linkdin"
              priority
              width={24}
              height={24}
            />
          </Link>
          <Link
            href={"https://www.youtube.com/@montagemotion77"}
            className="block "
          >
            <Image
              src={"/assets/icon/yt.png"}
              alt="youtube"
              title="youtube"
              priority
              width={24}
              height={24}
            />
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-9 text-white lg:mt-12 mt-9 md:gap-16 gap-8 md:mb-8 mb-6">
        <div className="col-span-3">
          <p className="text-[16px] opensans font-[400]">
            Subscribe our newsletter to stay updated and get special offers.
          </p>
          <div className="max-w-[305px] lg:mt-10 mt-6 max-h-[52px]  h-full rounded-[16px] border border-[#585858]/20 bg-[#585858]/20 backdrop-blur-[22px]px-2 flex items-center justify-around">
            <input
              type="text"
              placeholder="Enter your email"
              className="border-none focus:outline-none outline-none py-2 px-3 max-w-[100%] w-full opensans"
            />
            <button className="py-2 px-3 bg-[#25AAE1] max-w-[112px] max-h-[36px] text-nowrap rounded-[8px] flex justify-center items-center font-[500] poppins me-2">
              Subscribe
            </button>
          </div>
        </div>
        <div className="w-full mx-auto col-span-2">
          <h2 className="font-[600] poppins text-[24px] leading-[30px]">
            Important Links{" "}
          </h2>
          <div className="flex flex-col gap-1 mt-4 opensans">
            <a className="text-[16px] font-[400]" href={"#faq"}>
              FAQ
            </a>
            <Link
              className="text-[16px] font-[400]"
              href={"/terms-and-conditions"}
            >
              Terms & Conditions
            </Link>
            <Link className="text-[16px] font-[400]" href={"/privacy-policy"}>
              Privacy Policy
            </Link>
            <Link className="text-[16px] font-[400]" href={"/refund-policy"}>
              Refund Policy
            </Link>
          </div>
        </div>
        <div className=" col-span-2">
          <h2 className="font-[600] poppins text-[24px] leading-[30px]">
            Services
          </h2>
          <div className="flex flex-col gap-1 mt-4 opensans">
            <Link className="text-[16px] font-[400]" href={"/advertising"}>
              Advertising
            </Link>
            <Link
              className="text-[16px] font-[400]"
              href={"/talking-head-editing-service"}
            >
              Talking Head Video Editing
            </Link>
            <Link
              className="text-[16px] font-[400]"
              href={"/podcast-editing-service"}
            >
              Podcast Video Editing
            </Link>
            <Link
              className="text-[16px] font-[400]"
              href={"/shorts-editing-service"}
            >
              Shorts / Reels Video Editing
            </Link>
            <Link className="text-[16px] font-[400]" href={"/graphic-design"}>
              Graphic Design
            </Link>
            <Link
              className="text-[16px] font-[400]"
              href={"/custom-website-design"}
            >
              Custom Website Design
            </Link>
          </div>
        </div>
        <div className=" col-span-2">
          <h2 className="font-[600] text-[24px] leading-[30px] poppins">
            Contact Info
          </h2>
          <div className="flex flex-col gap-1 mt-4 opensans">
            <a
              className="text-[16px] font-[400]"
              href={"mailto:hello@montagemotion.com"}
            >
              Hello@montagemotion.com
            </a>
            <Link
              className="text-[16px] font-[400]"
              href={"tel:+8801862938306"}
            >
              +8801862938306
            </Link>
            <p className="text-[16px] font-[400]">DOHS, Mirpur, Dhaka</p>
          </div>
        </div>
      </div>
      <Gradientcard
        className="  justify-between py-5 px-9 rounded-[16px] max-w-[768px] ms-auto w-full lg:flex hidden"
        borderClassName="p-[1px] max-w-[770px] rounded-[16px] ms-auto"
      >
        <CustomLink className=" text-white" href="/" title="Home" />
        <CustomLink className="text-white" href="/services" title="Services" />
        <CustomLink
          className="text-white"
          href="/portfolio"
          title="Portfolio"
        />
        <CustomLink className="text-white" href="/recourse" title="Recourses" />
        <CustomLink className="text-white" href="/about" title="About" />
        <CustomLink
          className="text-white"
          href="/get-in-touch"
          title="Contact"
        />
      </Gradientcard>
    </div>
  );
};

export default Footer;
