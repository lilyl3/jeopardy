"use client";

import { useActionState } from "react";
import { createQuestions } from "./data/createQuestions";

export default function Home() {

  const initialState = {
    error: null
  };
  const [state, formAction, isPending] = useActionState(createQuestions, initialState);
  return (
    <form action={formAction} className="flex flex-col gap-4 max-w-xs mx-auto mt-10 bg-white p-10 rounded-xl shadow-lg">
      <label> Rows:
        <input name="rows" type="number" min={1} defaultValue={2} required className="border p-2 rounded w-full"/>
      </label>

      <label> Columns:
        <input name="columns" type="number" min={1} defaultValue={2} required className="border p-2 rounded w-full"/>
      </label>

      <label>
        Enter Categories:
        <textarea
          name="categories"
          placeholder="One value per line"
          rows={5}
          className="border p-2 rounded w-full"
        />
      </label>
      {state["error"] ? <p className="text-red-500">{state["error"]}</p> : null}

      <button type="submit" disabled={isPending} className="bg-blue-200 text-black py-2 rounded hover:bg-blue-300">
        Generate Questions
      </button>
    </form>
  );
}