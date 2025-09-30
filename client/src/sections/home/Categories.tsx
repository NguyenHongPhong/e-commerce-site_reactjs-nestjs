import { Link } from "react-router-dom";
import Category from "../../components/category/Category";
import { useQueryAllCategory } from "@modules/category/queries";
export default function () {

  return (<div className="@container">
    <div className="w-full">
      <h2 className="text-2xl font-bold leading-8 text-(--color-primary-500)">CATEGORIES</h2>
      <div className="flex flex-wrap justify-center mt-4">
        {/* {categories && categories?.map((category: any, index: number) => <Category key={index} id={index} name={category.name} slug={category.slug} url={category.images[0].url} />)} */}
        <Link to={`/category/create`} className="cursor-pointer bg-blue-400 text-white">Create category</Link>
        <Link to="/products/create" className="cursor-pointer bg-emerald-400 text-white">create Product</Link>
      </div>
    </div>
  </div>)
}