import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { SignupDto } from './dto/signup.dto';

@Controller('auth')
export class AuthController {
    // Authentication-related endpoints will be defined here
    private readonly authService: AuthService;

    constructor(authService: AuthService) {
        this.authService = authService;
    }

    @Post('login')
    async login(@Body() body: LoginDto) {
        // Logic for user login
        return this.authService.login(body);
    }

    @Post('register')
    async register(@Body() body: SignupDto) {
        // Logic for user registration
        return this.authService.register(body);
    }

}
