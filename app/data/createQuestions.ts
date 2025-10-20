"use server";
import { generateData } from "../utils/fetch";

export async function createQuestions(prevState: any, formData: FormData) {
  const rows = formData.get("rows")?.toString();
  const columns = formData.get("columns")?.toString();
  const rawCategories = formData.get("categories")?.toString();

  if (!rows || !columns || !rawCategories) {
    return { error: "Missing input" };
  }

  const categories = rawCategories
    .split("\n")
    .map((v) => v.trim())
    .filter((v) => v.length > 0);

  if (categories.length !== Number(columns)) {
    return { error: "Missing or too many categories specified" };
  }

  const res = await generateData(rows, columns, categories);
  if (!res.ok) {
    return { error: "Failed to generate questions" };
  }

  return { 
    success : true,
    error: null
  };
}