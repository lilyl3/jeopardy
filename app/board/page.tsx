import Card from "../components/Card";

type BoardPageProps = {
  searchParams: Promise<{
    rows?: string;      // URL query params are always strings
    columns?: string;
  }>;
};

export default async function Board({ searchParams }: BoardPageProps) {
  const { rows, columns } = await searchParams;

  const rowCount = Number(rows) || 5;
  const colCount = Number(columns) || 5;

  const range = (n : number) => Array.from({ length: n }, (_, i) => i + 1);
  const cards = range(rowCount).flatMap((row) => {
    const pointValue = row * 100;
    return range(colCount).map((column) => {
      return <Card key={`${column}-${pointValue}`} category={column.toString()} pointValue={pointValue.toString()}></Card>
    });
  });

  // TODO: Display categories
  
  return (
    <div className="flex justify-center">
      <div
        className="grid gap-4 p-4"
        style={{ gridTemplateColumns: `repeat(${colCount}, minmax(0, 1fr))` }}
      >
        {cards}
      </div>
    </div>
  );
}
