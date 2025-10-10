import api from ".";
const API_BASE = '/products';

export const createProduct = (data: any) => {
    return api.post(API_BASE + '/create', data, {
        headers: { "Content-Type": "multipart/form-data" }
    });
}

export const getProducts = async () => {
    const res = await api.get(API_BASE + '/getAll');
    return res.data;
}

