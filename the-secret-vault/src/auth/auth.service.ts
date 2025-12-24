import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Login } from './interface/login.interface';
import { Signup } from './interface/signup.interface';
import { UserService } from '../user/user.service';


@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService) {}

    async login(data: Login) {
        const user = await this.userService.findUserByEmail(data.email);

        if (!user){
            throw new NotFoundException('User not found');
        } 
        if (user.password !== data.password){
            throw new UnauthorizedException('Invalid credentials');
        }

        // 1. Generate the "Key Card" (Token)
        // In reality, this would be: jwtService.sign({ sub: user.id, role: user.role })
        const fakeToken = JSON.stringify({ userId: user.id, role: user.role }); 

        // 2. Hand it to the user. YOU ARE DONE.
        return { 
            message: 'Login successful', 
            accessToken: fakeToken, // The user must save this!
        };
    }

    async register(data: Signup) {
        // 1. Check if email already exists
        const existingUser = await this.userService.findUserByEmail(data.email);
        if (existingUser) {
            throw new UnauthorizedException('User with this email already exists');
        }

        // 2. Save the new user using our UserService
        const newUser = this.userService.createUser({
            username: data.username,
            email: data.email,
            password: data.password,
            role: 'user' // Default role for new signups
        });

        return { 
            message: 'User registered successfully', 
            userId: newUser.id 
        };
    }
}