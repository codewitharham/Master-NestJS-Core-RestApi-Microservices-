import { SetMetadata } from '@nestjs/common';

// This is the key we'll use to read the data later
export const ROLES_KEY = 'roles';

// This function lets us use @Roles('admin') on our controllers
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);