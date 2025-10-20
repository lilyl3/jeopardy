import { fetchBoardProps } from "../utils/fetch";
import { BoardProps } from "../api/data/route";
import ListCategory from "./listCategory";

export default async function ViewQA() {
  const { categories } : BoardProps = await fetchBoardProps();
  return <ListCategory categories={categories} />;
}
