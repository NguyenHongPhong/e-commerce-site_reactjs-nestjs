import { toast, ToastOptions } from 'react-toastify';

export const notify = (
    message: string,
    type: 'success' | 'error' | 'info' | 'warn' = 'info',
    options?: ToastOptions
) => {
    toast[type](message, options);
};