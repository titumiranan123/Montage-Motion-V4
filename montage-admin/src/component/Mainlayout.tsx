"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import toast from "react-hot-toast";
import { Inter } from "next/font/google";
import {
  FiHome,
  FiBriefcase,
  FiMail,
  FiMenu,
  FiX,
  FiChevronLeft,
  FiLogOut,
  FiInfo,
  FiFileText,
  FiFile,
  FiGlobe,
  FiMap,
  FiSettings,
} from "react-icons/fi";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  useEffect(() => setMobileMenuOpen(false), [pathname]);
  const menuItems = [
    {
      section: "Dashboard",
      items: [{ href: "/", label: "Home", icon: <FiHome /> }],
    },
    {
      section: "SEO Management",
      items: [
        {
          href: "/montage/seo/page-content",
          label: "Page SEO Content",
          icon: <FiGlobe />, // Manage on-page SEO meta data
        },
        {
          href: "/montage/seo/sitemap",
          label: "Sitemap Manager",
          icon: <FiMap />, // Control and update XML sitemap
        },
        {
          href: "/montage/seo/robots",
          label: "Robots.txt Manager",
          icon: <FiSettings />, // Configure crawler access
        },
      ],
    },
    {
      section: "Hyper Service",
      items: [
        {
          href: "/montage/hyper-service",
          label: "Service page Management",
          icon: <FiGlobe />,
        },
      ],
    },
    {
      section: "Pages",
      items: [
        {
          href: "/montage/headers-section",
          label: "Header Section",
          icon: <FiBriefcase />,
        },
        {
          href: "/montage/works",
          label: "Work Section",
          icon: <FiBriefcase />,
        },
        {
          href: "/montage/page-service",
          label: "Service  Section",
          icon: <FiBriefcase />,
        },

        {
          href: "/montage/pricing-section",
          label: "Create Pricing",
          icon: <FiBriefcase />,
        },

        {
          href: "/montage/brand-section",
          label: "Brand  Section",
          icon: <FiBriefcase />,
        },

        {
          href: "/montage/testimonials",
          label: "Testimonials Section",
          icon: <FiBriefcase />,
        },
        {
          href: "/montage/page-process",
          label: "Process  Section",
          icon: <FiBriefcase />,
        },
        {
          href: "/montage/why-choose-us",
          label: "Why Choose us Section",
          icon: <FiBriefcase />,
        },
        {
          href: "/montage/member-influncer",
          label: "Member List",
          icon: <FiBriefcase />,
        },
        {
          href: "/montage/carrerpost",
          label: "Job Post",
          icon: <FiBriefcase />,
        },
        {
          href: "/montage/comparison",
          label: "Comparision",
          icon: <FiBriefcase />,
        },
        {
          href: "/montage/industries",
          label: "Industries",
          icon: <FiBriefcase />,
        },
        {
          href: "/montage/faqs",
          label: "Faq Section",
          icon: <FiBriefcase />,
        },
        {
          href: "/montage/blogs",
          label: "Blogs",
          icon: <FiBriefcase />,
        },
        { href: "/montage/contact", label: "Contact", icon: <FiMail /> },
        { href: "/montage/career", label: "Career", icon: <FiFileText /> },
      ],
    },
  ];

  const toggleSidebar = () => setIsOpen(!isOpen);
  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  return (
    <div
      className={`flex flex-col min-h-screen bg-black text-white ${inter.className}`}
    >
      {/* HEADER */}
      <header className="sticky top-0 z-30 w-full bg-gradient-to-b from-black to-gray-900/90 border-b border-gray-800/40 shadow-md backdrop-blur-md transition-all">
        <div className="flex items-center justify-between h-16 px-6 sm:px-8 max-w-screen-2xl mx-auto">
          {/* Left */}
          <div className="flex items-center space-x-4 sm:space-x-6">
            <button
              onClick={toggleMobileMenu}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              className="md:hidden p-2 rounded-full hover:bg-[#1FB5DD]/20 transition"
            >
              {mobileMenuOpen ? (
                <FiX className="w-6 h-6 text-[#1FB5DD]" />
              ) : (
                <FiMenu className="w-6 h-6 text-[#1FB5DD]" />
              )}
            </button>

            <Link
              href="/"
              className="text-2xl sm:text-3xl font-extrabold text-[#1FB5DD] hover:text-[#1FB5DD]/90 transition-colors"
              title="Montage Motion Home"
            >
              Montage Motion
            </Link>
          </div>

          {/* Right */}
          <button
            onClick={toggleSidebar}
            aria-label={isOpen ? "Collapse sidebar" : "Expand sidebar"}
            className="hidden md:flex p-2 rounded-full hover:bg-[#1FB5DD]/20 transition"
          >
            <FiMenu className="w-6 h-6 text-[#1FB5DD]" />
          </button>
        </div>
      </header>

      {/* MAIN BODY */}
      <div className="flex flex-1 w-full max-w-screen-2xl mx-auto transition-all duration-300">
        {/* DESKTOP SIDEBAR */}
        <aside
          className={`hidden md:flex flex-col sticky top-16 h-[calc(100vh-4rem)] bg-gradient-to-b from-black to-gray-900/90 border-r border-gray-800/40 shadow-2xl transition-all duration-300 ${
            isOpen ? "w-80" : "w-16"
          }`}
        >
          <div className="p-6 flex flex-col h-full w-full">
            <nav className="flex-1 flex flex-col space-y-6 mt-6 overflow-y-auto">
              {menuItems.map(({ section, items }) => (
                <div key={section} className="space-y-2">
                  {isOpen && (
                    <h3 className="text-[14px] font-bold text-[#1FB5DD]/80 uppercase tracking-widest px-4 py-1 bg-[#1FB5DD]/10 rounded-full mb-4">
                      {section}
                    </h3>
                  )}
                  {items.map(({ href, label, icon }) => (
                    <Link
                      key={href}
                      href={href}
                      className={`flex items-center rounded-xl px-4 py-3 text-sm font-medium transition-all ${
                        pathname === href
                          ? "bg-[#1FB5DD]/30 text-[#1FB5DD] font-semibold"
                          : "text-gray-300 hover:bg-[#1FB5DD]/20 hover:text-[#1FB5DD]"
                      }`}
                    >
                      <span
                        className={`flex-shrink-0 w-5 h-5 ${
                          isOpen ? "mr-4" : "mx-auto"
                        } transition-all`}
                      >
                        {icon}
                      </span>
                      <span
                        className={`truncate transition-opacity ${
                          isOpen ? "opacity-100" : "opacity-0 w-0"
                        }`}
                      >
                        {label}
                      </span>
                    </Link>
                  ))}
                </div>
              ))}
            </nav>

            {/* FOOTER BUTTONS */}
            <div className="mt-auto space-y-4 border-t border-gray-800/40 pt-6">
              <button
                onClick={async () => {
                  await signOut();
                  toast.success("Logout successful");
                }}
                className="flex items-center w-full px-4 py-3 rounded-xl text-gray-300 hover:bg-[#1FB5DD]/20 hover:text-[#1FB5DD] transition-all"
              >
                <FiLogOut
                  className={`w-5 h-5 flex-shrink-0 ${
                    isOpen ? "mr-4" : "mx-auto"
                  } transition-all`}
                />
                {isOpen && <span>Logout</span>}
              </button>

              <button
                onClick={toggleSidebar}
                className="flex items-center w-full px-4 py-3 rounded-xl text-gray-300 hover:bg-[#1FB5DD]/20 hover:text-[#1FB5DD] transition-all"
              >
                <FiChevronLeft
                  className={`w-5 h-5 transition-transform ${
                    isOpen ? "" : "rotate-180"
                  }`}
                />
                {isOpen && <span className="ml-4">Collapse</span>}
              </button>
            </div>
          </div>
        </aside>

        {/* MOBILE SIDEBAR */}
        <div
          className={`md:hidden fixed inset-0 z-40 transition-all ${
            mobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        >
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
            onClick={toggleMobileMenu}
          ></div>
          <div
            className={`absolute left-0 top-0 h-full w-72 bg-gradient-to-b from-black to-gray-900/90 border-r border-gray-800/40 p-6 shadow-2xl transition-transform ${
              mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <nav className="space-y-6 mt-6">
              {menuItems.map(({ section, items }) => (
                <div key={section}>
                  <h3 className="text-xs font-bold text-[#1FB5DD]/80 uppercase tracking-widest px-4 py-1 bg-[#1FB5DD]/10 rounded-full mb-4">
                    {section}
                  </h3>
                  {items.map(({ href, label, icon }) => (
                    <Link
                      key={href}
                      href={href}
                      className={`flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                        pathname === href
                          ? "bg-[#1FB5DD]/30 text-[#1FB5DD]"
                          : "text-gray-300 hover:bg-[#1FB5DD]/20 hover:text-[#1FB5DD]"
                      }`}
                    >
                      <span className="w-5 h-5 mr-4">{icon}</span>
                      <span>{label}</span>
                    </Link>
                  ))}
                </div>
              ))}

              <button
                onClick={async () => {
                  await signOut();
                  toast.success("Logout successful");
                }}
                className="flex items-center w-full px-4 py-3 rounded-xl text-gray-300 hover:bg-[#1FB5DD]/20 hover:text-[#1FB5DD] transition-all"
              >
                <FiLogOut className="w-5 h-5 mr-4" />
                <span>Logout</span>
              </button>
            </nav>
          </div>
        </div>

        {/* MAIN CONTENT */}
        <main className="flex-1 w-full py-10 px-6 sm:px-8 transition-all duration-300">
          {children}
        </main>
      </div>

      {/* FOOTER */}
      <footer className="border-t border-gray-800/40 py-8 text-center bg-gradient-to-t from-gray-900/90 to-black">
        <p className="text-gray-400 text-sm sm:text-base font-medium">
          © {new Date().getFullYear()} All Rights Reserved by Montage Motion.
        </p>
      </footer>
    </div>
  );
}
