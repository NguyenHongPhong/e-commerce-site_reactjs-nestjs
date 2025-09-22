import api from ".";
import { ILoginUserDto } from "../types/dto/login-user.dto";
const API_BASE = '/auth';

export const login = (data: ILoginUserDto) => {
    return api.post(API_BASE + '/login', data);
}

export const refreshToken = () => {
    return api.post(API_BASE + "/refresh", {});
}

export const logout = () => {
    return api.post(API_BASE + "/logout", {});
}
