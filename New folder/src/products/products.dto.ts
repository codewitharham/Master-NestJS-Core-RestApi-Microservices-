// create-product.dto.ts
import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreateProductDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNumber()
    @Min(0.01)
    price: number;
    
    // ... add decorators for all other properties
    @IsString()
    description: string;

    @IsString()
    category: string;
    
    @IsNumber()
    stock: number;
}