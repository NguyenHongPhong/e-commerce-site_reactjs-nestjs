import { createProduct } from '@api/product';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getProducts, getCategories, getProductById } from '@api/product';


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

export const useGetProductByIdQuery = (id: string) => {
    return useQuery({
        queryKey: ['productById', id],
        queryFn: () => getProductById(id),
        enabled: !!id,
    });
}

export const useGetAllCategoryMutation = () => {
    return useQuery({
        queryKey: ['categories'],
        queryFn: getCategories,
    });
}



