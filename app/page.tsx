import { error } from "console";
import { redirect } from "next/navigation";

export async function createBoard(formData: FormData) {
  "use server";
  const rows = formData.get("rows");
  const columns = formData.get("columns");

  if (!rows || !columns) {
    throw error("Invalid rows or columns")
  }

  redirect(`/board?rows=${rows}&columns=${columns}`);
}

export default function Home() {
  return (
    <form action={createBoard} className="flex flex-col gap-4 max-w-xs mx-auto mt-10">
      <label> Rows:
        <input name="rows" type="number" min={1} defaultValue={5} required className="border p-2 rounded w-full"/>
      </label>

      <label> Columns:
        <input name="columns" type="number" min={1} defaultValue={5} required className="border p-2 rounded w-full"/>
      </label>

      <button type="submit" className="bg-blue-200 text-black py-2 rounded hover:bg-blue-300">
        Create Board
      </button>
    </form>
  );
}