
import { ITags, ITag } from "@uiTypes/dto/product.dto";
import { useState } from "react";
const Tabs = ({ tags }: ITags) => {
    const [idSelected, setIdSelected] = useState(0);
    if (!tags) {
        return (<p>Loading...</p>)
    }

    return (
        <div className="bg-white shadow-md h-80">
            <div className="bg-[#e2dddd] w-full h-fit p-2 flex gap-2 rounded-md">
                {tags.map((tag: ITag) => (<label className={` ${idSelected === tag.idx ? `bg-white text-cyan-700` : `text-cyan-950`} hover:cursor-pointer px-5 py-1 rounded-lg 
                font-medium`} key={tag.idx} onClick={() => setIdSelected(tag.idx)}> {tag.label} {tag.idx === 2 && (`(5)`)}</label>))}
            </div>
            <div className="p-4">
                {tags[idSelected].content}
            </div>
        </div>)
}

export default Tabs;