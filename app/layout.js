import { Plus_Jakarta_Sans, Inter, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ToastProvider } from "@/components/ui/Toast";
import NoiseFilter from "@/components/ui/NoiseFilter";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "EchoTic - Premium Concert Ticket Experience",
  description: "Discover, book, and experience live concert passes with Apple Music-inspired dark elegance.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${plusJakarta.variable} ${inter.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-[#060608] text-[#f8fafc] font-sans selection:bg-[#e5c158] selection:text-[#060608]">
        <ToastProvider>
          <NoiseFilter />
          <Navbar />
          <div className="flex-grow flex flex-col pt-20 md:pt-24">
            {children}
          </div>
          <Footer />
        </ToastProvider>
      </body>
    </html>
  );
}

