import { ICategoryItem } from "../../types/ui";
import { Link } from "react-router";

export default (props: ICategoryItem) => {
    const { slug, url, name, id } = props;
    return (
        <Link to={`/categories/${slug}/${id}`} className="border-1 border-gray-500 h-40 w-32 flex flex-col items-center justify-center 
        px-2.5 hover:shadow-2xl">
            <img className="w-20 h-20" src={url} />
            <span className="mt-2.5 line-clamp-2 break-words text-[12px] text-center w-24">
                {name}
            </span>
        </Link>
    )
}