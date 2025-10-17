"use client";

import { useEffect, useState, Suspense } from "react"
import { fetchCategory } from "../utils/fetch";
import { CategoryData } from "../api/data/route";
import ListQA from "./listqa";

type ListCategoryProps = {
    categories: string[];
  };
  
  export default function ListCategory({ categories }: ListCategoryProps) {
    const [category, setCategory] = useState<string | null>(null);
    const [categoryQAs, setCategoryQAs] = useState<CategoryData | null>(null);

    async function fetchData() {
        if (!category) return;
        console.log("fetching data")
        const data : CategoryData = await fetchCategory(category);
        console.log(data)
        setCategoryQAs(data);
    }

    useEffect(() => {
        fetchData();
    }, [category]);

    return (
      <div className="flex flex-col gap-2 w-full max-w-sm mx-auto my-4">
        <label
          htmlFor="category-select"
          className="text-sm font-semibold text-gray-700"
        >
          Select a Category:
        </label>
        <select
          id="category-select"
          value={category ?? ""}
          onChange={(e) => setCategory(e.target.value)}
          className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
            <option value=""></option>
            {categories.map((category) => (
                <option key={category} value={category}>
                {category}
                </option>
          ))}
        {/* Display list of questions and answers in a category */}
        </select>
        <Suspense fallback={<p>Loading...</p>}>
            {categoryQAs && Object.entries(categoryQAs).map(([pointValue, entry]) => (
                // React uses the keys to determine if the component should be rerendered
                <ListQA key={`${entry.category}-${pointValue}`} pointValue={pointValue} entry={entry} />
            ))}
        </Suspense>
      </div>
    );
  }
  