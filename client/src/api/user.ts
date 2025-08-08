import api from ".";
import { IUserDto } from "../types/dto/user.dto";
const API_BASE = '/users';

export const getUsers = () => api.get(API_BASE);
export const getUserById = (id: string) => api.get(`${API_BASE}/${id}`);
export const createUser = (data: IUserDto) => {
    return api.post(API_BASE, data);
};
