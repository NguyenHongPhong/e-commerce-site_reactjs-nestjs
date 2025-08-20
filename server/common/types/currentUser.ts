import { createParamDecorator, ExecutionContext } from '@nestjs/common';


//Config cấu hình Request object để nhận dữ liệu từ phía guards xử lý
export const CurrentUser = createParamDecorator(
    (_: unknown, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        return request.user;
    },
);


