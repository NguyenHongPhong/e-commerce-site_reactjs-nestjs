import api from ".";

const API_BASE = '/otp';

export const sendOTP = (email: string) => {
    return api.post(API_BASE + '/send', { email });
}


