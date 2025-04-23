import Image from "next/image";
import Link from "next/link";
import SocialIcon from "./socilaIcons/SocialIcon";
import ButtonForLeftPanel from "./ButtonForLeftPanel";

export default function Header() {
  return (
    <header
      style={{
        backgroundColor: "#f8f9fa",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        overflow: "hidden",
        height: "50px",
      }}
    >
      <div className="flex justify-center align-center items-center pl-4">
        <ButtonForLeftPanel hideWhenExpand={true} />

        <Link href="/" className="flex items-center">
          <Image
            src="/logo.svg"
            alt="DigiAgency Logo"
            width={100}
            height={50}
            className="h-12 w-auto"
            priority
          />
        </Link>
      </div>

      <div
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
      </div>
    </header>
  );
}
