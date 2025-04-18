import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "./components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Webdeal – Your Partner in Digital Solutions",
  description: "Professional digital services for your business",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body
        className={`${geistSans.variable} ${geistMono.variable}`}
        style={{
          WebkitFontSmoothing: "antialiased", // эквивалент Tailwind 'antialiased'
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          maxHeight: "100vh",
          width: "100vw",
          overflow: "hidden",
        }}
      >
        <main
          className=""
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            alignSelf: "stretch",
            overflow: "hidden",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
