import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class RequestIdLoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // 1. Generate a unique ID for this specific request
    const requestId = uuidv4();

    // 2. Attach it to the request object so Guards/Controllers can see it
    req['requestId'] = requestId;

    // 3. Attach it to the response header so the Client (Postman) sees it too
    res.setHeader('X-Request-Id', requestId);

    console.log(`[Middleware] Assigned Request ID: ${requestId}`);
    
    next();
  }
}
