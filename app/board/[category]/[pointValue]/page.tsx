import { RequestProps, JeopardyEntry} from "@/app/api/data/route";
import ToggleQA from "./qa"

type QuestionPageProps = {
  params: Promise<{
    category: string
    pointValue: string
  }>;
};

export default async function ToggleCard({ params }: QuestionPageProps) {
  const { category, pointValue } = await params;

  const getProps : RequestProps = {
    action: "card",
    category: decodeURIComponent(category),
    pointValue: decodeURIComponent(pointValue)
  };  

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const res = await fetch(`${baseUrl}/api/data`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(getProps),
  });
  const questionAnswer : JeopardyEntry = await res.json();
  
  const toggleParams = {
      question: questionAnswer?.question ?? "Question not found.",
      answer: questionAnswer?.answer ?? "Answer not found.",
  };
  
  return (
    <main className="flex p-10 justify-center">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-10 mx-4 max-h-[calc(100vh-2rem)] overflow-auto flex flex-col">
        <div>
          <h1 className="text-3xl font-bold text-blue-800 mb-3">
            Category: {decodeURIComponent(category)}
          </h1>
          <h2 className="text-2xl font-semibold text-gray-700 mb-6">
            For ${pointValue}
          </h2>
          <ToggleQA params={toggleParams} />
        </div>
      </div>
    </main>
  );
}
