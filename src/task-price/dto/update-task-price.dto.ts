import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskPriceDto } from './create-task-price.dto';

export class UpdateTaskPriceDto extends PartialType(CreateTaskPriceDto) {}
