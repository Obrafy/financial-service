import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { ProjectPrice } from 'src/project-price/entities/project-price.entity';

export type EmployeeDocument = Employee & Document;

@Schema()
export class Employee {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: '', required: true })
  employeeId: string;

  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'ProjectPrice' }] })
  projectHistory: ProjectPrice[];

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: Date, default: Date.now })
  updatedAt: Date;
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);
