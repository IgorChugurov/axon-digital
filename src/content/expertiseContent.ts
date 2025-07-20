export interface ExpertiseContent {
  title: string;
  intro: string;
  content: string[];
}

export const expertiseContent: Record<string, ExpertiseContent> = {
  "fintech-financial": {
    title: "Fintech & Financial Services",
    intro:
      "We develop applied financial solutions grounded in real-world use cases and deep expertise in accounting and business process automation. Our accounting automation platform covers all core enterprise operations and can be used as a full system or modularly via API.",
    content: [
      "Automated accounting system with inventory and warehouse management, cash flow tracking, settlements with suppliers and customers, and multi-division accounting.",
      "Automated generation of trial balances (TB) and account-based postings without manual input.",
      "Comprehensive financial reporting, including balance sheets and profit & loss statements.",
      "Flexible API enabling integration of individual modules into external systems and workflows.",
      "Real-world use cases: warehouse and production integration on a fashion e-commerce site; full automation of accounting and CRM in an automotive service network.",
    ],
  },
  "healthcare-medtech": {
    title: "Healthcare & Medical Technology",
    intro:
      "We develop HIPAA-compliant healthcare solutions. Our focus is on building systems for clinics that center around patient care, treatment workflows, and secure medical documentation.",
    content: [
      "Electronic medical records (EMR) with full patient history, attached documents, and visit summaries.",
      "Appointment scheduling systems, integrated with physician calendars and automated reminders.",
      "Physician-facing interfaces for recording structured visit notes, diagnoses, and prescribed treatment plans.",
      "Automated generation of medical documents, including clinical notes, referrals, certificates, and discharge summaries.",
      "Document workflow management, covering internal records and external document exchange related to patient treatment.",
      "Integration with medical hardware, including lab systems and 3D printers for custom prosthetics.",
      "End-to-end data security and full HIPAA compliance in system architecture, storage, and access control.",
    ],
  },
  "ecommerce-retail": {
    title: "E-commerce & Retail Technology",
    intro:
      "Our expertise lies in developing integrated e-commerce solutions that ensure a seamless buying experience for customers and provide store owners with simple, effective tools for managing products, stock, and analytics. We build both individual online stores and full-scale marketplaces with real-time inventory tracking and accounting system integrations.",
    content: [
      "User-friendly shopping interfaces that help customers easily find and purchase the products they need — search, filters, personalized recommendations, and streamlined checkout.",
      "Product management dashboards for store owners: control over product cards, pricing, categories, photos, stock levels, and availability.",
      "Support for both single-store and marketplace models, including multi-vendor architecture, commission tracking, and internal logistics tools.",
      "Integration with internal accounting systems, enabling synchronization of sales data, stock movements, and inventory balance.",
      "Analytics and reporting tools that track sales performance, inventory dynamics, top-performing products, and storefront efficiency.",
      "Real-time inventory tracking, with automatic updates on sales, arrivals, and returns.",
    ],
  },
  "education-edtech": {
    title: "Education & Learning Platforms",
    intro:
      "We develop educational technology solutions that enhance learning experiences, streamline administrative processes, and improve educational outcomes. Our platforms serve schools, universities, corporate training, and online education providers.",
    content: [
      "Learning Management Systems (LMS) with course creation, student progress tracking, assessment tools, and collaborative learning environments.",
      "Student Information Systems with enrollment management, grade tracking, attendance monitoring, and parent-teacher communication portals.",
      "Online course platforms with video streaming, interactive content, certification tracking, and payment processing for educational institutions.",
      "Corporate training solutions with skills assessment, compliance training, performance tracking, and integration with HR management systems.",
      "Educational analytics with learning outcome analysis, student performance prediction, curriculum optimization, and institutional reporting dashboards.",
    ],
  },
  "proptech-realestate": {
    title: "Real Estate & Property Technology",
    intro:
      "We build real estate platforms focused on advanced property search, listing management, and custom business models that define how clients, property owners, and platform operators interact. Our systems are designed for clarity, flexibility, and scale.",
    content: [
      "Property listing platforms with detailed parameters: price, location, size, property type, legal status, availability, and more.",
      "Advanced filtering and search logic — covering everything from infrastructure and layout to floor level and documentation.",
      "Map-based search and visualization, allowing users to explore listings geographically and evaluate proximity and infrastructure.",
      "Owner dashboards with tools for managing listings, statuses, responses, and performance metrics.",
      "Support for custom business models, including clearly separated roles for clients (buyers/renters), property owners, and platform operators (aggregators, agencies).",
      "Scalable, high-performance architecture, fully adapted for mobile use and large property databases.",
    ],
  },
  "enterprise-corporate": {
    title: "Enterprise & Corporate Solutions",
    intro:
      "We develop corporate systems focused on automating key business processes and internal document workflows. Our solutions reduce manual overhead, improve control, and bring operational transparency to complex enterprise environments.",
    content: [
      "Corporate document workflow systems, with approval routing, status tracking, templates, e-signatures, and archiving.",
      "Automation of specialized business processes, tailored to the company's internal structure: calculations, data validation, reporting, ledger generation, and more.",
      "Interfaces for multiple roles and departments, with fine-grained access control, task-specific views, and audit logging.",
      "Integration with existing IT infrastructure, using APIs or direct connections to internal databases and services.",
      "Embedding new functionality into legacy systems through micro-frontend architecture — without the need for full UI rework.",
      "Execution monitoring and reporting, with dashboards, SLA tracking, notifications, and process analytics.",
      "Scalable architecture, ready to grow with your company and adapt to evolving internal workflows.",
    ],
  },
};
