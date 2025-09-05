import { Link } from "react-router";
import Category from "../../components/category/Category";
import { useEffect, useState } from "react";
import { getCategories } from "@api/category";
import { typeCategories, typeCategoryImgs, CategoryDto } from "@uiTypes/dto/category.dto";
const server = import.meta.env.VITE_API_URL;
export default function () {
  const [categories, setCategories] = useState<CategoryDto[]>(Array(20).fill(null));



  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res = await getCategories();

      } catch (error) {
        console.log(error);
      }

    }
    fetchCategory();
  }, []);

  return (<div className="@container">
    <div className="w-full">
      <h2 className="text-2xl font-bold leading-8 text-(--color-primary-500)">CATEGORIES</h2>
      <div className="flex flex-wrap justify-center mt-4">
        {categories && categories.map((category, index) => <Category key={index} id={index} name={"Men & women clothes"} slug={"test"} url={`/public/ui/images/shirt.png`} />)}
        <Link to={`/create-category`} className="cursor-pointer bg-blue-400 text-white">Create category</Link>
        <Link to="/products/create" className="cursor-pointer bg-emerald-400 text-white">create Product</Link>
      </div>
    </div>
  </div>)
}