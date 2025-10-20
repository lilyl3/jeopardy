"use client";

import { useActionState, useEffect } from "react";
import { createQuestions } from "./data/createQuestions";
import { useRouter } from "next/navigation";

export default function Home() {

  const router = useRouter();
  const initialState = {
    success: false,
    error: null
  };

  const [state, formAction, isPending] = useActionState(createQuestions, initialState);
  useEffect(() => {
    if (state.success) {
      router.push('/viewQuestions');
    }
  }, [state.success])

  if (state.success) {
    return <></>
  }

  if (isPending) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
        <span className="ml-4 text-lg text-blue-700">Creating questions...</span>
      </div>
    );
  }

  return (
    <form action={formAction} className="flex flex-col gap-4 max-w-xs mx-auto mt-10 bg-white p-10 rounded-xl shadow-lg">
      <label> Rows:
        <input name="rows" type="number" min={1} defaultValue={2} required className="border p-2 rounded w-full"/>
      </label>

      <label> Columns:
        <input name="columns" type="number" min={1} defaultValue={3} required className="border p-2 rounded w-full"/>
      </label>

      <label>
        Enter Categories:
        <textarea
          name="categories"
          placeholder="One value per line"
          defaultValue={"cat\nhat\nmat"}
          rows={5}
          className="border p-2 rounded w-full"
        />
      </label>
      {state["error"] ? <p className="text-red-500">{state["error"]}</p> : null}

      <button type="submit" disabled={isPending} className="bg-blue-200 text-black py-2 rounded hover:bg-blue-300">
        Create Questions
      </button>
    </form>
  );
}