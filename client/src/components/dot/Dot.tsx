import { IDot } from "../../types/ui";

function Dot(props: IDot) {
    const { quantity, index } = props;
    return (<div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 flex justify-evenly w-40">
        {Array.apply(null, Array(quantity)).map((_, index) => <div className="flex h-4 w-4 bg-[rgba(0,0,0,0.4)] rounded-full"></div>)}
    </div>)
}

export default Dot;