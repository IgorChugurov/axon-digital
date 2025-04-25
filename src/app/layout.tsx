import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { SidebarDesktop } from "./components/SidebarDesktop";
import KeyboardAdaptiveLayout from "./components/KeyboardAdaptiveLayout/KeyboardAdaptiveLayout";
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
        className={`${geistSans.variable} ${geistMono.variable} font-sans bg-white flex flex-row text-lg`}
      >
        <KeyboardAdaptiveLayout>
          <SidebarDesktop />
          <main className="flex flex-col flex-1 bg-white overflow-hidden items-center justify-center">
            {children}
          </main>
        </KeyboardAdaptiveLayout>
      </body>
    </html>
  );
}
