import Header from "@/app/components/Header";
import servicesPages from "@/content/servicesPages.json";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = servicesPages[slug as keyof typeof servicesPages];
  return {
    title: page?.title || "Service",
    description: page?.description || "",
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = servicesPages[slug as keyof typeof servicesPages];

  if (!page) {
    return <div>Page not found</div>;
  }

  return (
    <main className="flex flex-1 flex-col bg-white overflow-auto">
      <Header />

      <div className="digital-style flex flex-col flex-1 overflow-hidden">
        <div className="flex-1 flex flex-col overflow-y-auto scrollbar-hide">
          <div className="max-w-4xl mx-auto py-12 px-4">
            <h1 className="text-3xl font-bold mb-8 text-center">
              {page.title}
            </h1>
            <p className="text-gray-700 text-center mb-8">{page.description}</p>

            <div className="prose prose-lg max-w-none">
              {page.items.map((item) => (
                <div key={item.title}>
                  <h2 className="text-xl font-bold mt-4 text-gray-900">
                    {item.title}
                  </h2>
                  <p className="text-gray-700">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
