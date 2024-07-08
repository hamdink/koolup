import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Repas, RepasSchema } from '../repas/entity/repas.entity';
import { Order, OrderSchema } from './entity/commande.entity';
import { CommandeLine, CommandeLineSchema } from 'src/ligneCommande/entity/ligne-commande.entity';
import { OrdersService } from './commande.service';
import { OrdersController } from './commande.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
    MongooseModule.forFeature([{ name: CommandeLine.name, schema: CommandeLineSchema }]),
    MongooseModule.forFeature([{ name: Repas.name, schema: RepasSchema }]),
  ],
  providers: [OrdersService],
  controllers: [OrdersController],
})
export class OrdersModule {}
