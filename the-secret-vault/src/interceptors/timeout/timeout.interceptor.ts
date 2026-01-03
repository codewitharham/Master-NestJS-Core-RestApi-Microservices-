import { CallHandler, ExecutionContext, Injectable, NestInterceptor, RequestTimeoutException } from '@nestjs/common';
import { catchError, Observable, throwError, timeout, TimeoutError } from 'rxjs';

@Injectable()
export class TimeoutInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {

    // Implement timeout logic here

    const LIMIT = 5000; // Timeout limit in milliseconds

    return next.handle().pipe(
      timeout(LIMIT),
      catchError(err => {
        if (err instanceof TimeoutError) {
          return throwError(()=> new RequestTimeoutException('Vault access timed out. Please try again.'));
        }
        return throwError(() => err);
      })

    );
  }
}
