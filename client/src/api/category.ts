import api from ".";
import { IFormData, toFormData } from "@uiTypes/dto/category.dto";
const API_BASE = '/categories';

export const createCategory = (data: IFormData) => {
    return api.post(API_BASE + '/create', toFormData(data), {
        headers: { "Content-Type": "multipart/form-data" }
    });
}

export const getCategories = () =>
    api.get(API_BASE + '/getAll', {
    });