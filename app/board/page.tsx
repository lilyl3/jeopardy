import Card from "../components/Card";
import { Category } from "../components/Card";
import { fetchBoardProps } from "../utils/fetch";

export default async function Board() {
  const { rows, columns, categories } = await fetchBoardProps();
  const rowCount = Number(rows) || 5;
  const colCount = Number(columns) || 5;

  const range = (n : number) => Array.from({ length: n }, (_, i) => i + 1);
  const cards = range(rowCount).flatMap((row) => {
    const pointValue = row * 100;
    return range(colCount).map((column) => {
      return <Card key={`${column}-${pointValue}`} category={column.toString()} pointValue={pointValue.toString()}></Card>
    });
  });

  const categoryCards = categories.map((c) => {
    return <Category key={c} name={c} />;
  });
  
  return (
    <div className="flex justify-center">
      <div
        className="grid gap-4 p-4"
        style={{ gridTemplateColumns: `repeat(${colCount}, minmax(0, 1fr))` }}
      >
        {categoryCards}
        {cards}
      </div>
    </div>
  );
}
