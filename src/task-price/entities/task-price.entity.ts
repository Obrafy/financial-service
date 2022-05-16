import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TaskPriceDocument = TaskPrice & Document;

@Schema()
export class TaskPrice {
  @Prop({ required: true })
  name: string;

  @Prop()
  price: number;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  updatedAt: Date;
}

export const TaskPriceSchema = SchemaFactory.createForClass(TaskPrice);
