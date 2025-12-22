import { IsDate, IsNumber, IsString } from 'class-validator';

export class UserDto {
    @IsNumber()
    id: number;

    @IsString()
    username: string;
    
    @IsString()
    email: string;

    @IsString()
    password: string;

    @IsString()
    role: string;

    @IsDate()
    createdAt: Date;

    @IsDate()
    updatedAt: Date;
}