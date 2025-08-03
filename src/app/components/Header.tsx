"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import ButtonForLeftPanel from "./ButtonForLeftPanel";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isHome = pathname === "/";
  const isAbout = pathname === "/about";
  const isExpertise =
    pathname === "/expertise" || pathname.startsWith("/expertise/");
  const isServices =
    pathname === "/services" || pathname.startsWith("/services/");
  const isSolutions =
    pathname === "/solutions" || pathname.startsWith("/solutions/");
  const isPlatform = pathname === "/platform";
  const isContact = pathname === "/contact";
  //console.log(pathname, isServices);
  // Individual service page checks
  const isWebAppDev = pathname === "/services/web-app-development";
  const isWebsiteCreation = pathname === "/services/website-creation";
  const isAIIntegration = pathname === "/services/ai-integration";
  const isProcessAutomation = pathname === "/services/process-automation";
  const isTvorFlowPlatform = pathname === "/services/tvorflow-platform";
  const isSpecDocumentation = pathname === "/services/spec-documentation";
  const isDocumentationAudit = pathname === "/services/documentation-audit";

  // Individual solution page checks
  const isOblikFlowEN = pathname === "/solutions/oblikflow-en";
  const isOblikFlowUA = pathname === "/solutions/oblikflow-ua";
  const isEducationPlatform = pathname === "/solutions/education-platform";
  const isHealthcarePlatform = pathname === "/solutions/healthcare-systems";
  const isEcommercePlatform = pathname === "/solutions/ecommerce-platforms";
  const isRealestatePlatform = pathname === "/solutions/realestate-platform";
  const isFintechPlatform = pathname === "/solutions/fintech-platform";
  const isEnterpriseProcessAutomation =
    pathname === "/solutions/enterprise-process-automation";
  const isAIIntegrationSolution = pathname === "/solutions/ai-integration";

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
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

        {/* Desktop Navigation */}
        <div className="pr-4 hidden md:flex gap-2">
          {isSolutions ? (
            <span className="text-base text-gray-900 font-bold">Solutions</span>
          ) : (
            <Link
              href="/solutions"
              className="text-base text-gray-900 font-bold hover:text-gray-900 hover:underline"
            >
              Solutions
            </Link>
          )}
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
          {isPlatform ? (
            <span className="text-base text-gray-900 font-bold">Platform</span>
          ) : (
            <Link
              href="/platform"
              className="text-base text-gray-900 font-bold hover:text-gray-900 hover:underline"
            >
              Platform
            </Link>
          )}
        </div>

        {/* Mobile Hamburger Menu Button */}
        <button
          onClick={toggleMobileMenu}
          className="md:hidden pr-4 flex flex-col justify-center items-center w-8 h-8 z-[1002]"
          aria-label="Toggle navigation menu"
        >
          <span
            className={`block w-5 h-0.5 bg-gray-900 transition-all duration-300 ${
              isMobileMenuOpen ? "rotate-45 translate-y-1" : ""
            }`}
          />
          <span
            className={`block w-5 h-0.5 bg-gray-900 mt-1 transition-all duration-300 ${
              isMobileMenuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-5 h-0.5 bg-gray-900 mt-1 transition-all duration-300 ${
              isMobileMenuOpen ? "-rotate-45 -translate-y-1" : ""
            }`}
          />
        </button>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-[1001] md:hidden"
          onClick={closeMobileMenu}
        />
      )}

      {/* Mobile Slide Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-[1002] md:hidden overflow-y-auto ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col p-6 pt-16">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Navigation</h2>

          <nav className="flex flex-col space-y-4">
            {/* Home */}
            <Link
              href="/"
              className={`text-lg font-medium transition-colors py-2 ${
                isHome
                  ? "text-gray-900 border-l-4 border-gray-900 pl-4"
                  : "text-gray-700 hover:text-gray-900 pl-4"
              }`}
              onClick={closeMobileMenu}
            >
              Home
            </Link>

            {/* Technology Configurations Section */}
            <div className="py-2">
              <Link
                href="/solutions"
                className={`text-lg font-medium transition-colors py-2 block ${
                  isSolutions
                    ? "text-gray-900 border-l-4 border-gray-900 pl-4"
                    : "text-gray-700 hover:text-gray-900 pl-4"
                }`}
                onClick={closeMobileMenu}
              >
                Digital Solutions
              </Link>

              {/* Configurations Submenu */}
              <div className="ml-8 mt-2 space-y-2">
                <Link
                  href="/solutions/oblikflow-en"
                  className={`text-sm transition-colors py-1 block ${
                    isOblikFlowEN
                      ? "text-gray-900 font-semibold underline"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                  onClick={closeMobileMenu}
                >
                  Accounting Automation
                </Link>
                <Link
                  href="/solutions/oblikflow-ua"
                  className={`text-sm transition-colors py-1 block ${
                    isOblikFlowUA
                      ? "text-gray-900 font-semibold underline"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                  onClick={closeMobileMenu}
                >
                  Автоматизація обліку
                </Link>
                <Link
                  href="/solutions/education-platform"
                  className={`text-sm transition-colors py-1 block ${
                    isEducationPlatform
                      ? "text-gray-900 font-semibold underline"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                  onClick={closeMobileMenu}
                >
                  Education Platform
                </Link>
                <Link
                  href="/solutions/healthcare-systems"
                  className={`text-sm transition-colors py-1 block ${
                    isHealthcarePlatform
                      ? "text-gray-900 font-semibold underline"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                  onClick={closeMobileMenu}
                >
                  Healthcare Platform
                </Link>
                <Link
                  href="/solutions/ecommerce-platforms"
                  className={`text-sm transition-colors py-1 block ${
                    isEcommercePlatform
                      ? "text-gray-900 font-semibold underline"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                  onClick={closeMobileMenu}
                >
                  E-commerce Platform
                </Link>
                <Link
                  href="/solutions/realestate-platform"
                  className={`text-sm transition-colors py-1 block ${
                    isRealestatePlatform
                      ? "text-gray-900 font-semibold underline"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                  onClick={closeMobileMenu}
                >
                  Real Estate Platform
                </Link>
                <Link
                  href="/solutions/fintech-platform"
                  className={`text-sm transition-colors py-1 block ${
                    isFintechPlatform
                      ? "text-gray-900 font-semibold underline"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                  onClick={closeMobileMenu}
                >
                  Fintech Platform
                </Link>
                <Link
                  href="/solutions/enterprise-process-automation"
                  className={`text-sm transition-colors py-1 block ${
                    isEnterpriseProcessAutomation
                      ? "text-gray-900 font-semibold underline"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                  onClick={closeMobileMenu}
                >
                  Enterprise Process Automation
                </Link>
                {/* <Link
                  href="/solutions/ai-integration"
                  className={`text-sm transition-colors py-1 block ${
                    isAIIntegrationSolution
                      ? "text-gray-900 font-semibold underline"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                  onClick={closeMobileMenu}
                >
                  AI Integration
                </Link> */}
              </div>
            </div>

            {/* Services Section */}
            <div className="py-2">
              <Link
                href="/services"
                className={`text-lg font-medium transition-colors py-2 block ${
                  isServices
                    ? "text-gray-900 border-l-4 border-gray-900 pl-4"
                    : "text-gray-700 hover:text-gray-900 pl-4"
                }`}
                onClick={closeMobileMenu}
              >
                Services
              </Link>

              {/* Services Submenu */}
              <div className="ml-8 mt-2 space-y-2">
                <Link
                  href="/services/web-app-development"
                  className={`text-sm transition-colors py-1 block ${
                    isWebAppDev
                      ? "text-gray-900 font-semibold underline"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                  onClick={closeMobileMenu}
                >
                  Web App Development
                </Link>
                <Link
                  href="/services/website-creation"
                  className={`text-sm transition-colors py-1 block ${
                    isWebsiteCreation
                      ? "text-gray-900 font-semibold underline"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                  onClick={closeMobileMenu}
                >
                  Website Creation
                </Link>
                <Link
                  href="/services/ai-integration"
                  className={`text-sm transition-colors py-1 block ${
                    isAIIntegration
                      ? "text-gray-900 font-semibold underline"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                  onClick={closeMobileMenu}
                >
                  AI Integration
                </Link>
                <Link
                  href="/services/process-automation"
                  className={`text-sm transition-colors py-1 block ${
                    isProcessAutomation
                      ? "text-gray-900 font-semibold underline"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                  onClick={closeMobileMenu}
                >
                  Process Automation
                </Link>
                <Link
                  href="/services/tvorflow-platform"
                  className={`text-sm transition-colors py-1 block ${
                    isTvorFlowPlatform
                      ? "text-gray-900 font-bold underline"
                      : "text-gray-600 hover:text-gray-900 font-medium"
                  }`}
                  onClick={closeMobileMenu}
                >
                  TvorFlow Platform
                </Link>
                <Link
                  href="/services/spec-documentation"
                  className={`text-sm transition-colors py-1 block ${
                    isSpecDocumentation
                      ? "text-gray-900 font-semibold underline"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                  onClick={closeMobileMenu}
                >
                  Technical Documentation
                </Link>
                <Link
                  href="/services/documentation-audit"
                  className={`text-sm transition-colors py-1 block ${
                    isDocumentationAudit
                      ? "text-gray-900 font-semibold underline"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                  onClick={closeMobileMenu}
                >
                  Documentation Audit
                </Link>
              </div>
            </div>

            <Link
              href="/expertise"
              className={`text-lg font-medium transition-colors py-2 ${
                isExpertise
                  ? "text-gray-900 border-l-4 border-gray-900 pl-4"
                  : "text-gray-700 hover:text-gray-900 pl-4"
              }`}
              onClick={closeMobileMenu}
            >
              Expertise
            </Link>

            <Link
              href="/about"
              className={`text-lg font-medium transition-colors py-2 ${
                isAbout
                  ? "text-gray-900 border-l-4 border-gray-900 pl-4"
                  : "text-gray-700 hover:text-gray-900 pl-4"
              }`}
              onClick={closeMobileMenu}
            >
              About
            </Link>

            <Link
              href="/platform"
              className={`text-lg font-medium transition-colors py-2 ${
                isPlatform
                  ? "text-gray-900 border-l-4 border-gray-900 pl-4"
                  : "text-gray-700 hover:text-gray-900 pl-4"
              }`}
              onClick={closeMobileMenu}
            >
              Platform
            </Link>

            <div className="border-t border-gray-200 mt-6 pt-6">
              <Link
                href="/contact"
                className={`text-lg font-medium transition-colors py-2 block ${
                  isContact
                    ? "text-gray-900 border-l-4 border-gray-900 pl-4"
                    : "text-gray-700 hover:text-gray-900 pl-4"
                }`}
                onClick={closeMobileMenu}
              >
                Contact
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}
