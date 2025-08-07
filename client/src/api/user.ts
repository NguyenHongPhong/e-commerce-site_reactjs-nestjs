import api from ".";
import { UserDto } from "../types/dto/user.dto";
const API_BASE = '/users';

export const getUsers = () => api.get(API_BASE);
export const getUserById = (id: string) => api.get(`${API_BASE}/${id}`);
export const createUser = (data: UserDto) => {

    const defaultData: UserDto = {
        ...data,
        status_id: data.status_id ?? "1"
    };
    return api.post(API_BASE, defaultData)
};
