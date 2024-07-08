import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Repas, RepasDocument } from '../repas/entity/repas.entity';
import { CommandeLine, CommandeLineDocument } from 'src/ligneCommande/entity/ligne-commande.entity';
import { Order, OrderDocument } from './entity/commande.entity';
import { CreateOrderDto } from './dto/create-commande.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
    @InjectModel(CommandeLine.name) private commandeLineModel: Model<CommandeLineDocument>,
    @InjectModel(Repas.name) private repasModel: Model<RepasDocument>,
  ) {}

  async createOrder(createOrderDto: CreateOrderDto): Promise<Order> {
    const { userId, commandeLines } = createOrderDto;
    let total = 0;
    const lineDocs: CommandeLineDocument[] = [];

    for (const line of commandeLines) {
      const repas = await this.repasModel.findById(line.repasId);
      if (!repas) {
        throw new NotFoundException(`Repas not found for id: ${line.repasId}`);
      }

      const lineTotal = repas.prix * line.quantity;
      total += lineTotal;

      const lineDoc = new this.commandeLineModel({
        repasId: line.repasId,
        quantity: line.quantity,
        total: lineTotal,
      });

      await lineDoc.save();
      lineDocs.push(lineDoc);
    }

    const order = new this.orderModel({
      userId,
      commandeLines: lineDocs.map(lineDoc => ({
        _id: lineDoc._id,
        repasId: lineDoc.repasId,
        quantity: lineDoc.quantity,
        total: lineDoc.total,
      })),
      total,
    });

    return order.save();
  }
  async getOrderById(id: string): Promise<Order> {
    return this.orderModel.findById(id).populate({
      path: 'commandeLines',
      populate: {
        path: 'repasId',
        model: 'Repas'
      }
    }).exec();
  }

  async getAllOrders(): Promise<Order[]> {
    return this.orderModel.find().populate({
      path: 'commandeLines',
      populate: {
        path: 'repasId',
        model: 'Repas'
      }
    }).exec();
  }

  async getOrderByUserId(userId: string): Promise<Order[]> {
    return this.orderModel.find({ userId }).populate({
      path: 'commandeLines',
      populate: {
        path: 'repasId',
        model: 'Repas'
      }
    }).exec();
  }

 

}
