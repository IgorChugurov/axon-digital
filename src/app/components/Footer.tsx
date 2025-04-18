import Link from "next/link";

export default function Footer() {
  return (
    <footer className="py-2 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto flex   justify-between items-center">
        <div className="text-sm text-gray-500">
          © {new Date().getFullYear()} WebDeal. All rights reserved.
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
