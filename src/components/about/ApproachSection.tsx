"use client";

interface ApproachSectionProps {
  content: {
    title: string;
    items: { title: string; description: string }[];
  };
}

export default function ApproachSection({ content }: ApproachSectionProps) {
  return (
    <section className="w-full max-w-5xl mx-auto px-4 sm:px-6 md:px-8 py-16 md:py-24 ">
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
    </section>
  );
}

// export default function ApproachSection() {
//   return (
//     <section className="w-full bg-gray-50 py-16 md:py-24">
//       <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 md:px-8">
//         <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900">
//           Наш подход
//         </h2>

//         {/* <ul className="mt-8 space-y-8 text-gray-700 text-base sm:text-lg md:text-xl list-disc pl-5"> */}
//         <ul className="mt-6 space-y-8 text-gray-700 text-base leading-relaxed sm:text-lg md:text-xl list-disc pl-5">
//           <li>
//             <strong>Agile и гибкость:</strong> мы работаем быстро, поэтапно и
//             адаптивно. Каждый этап приносит клиенту конкретную пользу и
//             измеримый результат.
//           </li>
//           <li>
//             <strong>Этапы работы:</strong> анализ требований, проектирование
//             архитектуры, создание прототипов, разработка, тестирование и
//             внедрение решения.
//           </li>
//           <li>
//             <strong>Прозрачность и контроль:</strong> фиксируем сроки и
//             стоимость, регулярно демонстрируем прогресс и результаты, всегда на
//             связи с клиентом.
//           </li>
//           <li>
//             <strong>Ориентация на результат:</strong> мы сфокусированы на
//             реальной ценности для бизнеса, а не просто на выпуске программного
//             продукта.
//           </li>
//         </ul>
//       </div>
//     </section>
//   );
// }
