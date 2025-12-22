import { IsNotEmpty, IsString } from "class-validator";

export class CreateCustomerDto {

    @IsString()
    @IsNotEmpty()
    firstName: string;
    
    @IsString()
    @IsNotEmpty()
    lastName: string;
    
    @IsString()
    @IsNotEmpty()
    email: string;
    
    @IsString()
    @IsNotEmpty()
    phoneNumber: string;
}   

