import api from ".";
const API_BASE = '/products';

export const createProduct = (data: FormData) => {
    return api.post(API_BASE + '/create', data, {
        headers: { "Content-Type": "multipart/form-data" }
    });
}

export const getProducts = async () => {
    const res = await api.get(API_BASE + '/getAll');
    return res.data;
}

export const getCategories = async () => {
    const res = await api.get(API_BASE + '/getListCategory');
    return res.data;
}

export const getProductById = async (id: string) => {
    const res = await api.get(API_BASE + `/getProductById/${id}`);
    return res.data;
}
