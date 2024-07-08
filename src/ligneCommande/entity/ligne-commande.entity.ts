import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type CommandeLineDocument = CommandeLine & Document;

@Schema()
export class CommandeLine {
  @Prop({ type: Types.ObjectId, ref: 'Repas', required: true })
  repasId: string;

  @Prop({ required: true })
  quantity: number;

  @Prop({ required: true })
  total: number;
}

export const CommandeLineSchema = SchemaFactory.createForClass(CommandeLine);
