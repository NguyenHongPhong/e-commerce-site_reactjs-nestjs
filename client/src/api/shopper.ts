import api from ".";
const API_BASE = '/shoppers';

export const registerShopper = async (data: FormData) => {
    return await api.post(API_BASE + '/register', data);
};

export const getCategoriesByShop = async (shopId: string) => {
    const res = await api.get(API_BASE + `${shopId}/categories`);
    return res.data;
};
