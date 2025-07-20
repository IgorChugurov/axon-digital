import React from "react";

export type iconKeys =
  | "brainCircuit"
  | "bot"
  | "building"
  | "calculator"
  | "activity"
  | "banknote"
  | "stethoscope"
  | "shoppingCart";

export interface ExpertiseItem {
  icon: iconKeys;
  title: string;
  description: string;
  slug: string;
}

export interface CaseStudy {
  title: string;
  description: string;
  impact: string;
}

export const expertiseItems: ExpertiseItem[] = [
  {
    icon: "banknote",
    title: "Fintech & Financial Services",
    description:
      "Applied accounting systems with inventory, cash flow, and settlement modules. Automated trial balance generation and financial reporting with real business integrations.",
    slug: "fintech-financial",
  },
  {
    icon: "stethoscope",
    title: "Healthcare & Medical Technology",
    description:
      "HIPAA-compliant systems for clinics: EMR, visit notes, appointment scheduling, medical documentation, and integration with lab equipment and 3D prosthetic printers.",
    slug: "healthcare-medtech",
  },
  {
    icon: "shoppingCart",
    title: "E-commerce & Retail Technology",
    description:
      "Integrated e-commerce systems for stores and marketplaces with real-time inventory, accounting integration, storefront analytics, and vendor-friendly tools.",
    slug: "ecommerce-retail",
  },
  {
    icon: "calculator",
    title: "Enterprise & Corporate Solutions",
    description:
      "Workflow automation, document control, and integration of new features into legacy systems via micro-frontends — tailored to real enterprise needs.",
    slug: "enterprise-corporate",
  },
  {
    icon: "activity",
    title: "Education & Learning Platforms",
    description:
      "Learning management systems, educational content platforms, student information systems, and interactive learning tools for modern education.",
    slug: "education-edtech",
  },
  {
    icon: "building",
    title: "Real Estate & Property Technology",
    description:
      "Property platforms with advanced search, map integration, and custom business models connecting clients, property owners, and platform operators.",
    slug: "proptech-realestate",
  },
];

export const caseStudies: CaseStudy[] = [
  {
    title: "Fintech Payment Platform",
    description:
      "A fintech startup needed a secure payment processing platform with real-time transaction monitoring and compliance features. We built a comprehensive solution with multi-currency support and regulatory compliance.",
    impact:
      "Processed over $10M in transactions within first quarter, achieved PCI DSS compliance, and reduced transaction processing time by 50%.",
  },
  {
    title: "Healthcare Management System",
    description:
      "A medical clinic network required a unified system for patient records, appointment scheduling, and clinical workflows. We developed a HIPAA-compliant platform with telemedicine capabilities.",
    impact:
      "Improved patient satisfaction by 40%, reduced administrative overhead by 35%, and enabled remote consultations during pandemic.",
  },
  {
    title: "E-commerce Marketplace Platform",
    description:
      "A growing retailer needed a scalable e-commerce platform with advanced inventory management and customer analytics. We created a comprehensive solution with real-time reporting.",
    impact:
      "Increased online sales by 65%, improved inventory accuracy to 99.5%, and provided actionable customer insights that boosted conversion rates.",
  },
];
