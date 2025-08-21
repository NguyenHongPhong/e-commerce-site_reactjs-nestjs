export const ACCESS_TOKEN_COOKIE = 'accessToken';
export const REFRESH_TOKEN_COOKIE = 'refreshToken';

export const accessTokenCookieOptions = {
    httpOnly: true,          // JS không đọc được -> chống XSS
    secure: true,            // chỉ gửi qua HTTPS (bật true ở production)
    sameSite: 'lax' as const,// giảm CSRF (strict nếu SPA thuần)
    path: '/',               // phạm vi cookie
    maxAge: 15 * 60 * 1000,  // 15 phút
};

export const refreshTokenCookieOptions = {
    httpOnly: true,
    secure: true,
    sameSite: 'lax' as const,
    path: '/auth',           // chỉ gửi khi gọi /auth/*
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 ngày
};
