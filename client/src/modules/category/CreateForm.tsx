import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { CategoryFormData, CategoryOption } from "@uiTypes/dto/category.dto";
import { IFormData } from "@uiTypes/dto/category.dto";
import { createCategory } from "@api/category";
export default function CategoryForm() {
    const { register, handleSubmit, reset, formState: { errors }, } = useForm<CategoryFormData>();
    const [preview, setPreview] = useState<string[]>([]);
    const [categories, setCategories] = useState<CategoryOption[]>([]);
    const [files, setFiles] = useState<File[]>([]);





    // Fake fetch categories (replace with API call)
    // useEffect(() => {
    //     async function fetchCategories() {
    //         const res = await fetch("http://localhost:3000/api/categories");
    //         if (res.ok) {
    //             const data = await res.json();
    //             setCategories(data);
    //         }
    //     }
    //     fetchCategories();
    // }, []);

    const onSubmit = (data: CategoryFormData) => {

        if (!data) {
            return;
        }

        const formData = new FormData();

        formData.append("name", data.name);
        formData.append("description", data.description);
        if (data.parent_id) {
            formData.append("parent_id", data.parent_id.toString());
        }

        Array.from(files).forEach((file) => {
            formData.append("images", file);
        });

        try {
            const createNewCategory = async () => {
                const formDto: IFormData = {
                    name: data.name,
                    description: data.description,
                    parentId: data.parent_id,
                    images: files
                };

                const res = await createCategory(formDto);
                console.log(res);

            }

            createNewCategory();
        } catch (error) {

        }



        // you can send `files` to backend here with FormData
        reset();
        setPreview([]);
    };

    const handlePreview = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {

            const urls = Array.from(e.target.files).map((file) => URL.createObjectURL(file));
            const selectedFiles = Array.from(e.target.files);
            setFiles(selectedFiles);
            setPreview(urls);

        }
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-3 p-4 w-80 border rounded-lg"
        >
            {/* Name required */}
            <input
                type="text"
                placeholder="Category name"
                {...register("name", { required: "Category name is required" })}
                className="border p-2 rounded"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}

            {/* Description required */}
            <input
                type="text"
                placeholder="Description"
                {...register("description", { required: "Description is required" })}
                className="border p-2 rounded"
            />
            {errors.description && (
                <p className="text-red-500 text-sm">{errors.description.message}</p>
            )}

            {/* Parent category optional */}
            {categories.length > 0 && (
                <select {...register("parent_id")} className="border p-2 rounded">
                    <option value="">Select Parent Category</option>
                    {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                            {cat.name}
                        </option>
                    ))}
                </select>
            )}

            {/* Multiple images required */}
            <input
                type="file"
                multiple
                accept="image/*"
                {...register("images", {
                    required: "Please upload at least one image",
                    validate: (files) =>
                        files && files.length > 0 ? true : "Please upload at least one image",
                })}
                onChange={handlePreview}
                className="border p-2 rounded"
            />
            {errors.images && (
                <p className="text-red-500 text-sm">{errors.images.message}</p>
            )}

            {/* Preview images */}
            <div className="flex gap-2 flex-wrap">
                {preview.map((src, i) => (
                    <img
                        key={i}
                        src={src}
                        alt="preview"
                        className="w-16 h-16 object-cover rounded"
                    />
                ))}
            </div>

            <button
                type="submit"
                className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                Create Category
            </button>
        </form>

    );
}
