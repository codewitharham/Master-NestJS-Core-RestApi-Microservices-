import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { ResponseInterface } from './interface/response.interface';
import { Request } from 'express';

@Injectable()
export class TransformResponseInterceptor<T> implements NestInterceptor<T, ResponseInterface<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<ResponseInterface<T>> {

    // === PRE-EXECUTION START ===
    // You can add pre-processing logic here if needed
    
    const request: Request = context.switchToHttp().getRequest();
    const method = request.method;
    const url = request.url;
    const now = Date.now();
    const requestId = request['requestId'] || 'N/A';


    console.log(`[${method}] ${url} - Request received at ${new Date().toISOString()}`);

    return next.handle().pipe(
      // === POST-EXECUTION START ===
      // You can add post-processing logic here if needed
      // For example, transforming the response format
      // or logging the response time
      
      // Using RxJS map operator to transform the response

      map((data: T) => {  
        const response: ResponseInterface<T> = {
          data,
          message: 'Request successful',  
          statusCode: 200,
          timestamp: new Date().toISOString(),
          requestId,
        };  
        console.log(`[${method}] ${url} - Response sent at ${new Date().toISOString()} - Duration: ${Date.now() - now}ms`);
        return response;

      }
     
      
    ));
  }
}
