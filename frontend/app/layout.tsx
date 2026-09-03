import { DM_Sans, Open_Sans, Poppins } from "next/font/google";
import "./globals.css";
import Footer from "@/component/share/Footer";
import Provider from "./Provider";
import Navbar from "@/component/share/Navbar";
import WhatsAppFloat from "@/component/WhatsAppFloat";
import EbookLeadPopup from "@/component/share/EbookLeadPopup";
import { VideoPlaybackProvider } from "@/component/share/VideoPlaybackProvider";
import Script from "next/script";
const geistSans = Poppins({
  variable: "--font-poppins",
  weight: ["100", "400", "500", "600", "700", "900"],
  subsets: ["latin"],
});
const opensans = Open_Sans({
  variable: "--font-open-sans",
  weight: ["400", "500", "600", "700"],
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
      <head>
        <meta
          name="google-site-verification"
          content="j1gOxbt6mmWofWDDIxmXhGqMLyezqvQ4UILFuesc2K4"
        />
        <Script
          src="https://analysis.nextcombinator.com/api/script.js"
          data-site-id="b49795992a0c"
          strategy="lazyOnload"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistDMSans?.variable} ${opensans?.variable}  `}
      >
        <Provider>
          <VideoPlaybackProvider>
            <div className="fixed w-full top-2 z-50">
              <Navbar />
            </div>
            {children}
            <Footer />
            <WhatsAppFloat />
            <EbookLeadPopup />
          </VideoPlaybackProvider>
        </Provider>
      </body>
    </html>
  );
}
