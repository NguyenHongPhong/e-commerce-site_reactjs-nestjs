// import React, { useState, useEffect } from "react";
// import { useForm, Controller } from "react-hook-form";
// import Tags from "@components/tag/Tag";
// import { useCreateProductMutation, } from "../queries";
// import { useAppDispatch } from "hooks";
// import { disableLoading, enableLoading } from "@reducers/loading";
// import { notify } from "@utils/toast";
// import { useQueryClient } from "@tanstack/react-query";
// import { useNavigate } from "react-router-dom";
// import { queryProductsByShop } from "@modules/shopper/queries";
// import { useAppSelector } from "hooks";
// import { productSchema } from "schema/createProductByShopper";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";
// export default function ProductForm() {
//     const idShop = useAppSelector(state => state.auth.user?.id);
//     const { data: categories } = queryProductsByShop(idShop || "");
//     const hasCategories = categories && categories.length > 0;
//     const schema = productSchema(hasCategories);
//     type CreateProductForm = Omit<z.infer<typeof schema>, "price"> & { price: number };

//     const {
//         register,
//         control,
//         handleSubmit,
//         formState: { errors },
//         setValue,
//         watch,
//     } = useForm<CreateProductForm>({
//         resolver: zodResolver(schema),
//         defaultValues: {
//             categoriesExisted: "", // nếu category đã có
//             categoryNew: "",       // nếu tạo category mới
//             title: "",
//             descriptionProduct: "",
//             price: 0,
//             colors: [],
//             materials: [],
//             sizes: [],
//             imgs: [],
//         },
//     });
//     const navigate = useNavigate();
//     const queryClient = useQueryClient();

//     const dispatch = useAppDispatch();
//     const createProductMutation = useCreateProductMutation();
//     const [previews, setPreviews] = useState<string[]>([]);
//     const [preview, setPreview] = useState<string[]>([]);
//     const [files, setFiles] = useState<File[]>([]);

//     const imgs = watch("imgs");

//     const handleImagesChange = (files: FileList | null) => {
//         if (!files) return;
//         const arr = Array.from(files);
//         setValue("imgs", arr, { shouldValidate: true });

//         const urls = arr.map((f) => URL.createObjectURL(f));
//         setPreviews(urls);
//     };

//     const submit = (data: CreateProductForm) => {
//         const formData = new FormData();
//         formData.append("title", data.title);
//         formData.append("description", data.description);
//         formData.append("price", String(data.price));
//         formData.append("category", String(data.category));
//         data.imgs.forEach((file) => formData.append("imgs", file));
//         data.colors.forEach((color) => formData.append("colors", color));
//         data.materials.forEach((material) => formData.append("materials", material));
//         data.sizes.forEach((size) => formData.append("sizes", size));
//         formData.append("folder", "products");

//         dispatch(enableLoading());

//         createProductMutation.mutate(formData, {
//             onSuccess: (data: any) => {
//                 dispatch(disableLoading());
//                 notify(data.message, "success");
//                 queryClient.invalidateQueries({ queryKey: ["products"] });
//                 navigate("/");
//             },
//             onError: (error: any) => {
//                 dispatch(disableLoading());
//                 console.error("❌ Error:", error);
//             },
//         });
//     };


//     const handlePreview = (e: React.ChangeEvent<HTMLInputElement>) => {
//         if (e.target.files) {

//             const urls = Array.from(e.target.files).map((file) => URL.createObjectURL(file));
//             const selectedFiles = Array.from(e.target.files);
//             setFiles(selectedFiles);
//             setPreview(urls);
//         }
//     };

//     return (
//         <form
//             onSubmit={handleSubmit(submit)}
//             className="max-w-3xl mx-auto bg-white p-6 rounded-2xl shadow-md"
//         >

//             {/* Categories*/}
//             <label className="flex-col flex mb-3">
//                 <span className="text-sm font-medium mb-3">Category</span>
//                 {categories && categories.length > 0 ? (
//                     <select
//                         {...register("categoriesExisted")}
//                         className="mt-2 block w-full rounded-lg border p-2 h-11"
//                     >
//                         <option value="">Select Category</option>
//                         {categories.map((cat: any) => (
//                             <option key={cat.id} value={cat.id}>
//                                 {cat.name}
//                             </option>
//                         ))}
//                     </select>
//                 ) : (<div className="flex flex-col gap-3 p-4 w-full border rounded-lg">
//                     {/* Name required */}
//                     <input
//                         type="text"
//                         placeholder="Category name"
//                         {...register("categoryNew", { required: "Category name is required" })}
//                         className="border p-2 rounded"
//                     />
//                     {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}

//                     {/* Description required */}
//                     <input
//                         type="text"
//                         placeholder="Description"
//                         {...register("description", { required: "Description is required" })}
//                         className="border p-2 rounded"
//                     />
//                     {errors.description && (
//                         <p className="text-red-500 text-sm">{errors.description.message}</p>
//                     )}

//                     {/* Parent category optional */}
//                     {categories && categories.length > 0 && (
//                         <select {...register("parent_id")} className="border p-2 rounded">
//                             <option value="">Select Parent Category</option>
//                             {categories.map((cat: any) => (
//                                 <option key={cat.id} value={cat.id}>
//                                     {cat.name}
//                                 </option>
//                             ))}
//                         </select>
//                     )}

//                     {/* Multiple images required */}
//                     <input
//                         type="file"
//                         multiple
//                         accept="image/*"
//                         {...register("images")}
//                         onChange={handlePreview}
//                         className="border p-2 rounded"
//                     />
//                     {errors.images && (
//                         <p className="text-red-500 text-sm">{errors.images.message}</p>
//                     )}

//                     {/* Preview images */}
//                     <div className="flex gap-2 flex-wrap">
//                         {preview.map((src, i) => (
//                             <img
//                                 key={i}
//                                 src={src}
//                                 alt="preview"
//                                 className="w-16 h-16 object-cover rounded"
//                             />
//                         ))}
//                     </div>
//                 </div>)}
//                 {errors.category && (
//                     <p className="text-red-500 text-sm mt-1">
//                         {String(errors.category.message)}
//                     </p>
//                 )}
//             </label>

//             {/* Title */}
//             <label className="block mb-3">
//                 <span className="text-sm font-medium">Title</span>
//                 <input
//                     {...register("title", { required: "Title is required" })}
//                     className="mt-1 block w-full rounded-lg border p-2"
//                 />
//                 {errors.title && (
//                     <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
//                 )}
//             </label>

//             {/* Description */}
//             <label className="block mb-3">
//                 <span className="text-sm font-medium">Description</span>
//                 <textarea
//                     {...register("description")}
//                     className="mt-1 block w-full rounded-lg border p-2"
//                     rows={4}
//                 />
//                 {errors.description && (
//                     <p className="text-red-500 text-sm mt-1">
//                         {String(errors.description.message)}
//                     </p>
//                 )}
//             </label>

//             {/* Price */}
//             <label className="block mb-3">
//                 <span className="text-sm font-medium">Price</span>
//                 <input
//                     type="number"
//                     step="0.01"
//                     inputMode="numeric"
//                     pattern="[0-9]*"
//                     {...register("price")}
//                     className="mt-1 block w-full rounded-lg border p-2"
//                 />
//                 {errors.price && (
//                     <p className="text-red-500 text-sm mt-1">
//                         {String(errors.price.message)}
//                     </p>
//                 )}
//             </label>

//             <div className="flex">
//                 <span className="italic font-semibold underline mr-3">Note:</span>
//                 <p className="">In below section, after you've wrote one value, click "Enter" to save it</p>
//             </div>

//             <div className="border-2 border-cyan-700 rounded-2xl p-3 mt-3">
//                 {/* Colors */}
//                 <div className="mb-6">
//                     <label className="block mb-2">
//                         <span className="text-sm font-medium">Colors</span>

//                         <Controller
//                             name="colors"
//                             control={control}
//                             rules={{
//                                 required: "Please add at least one color",
//                                 validate: (v) =>
//                                     (v && v.length > 0) || "This field cannot be empty",
//                             }}
//                             render={({ field }) => (
//                                 <Tags
//                                     values={field.value}
//                                     onChange={field.onChange}
//                                     field="colors"
//                                 />
//                             )}
//                         />

//                         {errors.colors && (
//                             <p className="text-red-500 text-sm mt-1">
//                                 {errors.colors.message}
//                             </p>
//                         )}
//                     </label>
//                 </div>

//                 {/* Materials */}
//                 <div className="mb-6">
//                     <label className="block mb-2">
//                         <span className="text-sm font-medium">Materials</span>

//                         <Controller
//                             name="materials"
//                             control={control}
//                             rules={{
//                                 required: "Please add at least one material",
//                                 validate: (v) => (v && v.length > 0) || "This field cannot be empty",
//                             }}
//                             render={({ field }) => (
//                                 <Tags
//                                     values={field.value}
//                                     onChange={field.onChange}
//                                     field="materials"
//                                 />
//                             )}
//                         />

//                         {errors.materials && (
//                             <p className="text-red-500 text-sm mt-1">
//                                 {errors.materials.message as string}
//                             </p>
//                         )}
//                     </label>
//                 </div>

//                 {/* Sizes */}
//                 <div className="mb-6">
//                     <label className="block mb-2">
//                         <span className="text-sm font-medium">Sizes</span>

//                         <Controller
//                             name="sizes"
//                             control={control}
//                             rules={{
//                                 required: "Please add at least one size",
//                                 validate: (v) => (v && v.length > 0) || "This field cannot be empty",
//                             }}
//                             render={({ field }) => (
//                                 <Tags values={field.value} onChange={field.onChange} field="sizes" />
//                             )}
//                         />

//                         {errors.sizes && (
//                             <p className="text-red-500 text-sm mt-1">
//                                 {errors.sizes.message as string}
//                             </p>
//                         )}
//                     </label>
//                 </div>

//             </div>

//             {/* Images */}
//             <div className="mb-6">
//                 <label className="block mb-2">
//                     <span className="text-sm font-medium">Images</span>
//                     <input
//                         type="file"
//                         multiple
//                         accept="image/*"
//                         onChange={(e) => handleImagesChange(e.target.files)}
//                         className="mt-1 block w-full"
//                     />
//                     {/* hidden input to validate imgs */}
//                     <input
//                         type="hidden"
//                         {...register("imgs")}
//                     />
//                     {errors.imgs && (
//                         <p className="text-red-500 text-sm mt-1">
//                             {errors.imgs.message as string}
//                         </p>
//                     )}
//                 </label>

//                 <div className="flex gap-3 flex-wrap">
//                     {previews.map((src, i) => (
//                         <div
//                             key={i}
//                             className="w-24 h-24 rounded overflow-hidden border"
//                         >
//                             <img
//                                 src={src}
//                                 alt={`preview-${i}`}
//                                 className="w-full h-full object-cover"
//                             />
//                         </div>
//                     ))}
//                 </div>
//             </div>

//             {/* Buttons */}
//             <div className="flex gap-3">
//                 <button
//                     type="submit"
//                     className="px-4 py-2 rounded-lg bg-blue-600 text-white"
//                 >
//                     Save
//                 </button>
//             </div>
//         </form>
//     );
// }
