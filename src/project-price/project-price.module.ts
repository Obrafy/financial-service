import { Module } from '@nestjs/common';
import { ProjectPriceService } from './project-price.service';
import { ProjectPriceController } from './project-price.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ProjectPrice, ProjectPriceSchema } from './entities/project-price.entity';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PROJECT_SERVICE_NAME, PROJECT_PACKAGE_NAME } from '../common/proto-dto/project-service/project.pb';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ConfigInterface } from '../config';
import { makeMicroserviceUrl } from '../common/helpers/make-microservice';
import { join } from 'path';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: ProjectPrice.name, schema: ProjectPriceSchema }]),
    ClientsModule.registerAsync([
      {
        name: PROJECT_SERVICE_NAME,
        useFactory: (configService: ConfigService<ConfigInterface>) => ({
          transport: Transport.GRPC,
          options: {
            url: makeMicroserviceUrl(
              configService.get('PROJECT_SERVICE_HOST', { infer: true }),
              configService.get('PROJECT_SERVICE_PORT', { infer: true }),
            ),
            package: PROJECT_PACKAGE_NAME,
            protoPath: join(`${process.env.ENV}`, 'proto', 'proto-files', 'project-service', 'project.proto'),
          },
        }),
        inject: [ConfigService],
        imports: [ConfigModule],
      },
    ]),
  ],
  controllers: [ProjectPriceController],
  providers: [ProjectPriceService],
  exports: [ProjectPriceService],
})
export class ProjectPriceModule {}
