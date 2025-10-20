import { promises as fs } from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

const boardPath = path.resolve(process.cwd(), 'board.json');
const dataPath = path.resolve(process.cwd(), 'storedData.json');

export type JeopardyEntry = {
    question: string;
    answer: string;
    category: string;
};

export type CategoryData = Record<string, JeopardyEntry>;
export type JeopardyData = Record<string, CategoryData>;
export type BoardProps = {
    rows: string;
    columns: string;
    categories: string[];
};

export type RequestProps = {
    action: string;
    category?: string;
    pointValue?: string;
    rows?: string;
    columns?: string;
    categories?: string[];
    question?: string;
    answer?: string;
};

export async function POST(request: Request) {
    const props: RequestProps = await request.json();

    if (props.action === 'generate') {
        if (!props.rows || !props.columns || !props.categories) {
            return NextResponse.json({ error: 'Missing rows, columns, and/or categories' }, { status: 404 });
        }

        const boardProps: BoardProps = {
            rows: props.rows,
            columns: props.columns,
            categories: props.categories
        };

        const storedData = generatePlaceholderData(boardProps);

        await fs.writeFile(boardPath, JSON.stringify(boardProps), 'utf-8');
        await fs.writeFile(dataPath, JSON.stringify(storedData), 'utf-8');

        await new Promise(resolve => setTimeout(resolve, 3000));

        return NextResponse.json({ message: 'Data saved' });
    }

    if (props.action === 'board') {
        try {
            const boardFile = await fs.readFile(boardPath, 'utf-8');
            const boardProps: BoardProps = JSON.parse(boardFile);
            return NextResponse.json(boardProps);
        } catch (e) {
            return NextResponse.json({ error: 'Board props not found' }, { status: 404 });
        }
    }

    if (props.action === 'category') {
        try {
            const storedFile = await fs.readFile(dataPath, 'utf-8');
            const storedData: JeopardyData = JSON.parse(storedFile);
            return NextResponse.json(storedData[props.category!]);
        } catch (e) {
            return NextResponse.json({ error: 'Category not found' }, { status: 404 });
        }
    }

    if (props.action === 'card') {
        try {
            const storedFile = await fs.readFile(dataPath, 'utf-8');
            const storedData: JeopardyData = JSON.parse(storedFile);
            return NextResponse.json(storedData[props.category!]?.[props.pointValue!] ?? null);
        } catch (e) {
            return NextResponse.json({ error: 'Card not found' }, { status: 404 });
        }
    }

    if (props.action === 'update') {
        try {
            const storedFile = await fs.readFile(dataPath, 'utf-8');
            const storedData: JeopardyData = JSON.parse(storedFile);

            if (!props.category || !props.pointValue || !props.question || !props.answer) {
                return NextResponse.json({ error: 'Missing update params' }, { status: 400 });
            }

            storedData[props.category][props.pointValue] = {
                ...storedData[props.category][props.pointValue],
                question: props.question,
                answer: props.answer
            };

            await fs.writeFile(dataPath, JSON.stringify(storedData), 'utf-8');

            return NextResponse.json({ message: 'Updated' });
        } catch (e) {
            return NextResponse.json({ error: 'Update failed' }, { status: 500 });
        }
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