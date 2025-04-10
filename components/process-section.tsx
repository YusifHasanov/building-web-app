// resources/js/Components/ProcessSection.tsx
import { BASE_URL } from "@/const";

// Process Step için tip tanımlaması
interface ProcessStep {
  id: number;
  title: string;
  description: string;
  sort: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export async function ProcessSection() {
  // Adımları API'den çek
  let steps: ProcessStep[] = [];

  try {
    const response = await fetch(`${BASE_URL}/process-steps`, {
      cache: 'no-store',
      next: { revalidate: 60 }
    });

    if (!response.ok) {
      throw new Error(`API yanıt vermedi: ${response.status}`);
    }

    steps = await response.json();
  } catch (error) {
    console.error('İş süreci adımları yüklenirken hata oluştu:',
        error instanceof Error ? error.message : String(error));
  }

  return (
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <h2 className="text-4xl font-bold mb-4">Unser Arbeitsprozess</h2>
            <div className="w-24 h-1 bg-brand-yellow mx-auto mb-6"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Wir arbeiten strukturiert und transparent, um Ihr Projekt erfolgreich umzusetzen.
            </p>
          </div>

          {steps.length === 0 ? (
              <div className="flex justify-center items-center h-64">
                <div className="flex flex-col items-center p-8 rounded-lg bg-white shadow-sm">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-yellow mb-4"></div>
                  <p className="text-gray-600">Daten werden geladen...</p>
                </div>
              </div>
          ) : (
              <div className="max-w-5xl mx-auto relative">
                {/* Vertical line for the timeline */}
                <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-brand-yellow/20 rounded-full"></div>

                {steps.map((step, index) => (
                    <div
                        key={step.id}
                        className={`flex mb-16 items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                    >
                      {/* Timeline dot */}
                      <div className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full bg-white border-4 border-brand-yellow z-10"></div>

                      {/* Content */}
                      <div className={`w-5/12 ${index % 2 === 0 ? 'pr-16 text-right' : 'pl-16 text-left'}`}>
                        <div
                            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow border-l-4 border-brand-yellow"
                        >
                    <span className="bg-brand-yellow text-white text-sm font-bold py-1 px-3 rounded-full mb-4 inline-block">
                      Schritt {index + 1}
                    </span>
                          <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                          <p className="text-gray-600">{step.description}</p>
                        </div>
                      </div>

                      <div className="w-2/12"></div> {/* Spacer for the timeline */}

                      <div className="w-5/12"></div> {/* Space for the other side */}
                    </div>
                ))}
              </div>
          )}
        </div>
      </section>
  );
}
