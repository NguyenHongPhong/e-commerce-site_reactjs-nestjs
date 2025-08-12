import api from ".";
const API_BASE = '/auth/callback';

export const loginByEmail = (code: string) => {
    console.log(code);

    return api.post(API_BASE, { code });
}


