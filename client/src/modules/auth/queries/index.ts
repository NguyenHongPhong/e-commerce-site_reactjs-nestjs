import { useMutation, useQuery } from '@tanstack/react-query';
import { createUser } from '@api/user';
import { getProfile } from '@api/user';
import { logout } from '@api/auth';
import { IUserDto } from '@uiTypes/dto/user.dto';
//hàm này sau này mới config lại nên chưa sử dụng
export const useCreateUserMutation = () => {
    return useMutation({
        mutationFn: async (newUser: IUserDto) => {
            const { data } = await createUser(newUser);
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


