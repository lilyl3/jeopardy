"use server";
import { redirect } from "next/navigation";

export async function createQuestions(prevState: any, formData: FormData) {
    const rows = formData.get("rows");
    const columns = formData.get("columns");
    const rawCategories = formData.get("categories") as string;
  
    // Check that user entered [column] categories
    const categories = rawCategories.split("\n").map(v => v.trim()).filter(v => v.length > 0);
    if (categories.length != Number(columns)) {
      return {error: "Missing or too many categories specified"};
    }
  
    redirect(`/board?rows=${rows}&columns=${columns}`);
  
    return {error: null}
}