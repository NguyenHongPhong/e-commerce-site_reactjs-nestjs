import api from ".";

const API_BASE = '/otp';

export const sendOTP = (email: string) => {
    return api.post(API_BASE + '/send', { email });
}

export const verifyOTP = (flowId: string, otp: string) => {
    return api.post(
        API_BASE + '/verify',
        { flowId, otp },
        { withCredentials: true }
    );
}

export const resendOtp = (flowId: string) => {
    return api.post(API_BASE + '/re-send', { flowId });
}


