import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';

import { ConfigInterface, loader, validationSchema } from './config';
import { EmployeeModule } from './employee/employee.module';
import { TaskPriceModule } from './task-price/task-price.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [loader],
      validationSchema: validationSchema,
      expandVariables: true,
    }),

    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService<ConfigInterface>) => ({
        uri: configService.get('DB_URI', { infer: true }),
        autoIndex: true,
      }),
    }),

    EmployeeModule,

    TaskPriceModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
