"use server";
import { redirect } from "next/navigation";
import { RequestProps } from "../api/data/route";
import { baseUrl } from "../utils/dataTypes";

export async function createQuestions(prevState: any, formData: FormData) {
    const rows = formData.get("rows");
    const columns = formData.get("columns");
    const rawCategories = formData.get("categories") as string;
  
    // Check that user entered [column] categories
    const categories = rawCategories.split("\n").map(v => v.trim()).filter(v => v.length > 0);
    if (categories.length != Number(columns)) {
      return {error: "Missing or too many categories specified"};
    }

    const props : RequestProps = {
      action: "generate",
      rows: rows?.toString(),
      columns: columns?.toString(),
      categories: categories
    };  
  
    const res = await fetch(`${baseUrl}/api/data`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(props),
    });
  
    redirect(`/viewQuestions`);

    return {error: null};
}