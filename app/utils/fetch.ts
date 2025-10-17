import { BoardProps, RequestProps, CategoryData } from "../api/data/route";
import { baseUrl } from "./dataTypes";

export async function fetchBoardProps() {
    const requestProps : RequestProps = {
        action: "board",
    };  

    const res = await fetch(`${baseUrl}/api/data`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestProps),
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
