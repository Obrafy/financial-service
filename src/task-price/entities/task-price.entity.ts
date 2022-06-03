import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Document } from 'mongoose';

export type TaskPriceDocument = TaskPrice & Document;

@Schema()
export class TaskPrice {
  @Prop({ type: mongoose.Types.ObjectId, required: true })
  taskId: string;

  @Prop()
  price: number;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: Date, default: Date.now })
  updatedAt: Date;
}

export const TaskPriceSchema = SchemaFactory.createForClass(TaskPrice);
