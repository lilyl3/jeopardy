import { BoardProps, RequestProps, CategoryData } from "../api/data/route";
import { baseUrl } from "./dataTypes";

export async function generateData(rows: string, columns: string, categories: string[]) {
    const props: RequestProps = {
        action: "generate",
        rows: rows,
        columns: columns,
        categories: categories,
    };

    const res = await fetch(`${baseUrl}/api/data`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(props),
    });
    return res;
}

export async function fetchBoardProps() {
    const requestProps : RequestProps = {
        action: "board",
    };  

    const res = await fetch(`${baseUrl}/api/data`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestProps),
        cache: "no-store",
    }); 
    const boardProps : BoardProps = await res.json();
    return boardProps;
}

export async function fetchCategory(category : string) {
    const requestProps : RequestProps = {
        action: "category",
        category: category
    };  

    const res = await fetch(`${baseUrl}/api/data`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestProps),
    }); 
    const categoryQA : CategoryData = await res.json();
    return categoryQA;
}

export async function updateCard(category : string, pointValue: string, question: string, answer: string) {
    const requestProps : RequestProps = {
        action: "update",
        category: category,
        pointValue: pointValue,
        question: question, 
        answer: answer
    };  

    const res = await fetch(`${baseUrl}/api/data`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestProps),
    }); 

    const msg = await res.json();
    return msg.message;
}
