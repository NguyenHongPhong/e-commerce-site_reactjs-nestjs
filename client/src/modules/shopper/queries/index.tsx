import { registerShopper } from '@api/shopper';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getCategoriesByShop } from '@api/shopper';

export const useRegisterShopperMutation = () => {
    return useMutation({
        mutationFn: async (newShopper: FormData) => {
            const { data } = await registerShopper(newShopper);
            return data;
        }
    });
};

export const queryProductsByShop = (idShop: string) => {
    return useQuery({
        queryKey: ['productsByShop', idShop],
        queryFn: () => getCategoriesByShop(idShop),
    });
}


