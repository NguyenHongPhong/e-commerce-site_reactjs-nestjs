// src/middleware/auth.middleware.ts
import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';

interface RequestWithUser extends Request {
    user?: any;
}

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    private jwtSecret: string
    constructor(private configService: ConfigService) {
        this.jwtSecret = this.configService.get<string>('JWT_SECRET')!;
    }
    use(req: RequestWithUser, res: Response, next: NextFunction) {
        const token = req.cookies?.accessToken;
        if (!token) {
            throw new UnauthorizedException('No access token provided');
        }

        try {
            const payload = jwt.verify(token, this.jwtSecret);
            req.user = payload;
            next();
        } catch (err) {
            throw new UnauthorizedException('Invalid or expired token');
        }
    }
}
