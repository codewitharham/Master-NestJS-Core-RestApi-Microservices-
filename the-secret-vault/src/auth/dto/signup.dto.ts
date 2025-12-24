import { IsString } from 'class-validator';

export class SignupDto {
    @IsString()
    username: string;
    @IsString() 
    email: string;
    @IsString()
    password: string;
}