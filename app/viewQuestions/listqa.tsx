import { JeopardyEntry } from "../api/data/route";

type ListQAProps = {
    pointValue: string
    entry: JeopardyEntry;
};

export default function ListQA({ pointValue, entry }: ListQAProps) {
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
            defaultValue={entry.answer}
            required
            className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-green-300"
          />
        </div>
  
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors"
        >
          Update
        </button>
      </div>
    );
}
  