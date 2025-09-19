import api from ".";
const API_BASE = '/products';

export const createProduct = (data: any) => {
    console.log(data);

    return api.post(API_BASE + '/create', data, {
        headers: { "Content-Type": "multipart/form-data" }
    });
}
