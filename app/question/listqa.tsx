import { JeopardyEntry } from "../api/data/route";

export default function ListQA(props : JeopardyEntry) {
    return (<div>
        <label> Question:
            <input name="question" type="string" defaultValue={2} required className="border p-2 rounded w-full"/>
        </label>

        <label> Answer:
            <input name="answer" type="string" defaultValue={3} required className="border p-2 rounded w-full"/>
        </label>

        <button type="submit" className="bg-blue-200 text-black py-2 rounded hover:bg-blue-300">
            Update
        </button>
    </div>);
}