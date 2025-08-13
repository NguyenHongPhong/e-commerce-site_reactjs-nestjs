import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    ConflictException,
    NotFoundException,
    BadRequestException,
    InternalServerErrorException,
    HttpException,
} from '@nestjs/common';
import { Prisma } from '../../generated/prisma';
import { Request, Response } from 'express';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {
    catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        let error: HttpException;

        switch (exception.code) {
            case 'P2002':
                error = new ConflictException(`${exception.meta?.target} already exists`);
                break;

            case 'P2003':
                error = new BadRequestException(`Invalid foreign key: ${JSON.stringify(exception.meta)}`);
                break;

            case 'P2001':
            case 'P2015':
                error = new NotFoundException('Record not found');
                break;

            case 'P2011':
            case 'P2012':
            case 'P2005':
                // Log chi tiết ra console để debug
                console.error('❌ Prisma Validation Error:', {
                    code: exception.code,
                    message: exception.message,
                    meta: exception.meta,
                });
                error = new BadRequestException(
                    `Invalid data: ${exception.message} - ${JSON.stringify(exception.meta)}`
                );
                break;

            default:
                console.error('❌ Prisma Unknown Error:', exception);
                error = new InternalServerErrorException('Internal server error');
        }

        response.status(error.getStatus()).json({
            statusCode: error.getStatus(),
            timestamp: new Date().toISOString(),
            path: request.url,
            message: error.message,
        });
    }
}
