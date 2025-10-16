export type JeopardyEntry = {
    question: string;
    answer: string;
    category: string
};

export type JeopardyData = Record<string, Record<string, JeopardyEntry>>;

let cache: JeopardyData | null = null;

const generateJeopardyData = (
    numCategories: number,
    numQuestions: number
): JeopardyData => {
    const data: JeopardyData = {};

    for (let categoryId = 1; categoryId <= numCategories; categoryId++) {
        const categoryName = `${categoryId} x ?`;
        data[categoryId.toString()] = {};

        for (let i = 1; i <= numQuestions; i++) {
            const pointValue = (i * 100).toString();
            data[categoryId][pointValue] = {
                question: `What is ${categoryId} × ${i}?`,
                answer: `${categoryId * i}`,
                category: categoryName,
            };
        }
    }

    cache = data;
    return data;
};

export const getJeopardyData = (numCategories : number, numQuestions : number) => {
    if (!cache) {
        return generateJeopardyData(numCategories, numQuestions);
    }
    return cache;
};

export const getCardData = (category: string, pointValue: string) => {
    if (!cache) throw Error("No data cached");
    return cache[category][pointValue];
};