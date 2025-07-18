import type { Metadata } from "next";
import Link from "next/link";
import Footer from "../components/Footer";
import Header from "../components/Header";

export const metadata: Metadata = {
  title: "CoreFlow Platform - No-Code Data Management Solution | AxonDigital",
  description:
    "Our proprietary SaaS platform for automated application development. Configure data structures, generate CRUD APIs and admin panels automatically.",
  keywords:
    "no-code platform, data management, API generation, admin panels, SaaS solution, enterprise software",
};

export default function PlatformPage() {
  return (
    <main className="flex flex-1 flex-col  bg-white overflow-auto min-h-screen">
      <Header />

      <div className="flex flex-col flex-1  overflow-hidden">
        <div className="flex-1 flex flex-col overflow-y-auto  scrollbar-hide">
          {/* Hero Section */}
          <section className="relative bg-gradient-to-r from-gray-700 to-slate-800 text-white py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center">
                <h1 className="text-5xl font-bold mb-6">CoreFlow Platform</h1>
                <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
                  Our proprietary no-code platform that automatically generates
                  enterprise-grade applications from data structure
                  configurations.{" "}
                  <strong>
                    Deploy any application in days, not months, and reduce
                    development costs by up to 70%.
                  </strong>
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <span className="px-4 py-2 bg-white/20 rounded-full text-sm font-medium">
                    Automatic API Generation
                  </span>
                  <span className="px-4 py-2 bg-white/20 rounded-full text-sm font-medium">
                    Multi-tenant Architecture
                  </span>
                  <span className="px-4 py-2 bg-white/20 rounded-full text-sm font-medium">
                    Zero-Code CRUD
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* Core Capabilities */}
          <section className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">
                  Revolutionary Approach to Application Development
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  CoreFlow Platform eliminates the need for manual CRUD
                  development, automatically generating APIs and admin
                  interfaces from declarative configurations.
                  <strong>
                    {" "}
                    This approach enables rapid deployment of any data-driven
                    application — from simple management systems to complex
                    enterprise solutions — reducing both time-to-market and
                    development costs dramatically.
                  </strong>
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-white p-8 rounded-2xl shadow-lg">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                    <svg
                      className="w-6 h-6 text-blue-600"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    Automatic UI Generation
                  </h3>
                  <p className="text-gray-600">
                    Admin panels, forms, tables, and validation are
                    automatically generated based on entity definitions. No
                    manual frontend development required.
                  </p>
                </div>

                <div className="bg-white p-8 rounded-2xl shadow-lg">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-6">
                    <svg
                      className="w-6 h-6 text-green-600"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    Enterprise Multi-tenancy
                  </h3>
                  <p className="text-gray-600">
                    Complete data isolation with Projects, Groups, and
                    Facilities. Perfect for managing multiple organizations and
                    departments.
                  </p>
                </div>

                <div className="bg-white p-8 rounded-2xl shadow-lg">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
                    <svg
                      className="w-6 h-6 text-purple-600"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    Zero-Code Development
                  </h3>
                  <p className="text-gray-600">
                    Define data structures through configuration, not code. The
                    platform handles all CRUD operations, validation, and API
                    endpoints.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Architecture Overview */}
          <section className="py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-4xl font-bold text-gray-900 mb-6">
                    Two-Tier Administration
                  </h2>
                  <p className="text-lg text-gray-600 mb-8">
                    CoreFlow Platform uses a sophisticated two-level
                    administration system that scales from single applications
                    to enterprise organizations.
                  </p>

                  <div className="space-y-6">
                    <div className="flex gap-4">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-blue-600 font-bold text-sm">
                          1
                        </span>
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 mb-2">
                          System Administration Panel
                        </h3>
                        <p className="text-gray-600">
                          Configure projects, data structures, categories, and
                          global settings. Used by developers and system
                          architects.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-green-600 font-bold text-sm">
                          2
                        </span>
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 mb-2">
                          Data Management Panel
                        </h3>
                        <p className="text-gray-600">
                          Manage actual data instances within specific
                          organizations. Used by end-user administrators and
                          content managers.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-8 rounded-2xl">
                  <div className="space-y-4">
                    <div className="bg-blue-600 text-white p-4 rounded-xl">
                      <h4 className="font-bold mb-2">Application Frontend</h4>
                      <p className="text-sm text-blue-100">
                        End-user interface
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <div className="bg-white p-4 rounded-xl flex-1 border-2 border-gray-200">
                        <h4 className="font-bold text-gray-900 mb-2">
                          Management Panel
                        </h4>
                        <p className="text-xs text-gray-600">
                          Data administration
                        </p>
                      </div>
                      <div className="bg-white p-4 rounded-xl flex-1 border-2 border-gray-200">
                        <h4 className="font-bold text-gray-900 mb-2">
                          System Panel
                        </h4>
                        <p className="text-xs text-gray-600">Configuration</p>
                      </div>
                    </div>
                    <div className="bg-gray-800 text-white p-4 rounded-xl">
                      <h4 className="font-bold mb-2">CoreFlow Platform</h4>
                      <p className="text-sm text-gray-300">
                        Automatic generation engine
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Key Features */}
          <section className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">
                  Platform Capabilities
                </h2>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    icon: "🏗️",
                    title: "Entity Definition",
                    description:
                      "Define data structures declaratively with fields, types, and relationships",
                  },
                  {
                    icon: "🔄",
                    title: "Auto CRUD API",
                    description:
                      "RESTful APIs generated automatically for all entities with full validation",
                  },
                  {
                    icon: "🎨",
                    title: "Dynamic UI",
                    description:
                      "Forms, tables, and pages generated based on entity configurations",
                  },
                  {
                    icon: "🌍",
                    title: "Multi-language",
                    description:
                      "Built-in internationalization support with dynamic language switching",
                  },
                  {
                    icon: "🔐",
                    title: "Access Control",
                    description:
                      "Role-based permissions with facility-level data isolation",
                  },
                  {
                    icon: "⚙️",
                    title: "Environment Management",
                    description:
                      "Configurable variables for different deployment environments",
                  },
                  {
                    icon: "📊",
                    title: "Category System",
                    description:
                      "Global attributes and categories for flexible data classification",
                  },
                  {
                    icon: "🏢",
                    title: "Multi-tenant",
                    description:
                      "Complete isolation with Projects, Groups, and Facilities hierarchy",
                  },
                ].map((feature, index) => (
                  <div
                    key={index}
                    className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
                  >
                    <div className="text-2xl mb-3">{feature.icon}</div>
                    <h3 className="font-bold text-gray-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Use Cases */}
          <section className="py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">
                  Perfect For Enterprise Applications
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  CoreFlow Platform accelerates development of complex business
                  applications across various industries and use cases.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {[
                  {
                    title: "Healthcare Management",
                    description:
                      "Patient records, appointment scheduling, medical staff management with complete HIPAA compliance and multi-clinic support.",
                    features: [
                      "Patient Data Management",
                      "Multi-clinic Isolation",
                      "Appointment Systems",
                      "Staff Scheduling",
                    ],
                  },
                  {
                    title: "Educational Platforms",
                    description:
                      "Student information systems, course management, grading platforms with institution-level data separation.",
                    features: [
                      "Student Records",
                      "Course Management",
                      "Grade Tracking",
                      "Multi-institution",
                    ],
                  },
                  {
                    title: "Business Operations",
                    description:
                      "CRM systems, inventory management, project tracking with department-level access control.",
                    features: [
                      "Customer Management",
                      "Inventory Tracking",
                      "Project Tools",
                      "Department Isolation",
                    ],
                  },
                ].map((useCase, index) => (
                  <div
                    key={index}
                    className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100"
                  >
                    <h3 className="text-xl font-bold text-gray-900 mb-4">
                      {useCase.title}
                    </h3>
                    <p className="text-gray-600 mb-6">{useCase.description}</p>
                    <ul className="space-y-2">
                      {useCase.features.map((feature, featureIndex) => (
                        <li
                          key={featureIndex}
                          className="flex items-center text-sm"
                        >
                          <svg
                            className="w-4 h-4 text-green-500 mr-2"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20 bg-gradient-to-r from-gray-700 to-slate-800">
            <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
              <h2 className="text-4xl font-bold text-white mb-6">
                Ready to Build Your Next Application?
              </h2>
              <p className="text-xl text-blue-100 mb-8">
                Let&apos;s discuss how CoreFlow Platform can accelerate your
                project development and reduce time-to-market by 70%.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-xl text-gray-800 bg-white hover:bg-gray-50 transition-colors"
                >
                  Schedule a Demo
                </a>
                <Link
                  href="/#chat"
                  className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-base font-medium rounded-xl text-white hover:bg-white/10 transition-colors"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </section>

          <Footer />
        </div>
      </div>
    </main>
  );
}
