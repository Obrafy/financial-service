import { Module } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeController } from './employee.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Employee, EmployeeSchema } from './entities/employee.entity';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ConfigInterface } from 'src/config';
import { makeMicroserviceUrl } from 'src/common/helpers/make-microservice';
import { join } from 'path';
import { AUTH_PACKAGE_NAME, USER_MANAGEMENT_SERVICE_NAME } from 'src/common/proto-dto/authentication-service/auth.pb';
import { TaskPriceModule } from 'src/task-price/task-price.module';

@Module({
  imports: [
    TaskPriceModule,
    MongooseModule.forFeature([{ name: Employee.name, schema: EmployeeSchema }]),
    ClientsModule.registerAsync([
      {
        name: USER_MANAGEMENT_SERVICE_NAME,
        useFactory: (configService: ConfigService<ConfigInterface>) => ({
          transport: Transport.GRPC,
          options: {
            url: makeMicroserviceUrl(
              configService.get('AUTH_SERVICE_HOST', { infer: true }),
              configService.get('AUTH_SERVICE_PORT', { infer: true }),
            ),
            package: AUTH_PACKAGE_NAME,
            protoPath: join(`${process.env.ENV}`, 'proto', 'proto-files', 'authentication-service', 'auth.proto'),
          },
        }),
        inject: [ConfigService],
        imports: [ConfigModule],
      },
    ]),
  ],
  controllers: [EmployeeController],
  providers: [EmployeeService],
})
export class EmployeeModule {}
