import api from ".";
import { IFormData } from "@uiTypes/dto/category.dto";
const API_BASE = '/category';

export const createCategory = (data: IFormData) => api.post(API_BASE + '/create', data);
