import { Response } from 'express';
import {
    ACCESS_TOKEN_COOKIE, REFRESH_TOKEN_COOKIE,
    accessTokenCookieOptions, refreshTokenCookieOptions
} from '../constants/cookie.constants';

export function clearAuthCookies(res: Response) {
    res.cookie(ACCESS_TOKEN_COOKIE, '', { ...accessTokenCookieOptions, maxAge: 0 });
    res.cookie(REFRESH_TOKEN_COOKIE, '', { ...refreshTokenCookieOptions, maxAge: 0 });
}
