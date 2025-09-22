import { createProduct } from '@api/product';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getProducts } from '@api/product';

export const useCreateProductMutation = () => {
    return useMutation({
        mutationFn: async (newProduct: any) => {
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


