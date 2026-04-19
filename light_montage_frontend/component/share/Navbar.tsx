import Image from "next/image";
import CustomLink from "./CustomLink";
import ServiceDropdown from "./ServiceDropdown";
import MobileMenu from "./MobileMenu";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="max-w-7xl mx-auto xl:px-0 px-2">
      <div
        style={{ zIndex: 9999 }}
        className="lg:py-4 py-2 mt-2 bg-white/20   lg:px-5 px-2 rounded-[12px]  flex justify-between items-center  backdrop-blur-[21px] transition-all duration-300 ease-in-out glassShadow sticky top-2"
      >
        <Link
          className="block active:scale-95"
          href={"/"}
        >
          <Image
            src={"/assets/montlogo.svg"}
            alt="logo"
            priority
            width={120}
            height={80}
          />
        </Link>
        <div className=" lg:flex hidden gap-6 ">
          <CustomLink className="" href="/" title="Home" />
          <ServiceDropdown />
          <CustomLink className="" href="/portfolio" title="Portfolio" />
          <CustomLink className="" href="/careers" title="Careers" />
          <CustomLink className="" href="/blogs" title="Blogs" />
          <CustomLink className="" href="/about-us" title="About" />
          <CustomLink className="" href="/contact-us" title="Contact" />
        </div>

        <Link
          href={"https://www.instagram.com/_samiul_arafat"}
          target="_blank"
          className="w-38.75 h-12 btn-color text-(--text-primary) py-4 px-5 rounded-[10px] lg:flex hidden justify-center items-center text-[16px] font-medium poppins cursor-pointer hover:scale-105  transition-all duration-300 ease-in-out "
        >
          Let&apos;s Talk
        </Link>
        <div className="flex lg:hidden">
          <MobileMenu />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
