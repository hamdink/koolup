import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { CommandeLine } from 'src/ligneCommande/entity/ligne-commande.entity';

export type OrderDocument = Order & Document;

@Schema()
export class Order {
  @Prop({ required: true })
  userId: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'CommandeLine' }] })
  commandeLines: CommandeLine[];

  @Prop({ required: true })
  total: number;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
