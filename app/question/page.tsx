import { RequestProps } from "../api/data/route";
import { baseUrl } from "../utils/dataTypes";

export default async function ViewQA() {
    const props : RequestProps = {
        action: "all",
    };
    const res = await fetch(`${baseUrl}/api/data`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(props),
    });
    const data = await res.json();

    // return (<>
    //     <select id="category-select" value={selectedCategory} onChange={handleChange}>
    //         {categories.map((category) => (
    //         <option key={category} value={category}>{category}</option>
    //         ))}
    //     </select>
    // </>);
}