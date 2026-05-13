import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import NavBar from "./components/NavigationBar";
import Footer from "./components/Footer";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: "Kevin Muniz — Software Engineer",
  description: "Portfolio of Kevin Muniz, Software Engineer and UCF Computer Science Graduate.",
  openGraph: {
    title: "Kevin Muniz — Software Engineer",
    description: "UCF CS Graduate. Building fast, reliable software.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </head>
      <body
        className={`${inter.variable} ${geistMono.variable}`}
        style={{ fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Helvetica Neue', sans-serif" }}
      >
        <NavBar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
