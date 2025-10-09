import { createProduct } from '@api/product';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getProducts } from '@api/product';
import { createCategory, getCategories } from '@api/category';


export const useCreateCategoryMutation = () => {
    return useMutation({
        mutationFn: async (newCategory: any) => {
            const { data } = await createCategory(newCategory);
            return data;
        }
    });
};

export const useQueryAllCategory = () => {
    return useQuery({
        queryKey: ['categories'],
        queryFn: getCategories,
    });
}

export const useCreateProductMutation = () => {
    return useMutation({
        mutationFn: async (newProduct: FormData) => {
            const { data } = await createProduct(newProduct);
            return data;
        }
    });
};

export const useGetAllProductMutation = () => {
    return useQuery({
        queryKey: ['products'],
        queryFn: getProducts,
    });
}



