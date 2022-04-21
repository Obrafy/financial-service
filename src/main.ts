import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigInterface } from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Instantiate config service
  const configService = app.get<ConfigService<ConfigInterface>>(ConfigService);

  // Validate and Transform Global Pipes
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  const port = configService.get('PORT', { infer: true });
  await app.listen(port);
}
bootstrap();
