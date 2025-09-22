import { useMutation, useQuery } from '@tanstack/react-query';
import { createCategory, getCategories } from '@api/category';

//Update this before using, not update yet
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


