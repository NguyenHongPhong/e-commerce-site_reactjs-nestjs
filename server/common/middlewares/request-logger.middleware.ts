import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class RequestLoggerMiddleware implements NestMiddleware {
    private readonly logger = new Logger('RequestLogger');

    use(req: Request, res: Response, next: NextFunction) {
        const startTime = Date.now();
        const timestamp = new Date().toISOString();

        // Log request details
        this.logger.log(`=== INCOMING REQUEST ===`);
        this.logger.log(`Timestamp: ${timestamp}`);
        this.logger.log(`Method: ${req.method}`);
        this.logger.log(`URL: ${req.url}`);
        this.logger.log(`Path: ${req.path}`);
        this.logger.log(`Client IP: ${req.ip || req.connection.remoteAddress || 'unknown'}`);
        this.logger.log(`User Agent: ${req.get('User-Agent') || 'unknown'}`);
        this.logger.log(`Referer: ${req.get('Referer') || 'none'}`);
        this.logger.log(`Origin: ${req.get('Origin') || 'none'}`);

        // Log query parameters
        if (Object.keys(req.query).length > 0) {
            this.logger.log(`Query Parameters: ${JSON.stringify(req.query, null, 2)}`);
        }

        // Log headers (filter out sensitive ones)
        const safeHeaders = { ...req.headers };
        delete safeHeaders.authorization;
        delete safeHeaders.cookie;
        this.logger.log(`Headers: ${JSON.stringify(safeHeaders, null, 2)}`);

        // Log body for POST/PUT/PATCH requests
        if (['POST', 'PUT', 'PATCH'].includes(req.method) && req.body) {
            this.logger.log(`Body: ${JSON.stringify(req.body, null, 2)}`);
        }

        this.logger.log(`=== END REQUEST ===`);

        // Capture response details
        const originalSend = res.send;
        res.send = function (data) {
            const endTime = Date.now();
            const duration = endTime - startTime;

            // Log response details
            const logger = new Logger('RequestLogger');
            logger.log(`=== RESPONSE SENT ===`);
            logger.log(`Timestamp: ${new Date().toISOString()}`);
            logger.log(`Method: ${req.method}`);
            logger.log(`URL: ${req.url}`);
            logger.log(`Status Code: ${res.statusCode}`);
            logger.log(`Duration: ${duration}ms`);

            // Log response data (be careful with sensitive data)
            if (data && typeof data === 'string') {
                try {
                    const parsedData = JSON.parse(data);
                    logger.log(`Response Data: ${JSON.stringify(parsedData, null, 2)}`);
                } catch {
                    logger.log(`Response Data: ${data.substring(0, 200)}...`);
                }
            } else if (data) {
                logger.log(`Response Data: ${JSON.stringify(data, null, 2)}`);
            }

            logger.log(`=== END RESPONSE ===`);

            return originalSend.call(this, data);
        };

        next();
    }
}
