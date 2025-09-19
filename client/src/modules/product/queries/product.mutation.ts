import { createProduct } from '@api/product';
import { useMutation, useQueryClient } from '@tanstack/react-query';


export const useCreateProductMutation = () => {
    return useMutation({
        mutationFn: async (newProduct: any) => {
            const { data } = await createProduct(newProduct);
            return data;
        }
    });
};
