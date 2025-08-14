import api from ".";

const API_BASE = '/otp';

export const sendOTP = (email: string) => {
    return api.post(API_BASE + '/send', { email });
}

export const verifyOTP = (otp: string) => {
    return api.post(
        API_BASE + '/verify',
        { otp },
        { withCredentials: true }
    );
}

export const deleteOtpHasExpired = () => {
    return api.post(API_BASE + "/delete-otp-has-expired", {}, { withCredentials: true }
    );
}


