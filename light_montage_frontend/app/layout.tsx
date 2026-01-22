import { DM_Sans, Poppins } from "next/font/google";
import "./globals.css";
import Footer from "@/component/share/Footer";
import Provider from "./Provider";
import Navbar from "@/component/share/Navbar";
const geistSans = Poppins({
  variable: "--font-poppins",
  weight: ["100", "400", "500", "600", "700", "900"],
  subsets: ["latin"],
});

const geistDMSans = DM_Sans({
  variable: "--font-dmsans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistDMSans?.variable}  overflow-x-hidden `}
      >
        <Provider>
          <div className="fixed w-full top-6 z-50">
            <Navbar />
          </div>
          {children}
          <Footer />
        </Provider>
      </body>
    </html>
  );
}
