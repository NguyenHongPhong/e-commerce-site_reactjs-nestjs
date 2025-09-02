import { Link } from "react-router";
import Category from "../../components/category/Category";
import { useEffect, useState } from "react";
import { getCategories } from "@api/category";
import { typeCategories, typeCategoryImgs, CategoryDto } from "@uiTypes/dto/category.dto";
export default function () {
  const [categories, setCategories] = useState<CategoryDto[]>();
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res = await getCategories();
        const categories: typeCategories[] = res.data.data.category;
        const imgsCategory: typeCategoryImgs[] = res.data.data.imgs;
        const rs = categories.map((category) => {
          const imgs = imgsCategory.filter(img => img.categoryId === category.id)
            .filter(img => img.imgs.main === true)
            .map(img => img.imgs);
          return {
            ...category,
            imgs
          }
        });

        if (rs) {
          setCategories(rs);
        }


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
        {categories && categories.map((category, index) => <Category key={index} id={index} name={category.name} slug={category.slug} url={category.imgs[0].url} />)}
        <Link to={`/create-category`} className="cursor-pointer bg-blue-400 text-white">Create category</Link>
      </div>
    </div>
  </div>)
}