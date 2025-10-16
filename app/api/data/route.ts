import { NextResponse } from 'next/server';

type category = string;
type pointValue = string;

export type JeopardyEntry = {
    question: string;
    answer: string;
    category: string
};
export type JeopardyData = Record<category, Record<pointValue, JeopardyEntry>>;
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

  if (props.action === 'board') {
    if (!boardProps) {
      return NextResponse.json({ error: 'Board props not found' }, { status: 404 });
    }
    return NextResponse.json(boardProps);
  }

  return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
}

function generatePlaceholderData(props: BoardProps): JeopardyData {
  const { rows, columns } = props;
  const data: JeopardyData = {};

  for (let categoryId = 1; categoryId <= Number(columns); categoryId++) {
    const categoryName = `${categoryId} x ?`;
    data[categoryId.toString()] = {};

    for (let i = 1; i <= Number(rows); i++) {
      const pointValue = (i * 100).toString();
      data[categoryId][pointValue] = {
        question: `What is ${categoryId} × ${i}?`,
        answer: `${categoryId * i}`,
        category: categoryName,
      };
    }
  }

  return data;
}
