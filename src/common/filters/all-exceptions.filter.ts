import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import { Request , Response } from "express"
import { request } from 'http';
import path from 'path';
import { timestamp } from 'rxjs';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter{
    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const Request = ctx.getRequest<Request>();

        if(exception instanceof HttpException)
            {
                const status = exception.getStatus();
                const result = exception.getResponse()

                response.status(status).json({
                    success:false,
                    statusCode: status,
                    timestamp: new Date().toISOString(),
                    path: request.url,
                    error: typeof result === 'string' ? result : result,
                })
                return
            }
        response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(
            {
                success:false,
                statusCode: 500,
                timestamp: new Date().toISOString(),
                path: request.url,
                message:'Internal Server Error'
            })
    }
}
