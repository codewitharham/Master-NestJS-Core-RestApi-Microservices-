import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NotesModule } from './notes/notes.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { RequestIdLoggerMiddleware } from './middleware/request-id-logger/request-id-logger.middleware';

@Module({
  imports: [NotesModule, AuthModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure( 
    consumer: MiddlewareConsumer
  ) {  
    // Middleware can also be applied here if needed in the future
    consumer
      .apply(RequestIdLoggerMiddleware)
      .forRoutes('*'); // Apply to all routes if middleware is added
  }
}
