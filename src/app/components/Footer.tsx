import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-3 lg:col-span-1 md:mb-8 lg:mb-0">
            <div className="flex items-center mb-4">
              <span className="text-2xl font-bold text-white">AxonDigital</span>
            </div>
            <p className="text-gray-300 text-sm mb-4">
              Professional digital agency building smart solutions with our
              proprietary CoreFlow Platform. Deploy applications 70% faster.
            </p>
            <div className="flex space-x-4">
              <a
                href="mailto:contact@axondigital.xyz"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Email"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold mb-4">Our Services</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/services/web-app-development"
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  Web Applications
                </Link>
              </li>
              <li>
                <Link
                  href="/services/website-creation"
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  Website Creation
                </Link>
              </li>
              <li>
                <Link
                  href="/services/ai-integration"
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  AI Integration
                </Link>
              </li>
              <li>
                <Link
                  href="/services/process-automation"
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  Process Automation
                </Link>
              </li>
              <li>
                <Link
                  href="/services/coreflow-platform"
                  className="text-gray-300 hover:text-white transition-colors text-sm font-medium"
                >
                  CoreFlow Platform
                </Link>
              </li>
            </ul>
          </div>

          {/* Platform */}
          <div>
            <h3 className="text-white font-semibold mb-4">Technology</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/platform"
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  CoreFlow Platform
                </Link>
              </li>
              <li>
                <Link
                  href="/services/spec-documentation"
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  Technical Documentation
                </Link>
              </li>
              <li>
                <Link
                  href="/services/documentation-audit"
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  Documentation Audit
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/expertise"
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  Our Expertise
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/public-offer"
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  Public Offer
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-gray-400 mb-4 md:mb-0">
              © {currentYear} AxonDigital. All rights reserved.
            </div>
            <div className="flex flex-wrap justify-center md:justify-end space-x-6">
              <span className="text-xs text-gray-500 bg-gray-800 px-3 py-1 rounded-full">
                🚀 CoreFlow Platform - 70% Faster Development
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
