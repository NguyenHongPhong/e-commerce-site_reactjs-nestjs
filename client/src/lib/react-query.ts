import { QueryClient } from '@tanstack/react-query';

export const reactClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false, // không tự refetch khi đổi tab
            retry: 1,                    // retry 1 lần khi lỗi
        },
        mutations: {
            retry: 0, // không retry mutation khi lỗi
        },
    },
});
