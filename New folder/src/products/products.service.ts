import { Injectable } from '@nestjs/common';
import { Product } from './Product';

@Injectable()
export class ProductsService {
    private products: Product[] = [];
    private nextId: number = 1;

    // Create a new product
    createProduct(name: string, price: number, description: string, category: string, stock: number): Product {
        const newProduct = new Product(
            this.nextId++,
            name,
            price,
            description,
            category,
            stock,
            new Date(),
            new Date()
        );

        console.log(newProduct);
        
        this.products.push(newProduct);
        return newProduct;
    }

    // Retrieve all products
    getAllProducts(): Product[] {
        return this.products;
    }

    getProductById(id: number): Product | undefined {

        return this.products.find(product => product.getId() === id);
    }

 

    





}
