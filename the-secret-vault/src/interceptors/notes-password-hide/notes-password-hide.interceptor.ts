import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Injectable()
export class NotesPasswordHideInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {

    const request = context.switchToHttp().getRequest();
    const user = request.user; // Attached earlier by our RoleGuard!

    return next.handle().pipe(
      // Implement logic to hide passwords in notes here

     map(data => {
        // If the user is an admin, show everything
        if (user?.role === 'admin') return data;

        // If it's a list of notes, hide the owner and mask content for non-admins
        if (Array.isArray(data)) {
          return data.map(note => ({
            id: note.id,
            content: '🔒 [Protected Content]',
            // We omit the 'owner' field entirely
          }));
        }

        return data;
      })


    );
  }
}
