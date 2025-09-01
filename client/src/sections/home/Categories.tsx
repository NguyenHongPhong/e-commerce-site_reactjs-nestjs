import { Link } from "react-router";
import Category from "../../components/category/Category";

export default function () {
  const banners = ['/public/ui/images/shirt.png', '/public/ui/images/dress.png', '/public/ui/images/shirt.png', '/public/ui/images/dress.png',
    '/public/ui/images/shirt.png', '/public/ui/images/dress.png', '/public/ui/images/shirt.png', '/public/ui/images/dress.png', '/public/ui/images/shirt.png', '/public/ui/images/dress.png',
    '/public/ui/images/shirt.png', '/public/ui/images/dress.png', '/public/ui/images/shirt.png', '/public/ui/images/dress.png', '/public/ui/images/shirt.png', '/public/ui/images/dress.png',
    '/public/ui/images/shirt.png', '/public/ui/images/dress.png', '/public/ui/images/shirt.png', '/public/ui/images/dress.png',

  ];
  return (<div className="@container">
    <div className="w-full">
      <h2 className="text-2xl font-bold leading-8 text-(--color-primary-500)">CATEGORIES</h2>
      <div className="flex flex-wrap justify-center mt-4">
        {banners.map((category, index) => <Category key={index} id={index} name={"Shirt and dress and more"} slug={category} url={category} />)}
        <Link to={`/create-category`} className="cursor-pointer bg-blue-400 text-white">Create category</Link>
      </div>
    </div>
  </div>)
}