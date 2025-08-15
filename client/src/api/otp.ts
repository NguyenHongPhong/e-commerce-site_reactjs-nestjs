import api from ".";

const API_BASE = '/otp';

export const sendOTP = (email: string) => {
    return api.post(API_BASE + '/send', { email });
}

export const verifyOTP = (flowId: string, otp: string, numberVerifyOtp: number) => {
    return api.post(
        API_BASE + '/verify',
        { flowId, otp, numberVerifyOtp },
        { withCredentials: true }
    );
}

export const deleteOtpHasExpired = (id: string) => {
    return api.post(API_BASE + "/delete-otp-has-expired", { id }, { withCredentials: true }
    );
}

export const reSendOtp = () => {

}


