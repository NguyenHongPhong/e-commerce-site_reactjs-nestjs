import api from ".";
import { ILoginUserDto } from "../types/dto/login-user.dto";
const API_BASE = '/auth';

export const login = (data: ILoginUserDto) => {
    return api.post(API_BASE + '/login', data);
}


