import api from ".";
const API_BASE = '/shoppers';

export const registerShopper = async (data: FormData) => {
    return await api.post(API_BASE + '/register', data);
};

