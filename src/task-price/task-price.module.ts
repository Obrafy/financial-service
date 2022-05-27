import { Module } from '@nestjs/common';
import { TaskPriceService } from './task-price.service';
import { TaskPriceController } from './task-price.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskPrice, TaskPriceSchema } from './entities/task-price.entity';

@Module({
  imports: [MongooseModule.forFeature([{ name: TaskPrice.name, schema: TaskPriceSchema }])],
  controllers: [TaskPriceController],
  providers: [TaskPriceService],
})
export class TaskPriceModule {}
