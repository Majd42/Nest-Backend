import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import {HttpExceptionFilter} from './modules/shared/filters/http-exception-filter'
import { ResponseFormatInterceptor } from './modules/shared/interceptors/ResponseFormatInterceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: "*",
    allowedHeaders: "*",
    methods: "*",
    credentials: true
  })
  app.useGlobalPipes( new ValidationPipe())
  app.useGlobalFilters(new HttpExceptionFilter())
  app.useGlobalInterceptors(new ResponseFormatInterceptor())
  
  await app.listen(process.env.PORT || 3333);
}
bootstrap();
