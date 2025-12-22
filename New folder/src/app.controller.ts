import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  // Using explicit property declaration and assignment in the constructor
  private readonly appService: AppService;

  // Constructor-based dependency injection
  constructor(AppService: AppService) {
    this.appService = AppService;
  }

  // HTTP GET endpoint
  @Get() // Decorator to define a GET route
  // Method to handle GET requests
  getHello(): string {
    return this.appService.getHello();
  }
}
