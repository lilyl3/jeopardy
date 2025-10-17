import { JeopardyEntry } from "../api/data/route";
import { updateCard } from "../utils/fetch";
import { useState } from "react";

type ListQAProps = {
    pointValue: string
    entry: JeopardyEntry;
};

export default function ListQA({ pointValue, entry }: ListQAProps) {
    const [question, setQuestion] = useState(entry.question);
    const [answer, setAnswer] = useState(entry.answer);
    const [isLoading, setLoading] = useState(false);
    const [showMessage, setShowMessage] = useState(false);

    return (
      <div className="border rounded-lg p-6 shadow-md mb-6 bg-white max-w-md w-full">
        <h3 className="text-xl font-bold text-blue-800 mb-4">For ${pointValue}</h3>
  
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Question:
          </label>
          <input
            name="question"
            type="text"
            onChange={(e) => setQuestion(e.target.value)}
            defaultValue={entry.question}
            required
            className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
        </div>
  
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Answer:
          </label>
          <input
            name="answer"
            type="text"
            onChange={(e) => setAnswer(e.target.value)}
            defaultValue={entry.answer}
            required
            className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-green-300"
          />
        </div>
  
        <button
            type="submit"
            disabled={isLoading}
            onClick={async () => {
                setLoading(true);
                await updateCard(entry.category, pointValue, question, answer);
                setLoading(false);

                setShowMessage(true);
                setTimeout(() => setShowMessage(false), 1000);
            }}
            className={`w-full flex items-center justify-center py-2 px-4 rounded-md 
                        font-semibold transition-all duration-200 
                        ${isLoading ? "bg-blue-300 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 text-white"}`}
        >
            {isLoading ? (
                <>
                <svg
                    className="animate-spin h-5 w-5 mr-2 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    ></circle>
                    <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8z"
                    ></path>
                </svg>
                Updating...
                </>
            ) : (
                "Update"
            )}
        </button>

        {showMessage && (
        <div className="mt-3 px-4 py-2 bg-green-100 text-green-800 rounded-md text-sm font-medium shadow-sm transition-opacity duration-500">
            Updated successfully!
        </div>
        )}
      </div>
    );
}
  