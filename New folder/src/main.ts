import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  
  // Global Pipes are used for validation and transformation bcz we are using DTOs
  // so to enable validation globally we use this
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  
  ); // Enable global pipes if needed

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
