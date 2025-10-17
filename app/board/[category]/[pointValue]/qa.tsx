"use client";
import { useState } from "react";
import { redirect } from "next/navigation";

export type QAProps = {
    params: {
        question: string
        answer: string
    }
};

export default function ToggleQA({ params }: QAProps) {
    const { question, answer } = params;
    const [showAnswer, setShowAnswer] = useState(false);

    const goToBoard = async () => {
        redirect(`/board`);
    };

    return (
        <div className="flex flex-col items-center gap-6">
        <p className="text-4xl text-gray-900 text-center font-semibold">
            {showAnswer ? answer : question}
        </p>
        {/* On question page */}
        {!showAnswer && 
        <button 
            onClick={() => setShowAnswer(!showAnswer)} 
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded transition"
        >
            Show Answer
        </button>}
        {showAnswer && <div className="flex flex-row gap-10">
            <button className="bg-red-200 hover:bg-red-300 font-semibold py-3 px-8 rounded transition" onClick={() => goToBoard()}>
                Incorrect
            </button>
            <button className="bg-green-200 hover:bg-green-300 font-semibold py-3 px-8 rounded transition" onClick={() => goToBoard()}>
                Correct
            </button>
        </div>}
        </div>
    );
}
  