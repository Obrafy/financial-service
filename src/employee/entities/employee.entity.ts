import { Prop, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type EmployeeDocument = Employee & Document;

@Schema()
export class TaskPricing {
  @Prop()
  taskId: number;

  @Prop()
  price: number;
}

@Schema()
export class Employee {
  @Prop()
  employeeId: number;

  @Prop()
  price: TaskPricing[];
}
