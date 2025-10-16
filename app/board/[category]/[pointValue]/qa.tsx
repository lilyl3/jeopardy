"use client";
import { useState } from "react";
import { redirect } from "next/navigation";
import { BoardProps, RequestProps } from "@/app/api/data/route";

export type QAProps = {
    params: {
        question: string
        answer: string
    }
};

export default function ToggleQA({ params }: QAProps) {
    const { question, answer } = params;
    const [showAnswer, setShowAnswer] = useState(false);

    const RequestProps : RequestProps = {
        action: "board",
      };  

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const goToBoard = async () => {
        const res = await fetch(`${baseUrl}/api/data`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(RequestProps),
        }); 
        const boardProps : BoardProps = await res.json();
        redirect(`/board?rows=${boardProps.rows}&columns=${boardProps.columns}`);
    };

    return (
        <div className="flex flex-col items-center gap-6">
        <p className="text-4xl text-gray-900 text-center font-semibold">
            {showAnswer ? answer : question}
        </p>
        <button 
            onClick={() => setShowAnswer(!showAnswer)} 
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded transition"
        >
            {showAnswer ? "Show Question" : "Show Answer"}
        </button>
        <button className="bg-orange-200 hover:bg-blue-300 font-semibold py-3 px-8 rounded transition"
        onClick={() => goToBoard()}>
            Home
        </button>
        </div>
    );
}
  