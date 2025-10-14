import { z } from "zod";

// Schema cho product form
export const productSchema = z
    .object({
        // Category
        _categoriesExist: z.boolean(), // field ẩn để biết danh sách category có hay không
        selectCategory: z.string().optional(), // dùng khi categories có sẵn
        categoryName: z.string().optional(), // dùng khi tạo mới category
        categoryDescription: z.string().optional(),
        imgCategories: z.any().optional(),

        // Product
        title: z.string().min(1, "Title is required"),
        description: z.string().min(1, "Description is required"),
        features: z
            .array(
                z.object({
                    value: z.string().min(1, "Feature cannot be empty"),
                })
            )
            .min(1, "At least one feature is required"),
        price: z
            .string()
            .trim()
            .nonempty("Price is required")
            .refine((val) => /^[0-9]+$/.test(val), {
                message: "Price must contain only digits",
            }),
        colors: z.array(z.string().min(1)).nonempty("Please add at least one color"),
        materials: z.array(z.string().min(1)).nonempty("Please add at least one material"),
        sizes: z.array(z.string().min(1)).nonempty("Please add at least one size"),
        imgs: z
            .any()
            .refine((files) => files && files.length > 0, "At least 1 image is required"),
    })
    .superRefine((data, ctx) => {
        // Conditional validation dựa trên danh sách category
        if (data._categoriesExist) {
            // categories có sẵn → validate selectCategory
            if (!data.selectCategory || data.selectCategory.trim() === "") {
                ctx.addIssue({
                    code: "custom",
                    path: ["selectCategory"],
                    message: "Please select a category",
                });
            }
        } else {
            // categories rỗng → validate các field tạo mới category
            if (!data.categoryName || data.categoryName.trim() === "") {
                ctx.addIssue({
                    code: "custom",
                    path: ["categoryName"],
                    message: "Category name is required",
                });
            }

            if (!data.categoryDescription || data.categoryDescription.trim() === "") {
                ctx.addIssue({
                    code: "custom",
                    path: ["categoryDescription"],
                    message: "Category description is required",
                });
            }

            if (!data.imgCategories || data.imgCategories.length === 0) {
                ctx.addIssue({
                    code: "custom",
                    path: ["imgCategories"],
                    message: "At least 1 category image is required",
                });
            }
        }
    });

// TypeScript type cho RHF
export type ProductFormValues = z.infer<typeof productSchema>;
