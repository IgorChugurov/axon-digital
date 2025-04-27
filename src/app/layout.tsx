import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

import KeyboardAdaptiveLayout from "./components/KeyboardAdaptiveLayout/KeyboardAdaptiveLayout";
import CookieConsent from "@/components/CookieConsent";
import GlobalLoaderOverlay from "./components/GlobalLoaderOverlay";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AxonDigital – Your Partner in Digital Solutions",
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
        className={`${geistSans.variable} ${geistMono.variable} font-sans  text-lg`}
      >
        <KeyboardAdaptiveLayout>
          {children}
          <CookieConsent />
          <GlobalLoaderOverlay />
        </KeyboardAdaptiveLayout>

        <Toaster
          position="top-right"
          toastOptions={{
            className: "text-base",
            style: {
              padding: "12px 16px",
              borderRadius: "12px",
              background: "#fff",
              color: "#333",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            },
          }}
        />
      </body>
    </html>
  );
}
