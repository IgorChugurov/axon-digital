import Link from "next/link";

export default function Footer() {
  return (
    <footer className="h-[50px]">
      <div className="max-w-7xl mx-auto flex   justify-between items-center h-[100%]">
        <div className="text-sm text-gray-500">
          © {new Date().getFullYear()} AxonDigital. All rights reserved.
        </div>
        <div className="flex space-x-6 items-center">
          <Link
            href="/offer"
            className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
          >
            Public Offer
          </Link>
        </div>
      </div>
    </footer>
  );
}
