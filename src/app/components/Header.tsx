"use client";

import Link from "next/link";

import ButtonForLeftPanel from "./ButtonForLeftPanel";
import { usePathname } from "next/navigation";
export default function Header() {
  const pathname = usePathname();

  const isHome = pathname === "/";
  const isAbout = pathname === "/about";
  const isExpertise = pathname === "/expertise";
  const isServices = pathname === "/services";
  return (
    <header
      style={{
        backgroundColor: "#f0f4f9",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",

        height: "50px",
      }}
    >
      <div className="flex justify-center align-center items-center pl-4 gap-1">
        {isHome ? (
          <>
            <ButtonForLeftPanel hideWhenExpand={true} />
            <span className="text-2xl text-black font-bold">AxonDigital</span>
          </>
        ) : (
          <Link href="/" className="flex items-center">
            <span className="text-2xl text-black font-bold">AxonDigital</span>
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
      <div className="pr-4 flex gap-2">
        {isServices ? (
          <span className="text-base text-gray-900 font-bold">Services</span>
        ) : (
          <Link
            href="/services"
            className="text-base text-gray-900 font-bold hover:text-gray-900 hover:underline"
          >
            Services
          </Link>
        )}
        {isAbout ? (
          <span className="text-base text-gray-900 font-bold">About</span>
        ) : (
          <Link
            href="/about"
            className="text-base text-gray-900 font-bold hover:text-gray-900 hover:underline"
          >
            About
          </Link>
        )}
        {isExpertise ? (
          <span className="text-base text-gray-900 font-bold">Expertise</span>
        ) : (
          <Link
            href="/expertise"
            className="text-base text-gray-900 font-bold hover:text-gray-900 hover:underline"
          >
            Expertise
          </Link>
        )}
      </div>
    </header>
  );
}
