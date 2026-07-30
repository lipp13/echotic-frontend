import { Geist_Mono } from "next/font/google";
import "./globals.css";
import { ToastProvider } from "@/components/ui/Toast";
import NoiseFilter from "@/components/ui/NoiseFilter";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "EchoTic - Modern Concert Ticket Booking Platform",
  description: "A premium, non-generic concert ticketing experience built with Next.js, Tailwind, Framer Motion, and Three.js.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-[#07070a] text-white font-mono selection:bg-[#ccff00] selection:text-black">
        <ToastProvider>
          {/* Subtle overlay paper noise/grain */}
          <NoiseFilter />

          {/* Sticky floating navigation header */}
          <Navbar />

          {/* Main page content wrapped */}
          <div className="flex-grow flex flex-col pt-24">
            {children}
          </div>

          {/* Magazine layout footer */}
          <Footer />
        </ToastProvider>
      </body>
    </html>
  );
}
