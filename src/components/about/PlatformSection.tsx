import Link from "next/link";

export default function PlatformSection() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          {/* <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center">
              <svg
                className="w-10 h-10 text-blue-600"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2L1 7v10c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V7L12 2zm0 2.2L20.8 9H3.2L12 4.2z" />
                <path d="M12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
              </svg>
            </div>
          </div> */}
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Our Proprietary Technology
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-8">
            We&apos;ve developed <strong>CoreFlow Platform</strong> — a
            revolutionary no-code solution that automatically generates
            enterprise-grade applications from simple data structure
            configurations.
            <strong>
              {" "}
              Deploy any application in days, not months, while reducing
              development costs by up to 70%.
            </strong>
          </p>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-8 lg:p-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">
                CoreFlow Platform
              </h3>
              <p className="text-lg text-gray-600 mb-8">
                Instead of manually coding every CRUD operation, admin panel,
                and API endpoint, our platform generates everything
                automatically based on declarative entity definitions.
                <strong>
                  {" "}
                  This revolutionary approach allows us to deploy any
                  data-driven application — from CRM systems to patient
                  management platforms — in days instead of months, while
                  reducing development costs by 70%.
                </strong>
              </p>

              <div className="grid grid-cols-2 gap-6 mb-8">
                <div>
                  <div className="text-2xl font-bold text-blue-600 mb-2">
                    70%
                  </div>
                  <div className="text-sm text-gray-600">
                    Faster Development
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600 mb-2">
                    Zero
                  </div>
                  <div className="text-sm text-gray-600">Manual CRUD Code</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-600 mb-2">
                    100%
                  </div>
                  <div className="text-sm text-gray-600">Auto-Generated UI</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-orange-600 mb-2">
                    Multi
                  </div>
                  <div className="text-sm text-gray-600">Tenant Ready</div>
                </div>
              </div>

              <Link
                href="/platform"
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors"
              >
                Learn More About Our Platform
                <svg
                  className="ml-2 w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
            </div>

            <div className="relative">
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <span className="text-blue-600 font-bold text-sm">1</span>
                    </div>
                    <span className="text-gray-800 font-medium">
                      Define Entity Structure
                    </span>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4 font-mono text-sm">
                    <div className="text-gray-600">{`// Example: Patient Entity`}</div>
                    <div className="text-blue-600">name: &quot;text&quot;</div>
                    <div className="text-blue-600">
                      email: &quot;email&quot;
                    </div>
                    <div className="text-blue-600">
                      appointments: &quot;oneToMany&quot;
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                      <span className="text-green-600 font-bold text-sm">
                        2
                      </span>
                    </div>
                    <span className="text-gray-800 font-medium">
                      Auto-Generate Everything
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div className="bg-blue-50 p-3 rounded-lg text-center">
                      <div className="text-xs font-medium text-blue-700">
                        API
                      </div>
                      <div className="text-blue-600 text-xs">CRUD</div>
                    </div>
                    <div className="bg-green-50 p-3 rounded-lg text-center">
                      <div className="text-xs font-medium text-green-700">
                        Forms
                      </div>
                      <div className="text-green-600 text-xs">UI</div>
                    </div>
                    <div className="bg-purple-50 p-3 rounded-lg text-center">
                      <div className="text-xs font-medium text-purple-700">
                        Tables
                      </div>
                      <div className="text-purple-600 text-xs">Admin</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                      <span className="text-purple-600 font-bold text-sm">
                        3
                      </span>
                    </div>
                    <span className="text-gray-800 font-medium">
                      Deploy & Scale
                    </span>
                  </div>
                </div>
              </div>

              {/* Floating badge */}
              <div className="absolute -top-4 -right-4 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-bold transform rotate-12">
                Proprietary Tech
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">
            Why This Matters for Your Project
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-6 h-6 text-green-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h4 className="font-bold text-gray-900 mb-2">
                Faster Time-to-Market
              </h4>
              <p className="text-gray-600 text-sm">
                We deliver working prototypes and MVPs in weeks, not months,
                thanks to automatic code generation.
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-6 h-6 text-blue-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="font-bold text-gray-900 mb-2">
                Lower Development Costs
              </h4>
              <p className="text-gray-600 text-sm">
                Automatic generation means less manual coding, resulting in
                significant cost savings for complex applications.
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-6 h-6 text-purple-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h4 className="font-bold text-gray-900 mb-2">
                Enterprise-Grade Quality
              </h4>
              <p className="text-gray-600 text-sm">
                Generated code follows best practices and includes security,
                validation, and scalability by default.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
