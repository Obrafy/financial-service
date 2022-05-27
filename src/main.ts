import { INestMicroservice, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { join } from 'path';
import { AppModule } from './app.module';
import { TASK_PRICE_PACKAGE_NAME } from './task-price/dto/proto/financial-service/task-price.pb';

async function bootstrap() {
  const app: INestMicroservice = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.GRPC,
    options: {
      url: `${process.env.TASKPRICE_HOST}:${process.env.TASKPRICE_PORT}`,
      package: [TASK_PRICE_PACKAGE_NAME],
      protoPath: [join('node_modules', 'proto', 'proto-files', 'financial-service', 'task-price.proto')],
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
