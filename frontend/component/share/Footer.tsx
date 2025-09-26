import Image from "next/image";
import Link from "next/link";
import React from "react";
import CustomLink from "./CustomLink";

const Footer = () => {
  return (
    <div className="container lg:mb-[104px] sectionGap">
      <div className="flex justify-between items-center">
        <Image
          src={"/assets/icon/logo.png"}
          className="w-[235px] h-[92px]"
          alt="logo"
          priority
          title="logo"
          width={235}
          height={92}
        />
        <div className="flex gap-2 items-center">
          <Image
            src={"/assets/icon/fb.png"}
            alt="facebook"
            title="facebook"
            priority
            width={24}
            height={24}
          />
          <Image
            src={"/assets/icon/insta.png"}
            alt="Instagram"
            title="Instagram"
            priority
            width={24}
            height={24}
          />
          <Image
            src={"/assets/icon/link.png"}
            alt="linkdin"
            title="Linkdin"
            priority
            width={24}
            height={24}
          />
          <Image
            src={"/assets/icon/yt.png"}
            alt="youtube"
            title="youtube"
            priority
            width={24}
            height={24}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 text-white lg:mt-12 md:gap-16">
        <div>
          <p>
            Subscribe our newsletter to stay updated and get special offers.
          </p>
        </div>
        <div>
          <h2 className="font-[600] text-[24px] leading-[30px]">
            Important Links{" "}
          </h2>
          <div className="flex flex-col gap-1 mt-4">
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
        <div>
          <h2 className="font-[600] text-[24px] leading-[30px]">Services</h2>
          <div className="flex flex-col gap-1 mt-4">
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
        <div>
          <h2 className="font-[600] text-[24px] leading-[30px]">
            Contact Info
          </h2>
          <div className="flex flex-col gap-1 mt-4">
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
      <div className="footer-nav-bg flex justify-between py-5 px-9 rounded-[16px] max-w-[768px] ms-auto w-full mt-9">
        <CustomLink className=" text-white" href="/" title="Home" />
        <CustomLink className="text-white" href="/services" title="Services" />
        <CustomLink
          className="text-white"
          href="/portfolio"
          title="Portfolio"
        />
        <CustomLink className="text-white" href="/recourse" title="Recourses" />
        <CustomLink className="text-white" href="/about" title="About" />
        <CustomLink className="text-white" href="/contact" title="Contact" />
      </div>
    </div>
  );
};

export default Footer;
