// products.module.ts

import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

@Module({
    // Controllers array registers all API endpoints in this module
    controllers: [ProductsController],
    
    // Providers array registers all services/business logic
    providers: [ProductsService],
})
export class ProductsModule {}