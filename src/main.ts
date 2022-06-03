import { INestMicroservice, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { join } from 'path';
import { AppModule } from './app.module';
import { FINANCIAL_PROJECT_PACKAGE_NAME } from './common/proto-dto/financial-service/financial-service.pb';

async function bootstrap() {
  const app: INestMicroservice = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.GRPC,
    options: {
      url: `${process.env.TASKPRICE_HOST}:${process.env.TASKPRICE_PORT}`,
      package: [FINANCIAL_PROJECT_PACKAGE_NAME],
      protoPath: [join('..', 'proto', 'proto-files', 'financial-service', 'financial-service.proto')],
    },
  });

  // Validate and Transform Global Pipes
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  await app.listen();
}
bootstrap();
