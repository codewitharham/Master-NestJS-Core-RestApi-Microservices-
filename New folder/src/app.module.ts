import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsService } from './products/products.service';
import { ProductsController } from './products/products.controller';  
import { ProductsModule } from './products/products.module';
import { CustomerModule } from './customer/customer.module';

@Module({
  imports: [ProductsModule, CustomerModule], // Register the module here
  controllers: [AppController, ProductsController],
  providers: [AppService, ProductsService],
})
export class AppModule {}
