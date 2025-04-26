"use client";

interface HeroSectionProps {
  content: {
    title: string;
    description: string;
  };
}

export default function HeroSection({ content }: HeroSectionProps) {
  return (
    <section className="w-full max-w-5xl mx-auto px-4 sm:px-6 md:px-8 text-center py-16 md:py-24">
      <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900">
        {content.title}
      </h1>
      <p className="mt-6 text-base sm:text-lg text-gray-700 leading-relaxed max-w-2xl mx-auto">
        {content.description}
      </p>
    </section>
  );
}
