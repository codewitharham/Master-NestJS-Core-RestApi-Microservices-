import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ROLES_KEY } from 'src/custom-decorators/auth/roles.decorator';
import { UserService } from 'src/user/user.service';

@Injectable()
export class RoleGuard implements CanActivate {
  private userService: UserService;
  private reflector: Reflector;

  constructor(userService: UserService, reflector: Reflector) {
    this.userService = userService;
    this.reflector = reflector;
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // 1. Get the roles required for this route (e.g., ['admin'])
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [
        context.getHandler(), // Checks the method (e.g., deleteNote)
        context.getClass(), // Checks the controller (NotesController)
      ],
    );

    // If no roles are required, let them in!
    if (!requiredRoles) return true;

    // 2. Get the Request
    const request = context.switchToHttp().getRequest();

    // 3. EXTRACT THE TOKEN (The Client sends this!)
    // Expected Header -> Authorization: {"userId": 1, "role": "admin"}
    const authHeader = request.headers['authorization'];
    console.log('Auth Header:', authHeader);

    if (!authHeader) {
      throw new UnauthorizedException('Missing Authorization Header');
    }

    let userToken: any;

    try {
      // 4. Decode the token (Simulating JWT verification)
      console.log('Raw Header Received:', authHeader);
      userToken = JSON.parse(authHeader);
    } catch (error) {
      throw new UnauthorizedException('Invalid Authorization Header Format');
    }

    // 5. Verify the user actually exists in our DB
    const user = this.userService.findUserById(userToken.userId);
    if (!user) throw new UnauthorizedException('User no longer exists');

    // 6. Check if their role matches the requirement
    const hasRole = requiredRoles.includes(user.role);

    if (!hasRole) {
      throw new UnauthorizedException(
        'You do not have permission (Admin only)',
      );
    }

    request.user = user;
    return true;
  }
}
