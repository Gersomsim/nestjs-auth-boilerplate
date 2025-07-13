import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { ApiResponse } from '../../interfaces';
import { Request } from 'express';

@Injectable()
export class ResponseInterceptor<T>
  implements NestInterceptor<T, ApiResponse<T>>
{
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request: Request = context.switchToHttp().getRequest();
    return next.handle().pipe(
      map((data) => {
        const { message, data: dataResponse } = data as {
          message: string;
          data: T;
        };
        return {
          success: true,
          message: message || 'Request successful',
          data: dataResponse,
          meta: {
            timestamp: new Date().toISOString(),
            requestId: crypto.randomUUID(),
            path: request.url,
          },
        };
      }),
    );
  }
}
