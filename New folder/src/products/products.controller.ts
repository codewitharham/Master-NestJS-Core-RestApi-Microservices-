import { Body, Controller, Get, Post, Param, ParseIntPipe } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './Product';
import { CreateProductDto } from './products.dto';



@Controller('products')
export class ProductsController {

    private readonly productsService: ProductsService;

    constructor(productsService: ProductsService) {
        this.productsService = productsService;
    }

    @Get()
    getAllProducts() {
        return this.productsService.getAllProducts();
    }

    @Get(':id')
    getProductById(@Param('id', ParseIntPipe) id: number) {
        // Implementation for getting a product by ID can be added here
        return this.productsService.getProductById(id); // Placeholder ID
    }



    @Post()
    createProduct(@Body() body: CreateProductDto): Product {
        return this.productsService.createProduct(
            body.name,
            body.price,
            body.description,
            body.category,
            body.stock
        );
    }

    
 

   

}
