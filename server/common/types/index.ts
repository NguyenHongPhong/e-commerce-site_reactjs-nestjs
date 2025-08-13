export interface RequestWithCookies extends Request {
    cookies: Record<string, string>;
}

export interface IJwtPayload {
    sub: string;
    iat?: number;
    exp?: number;
}