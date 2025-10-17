import { NextResponse } from 'next/server';

type Category = string;
type PointValue = string;

export type JeopardyEntry = {
    question: string;
    answer: string;
    category: string
};

export type CategoryData = Record<PointValue, JeopardyEntry>;
export type JeopardyData = Record<Category, CategoryData>;
export type BoardProps = {
    rows: string
    columns: string
    categories: string[]
};

let storedData: JeopardyData | null = null;
let boardProps : BoardProps;

export type RequestProps = {
    action : string
    category? : string
    pointValue? : string
    rows? : string
    columns? : string
    categories? : string[]
}

export async function POST(request: Request) {
  const props = await request.json();

  if (props.action === 'generate') {
    if (!props.rows || !props.columns || !props.categories) {
        return NextResponse.json({ error: 'Missing rows, columns, and/or categories' }, { status: 404 });
    }
    boardProps = {
      rows: props.rows,
      columns: props.columns,
      categories: props.categories
    };
    storedData = generatePlaceholderData(boardProps);
    return NextResponse.json({ message: 'Data saved' });
  }

  if (props.action === "all") {
    if (!storedData) {
      return NextResponse.json({ error: 'Missing rows, columns, and/or categories' }, { status: 404 });
    }
    return NextResponse.json(storedData);
  }

  if (props.action === 'card') {
    if (!storedData || !props.category || !props.pointValue) {
      return NextResponse.json({ error: 'Card not found or missing parameters' }, { status: 404 });
    }
    return NextResponse.json(storedData[props.category]?.[props.pointValue] ?? null);
  }

  if (props.action === 'category') {
    if (!storedData || !props.category) {
      return NextResponse.json({ error: `Category ${props.category} is not found`}, { status: 404 });
    }
    return NextResponse.json(storedData[props.category]);
  }

  if (props.action === 'board') {
    if (!boardProps) {
      return NextResponse.json({ error: 'Board props not found' }, { status: 404 });
    }
    return NextResponse.json(boardProps);
  }

  return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
}

function generatePlaceholderData(props: BoardProps): JeopardyData {
  const { rows, columns, categories } = props;
  const data: JeopardyData = {};

  categories.forEach((categoryName) => {
    const categoryData: CategoryData = {};

    for (let i = 1; i <= Number(rows); i++) {
      const pointValue = (i * 100).toString();

      categoryData[pointValue] = {
        question: `What is something in ${categoryName} worth ${pointValue}?`,
        answer: `Answer for ${categoryName} ${pointValue}`,
        category: categoryName,
      };
    }

    data[categoryName] = categoryData;
  });

  return data;
}

