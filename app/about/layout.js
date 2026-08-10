export const metadata = {
  title: "About EchoTic - Redefining Concert Pass Experience",
  description:
    "Discover the technology and vision behind EchoTic. Built with Next.js 16, Three.js 3D stage visualizers, encrypted QR passes, and instant gate control.",
  openGraph: {
    title: "About EchoTic Platform",
    description: "Redefining live concert passes with 3D WebGL rendering, instant gate verification, and real-time seat selection.",
    url: "https://echotic-platform.vercel.app/about",
    siteName: "EchoTic",
    images: [
      {
        url: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "EchoTic About Showcase",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About EchoTic Platform",
    description: "Modern concert pass experience built with Next.js & Three.js",
  },
};

export default function AboutLayout({ children }) {
  return <>{children}</>;
}
