"use client";

interface ApproachSectionProps {
  content: {
    title: string;
    items: { title: string; description: string }[];
  };
}

export default function ApproachSection({ content }: ApproachSectionProps) {
  return (
    <section className="relative w-full max-w-5xl mx-auto px-4 sm:px-6 md:px-8 py-16 md:py-24">
      <div className="relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-10 text-center">
          {content.title}
        </h2>
        <ul className="divide-y divide-gray-200">
          {content.items.map((item, index) => (
            <li key={index} className="py-8 first:pt-0">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {item.title}
              </h3>
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                {item.description}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
