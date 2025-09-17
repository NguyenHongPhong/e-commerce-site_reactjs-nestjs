import { createProduct } from '@api/product';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { data } from 'react-router';

export const useCreateProductMutation = () => {
    return useMutation({
        mutationFn: async (newProduct: any) => {
            const { data } = await createProduct(newProduct);
            return data;
        },
        onSuccess: () => {
            console.log(data);
        },
    });
};
