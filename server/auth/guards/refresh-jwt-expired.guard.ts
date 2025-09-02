import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { clearAuthCookies } from '../cookies/clear-auth-cookies';

@Injectable()
export class RefreshJwtExpiredGuard extends AuthGuard('jwt-refresh') {
    //Class này chỉ chạy sau khi passport verify token
    handleRequest(err: any, user: any, info: any, context: ExecutionContext, status?: any) {
        if (err || !user) {

            // Phát hiện những vấn đề của token từ `info` (TokenExpiredError / JsonWebTokenError)
            const res: Response = context.switchToHttp().getResponse();

            // Xóa cookie -> log out
            try { clearAuthCookies(res); } catch { }
            const message =
                info?.name === 'TokenExpiredError' ? 'REFRESH_TOKEN_EXPIRED' : 'REFRESH_TOKEN_INVALID';
            throw new UnauthorizedException({ code: message });
        }
        return user;
    }
}
