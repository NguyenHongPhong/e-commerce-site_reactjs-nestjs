import { useMutation, useQuery } from '@tanstack/react-query';
import { createCategory, getCategories } from '@api/category';
import { getProfile } from '@api/user';
import { logout } from '@api/auth';
//hàm này sau này mới config lại nên chưa sử dụng
export const useCreateUserMutation = () => {
    return useMutation({
        mutationFn: async (newCategory: any) => {
            const { data } = await createCategory(newCategory);
            return data;
        }
    });
};

export const useLogoutmutation = () => {
    return useMutation({
        mutationFn: async () => {
            const { data } = await logout();
            return data.message;
        }
    });
}


export const useGetProfileQuery = () => {
    return useQuery({
        queryKey: ['profile'],
        queryFn: getProfile,
    });
}


