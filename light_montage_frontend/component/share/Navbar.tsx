import Image from "next/image";
import CustomLink from "./CustomLink";
import ServiceDropdown from "./ServiceDropdown";
import MobileMenu from "./MobileMenu";
import Link from "next/link";

const Navbar = () => {
  return (
    <div
      style={{ zIndex: 9999 }}
      className="py-2 mt-2 bg-white/20  max-w-[1440px] mx-auto px-0  flex justify-between items-center sticky top-4 backdrop-blur-[21px] transition-all duration-300 ease-in-out"
    >
      <Link
        className="block hover:scale-105 transition-all duration-300"
        href={"/"}
      >
        <Image
          src={"/assets/montagelogo.png"}
          alt="logo"
          priority
          width={120}
          height={80}
        />
      </Link>
      <div className=" lg:flex hidden gap-6">
        <CustomLink className="" href="/" title="Home" />
        <ServiceDropdown />
        <CustomLink className="" href="/portfolio" title="Portfolio" />
        <CustomLink className="" href="/careers" title="Careers" />
        <CustomLink className="" href="/blog" title="Blogs" />
        <CustomLink className="" href="/about-us" title="About" />
        <CustomLink className="" href="/contact-us" title="contact" />
      </div>

      <button className="w-[155px] h-12 btn-color text-(--text-primary) py-4 px-5 rounded-[10px] lg:flex hidden justify-center items-center text-[16px] font-medium poppins cursor-pointer hover:scale-105 hover:-rotate-3 transition-all duration-300 ease-in-out ">
        Start a project
      </button>
      <div className="flex lg:hidden">
        <MobileMenu />
      </div>
    </div>
  );
};

export default Navbar;
