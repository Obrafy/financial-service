import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Document } from 'mongoose';

export type ProjectPriceDocument = ProjectPrice & Document;

@Schema()
export class ProjectPrice {
  @Prop({ type: mongoose.Types.ObjectId, required: true })
  projectId: string;

  @Prop()
  price: number;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: Date, default: Date.now })
  updatedAt: Date;
}

export const ProjectPriceSchema = SchemaFactory.createForClass(ProjectPrice);
