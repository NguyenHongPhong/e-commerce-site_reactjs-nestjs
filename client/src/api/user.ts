import { data } from 'react-router';
import api from ".";
import { IUserDto, IUserResetPassword } from "../types/dto/user.dto";
const API_BASE = '/users';

export const getUsers = () => api.get(API_BASE);
export const getUserById = (id: string) => api.get(`${API_BASE}/${id}`);
export const createUser = (data: IUserDto) => {
    return api.post(API_BASE, data);
};

export const getProfile = async () => {
    const res = await api.get(API_BASE + '/profile', {
    });
    return res.data
}

export const resetPassword = (data: IUserResetPassword) => {
    return api.post(API_BASE + '/reset-password', data);
}