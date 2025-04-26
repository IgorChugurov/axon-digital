"use client";
import Image from "next/image";
import Link from "next/link";
import SocialIcon from "./socilaIcons/SocialIcon";
import ButtonForLeftPanel from "./ButtonForLeftPanel";
import { usePathname } from "next/navigation";
export default function Header() {
  const pathname = usePathname();

  const isHome = pathname === "/";
  const isAbout = pathname === "/about";
  return (
    <header
      style={{
        backgroundColor: "#f8f9fa",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",

        height: "50px",
      }}
    >
      <div className="flex justify-center align-center items-center pl-4 gap-1">
        <ButtonForLeftPanel hideWhenExpand={true} />

        {isHome ? (
          <span className="text-2xl text-black font-bold">WebDeal</span>
        ) : (
          <Link href="/" className="flex items-center">
            <span className="text-2xl text-black font-bold">WebDeal</span>
          </Link>
        )}
      </div>

      {/* <div
        style={{
          width: "190px",
          display: "flex",
          justifyContent: "flex-end",

          paddingRight: "2rem",
        }}
      >
        <a
          href="https://wa.me/YOUR_WHATSAPP_NUMBER"
          // className={`${styles.frame} ${styles.wa}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <SocialIcon name="whatsapp" size={30} />
        </a>
      </div> */}
      <div className="pr-4">
        {isAbout ? (
          <span className="text-base text-gray-600">About</span>
        ) : (
          <Link
            href="/about"
            className="text-base text-gray-600 hover:text-gray-900 hover:underline"
          >
            About
          </Link>
        )}
      </div>
    </header>
  );
}
