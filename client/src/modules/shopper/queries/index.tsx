import { registerShopper } from '@api/shopper';
import { useMutation, useQuery } from '@tanstack/react-query';


export const useRegisterShopperMutation = () => {
    return useMutation({
        mutationFn: async (newShopper: FormData) => {
            const { data } = await registerShopper(newShopper);
            return data;
        }
    });
};


