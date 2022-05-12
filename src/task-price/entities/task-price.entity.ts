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
  created_at: Date;

  updated_at: Date;
}

export const TaskPriceSchema = SchemaFactory.createForClass(TaskPrice);
