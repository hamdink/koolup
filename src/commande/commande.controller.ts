import { Controller, Post, Body, Get, Param, Put } from '@nestjs/common';
import { OrdersService } from './commande.service';
import { CreateOrderDto } from './dto/create-commande.dto';
import { Order } from './entity/commande.entity';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';


@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createOrder(@Body() createOrderDto: CreateOrderDto): Promise<Order> {
    return this.ordersService.createOrder(createOrderDto);
  }
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getOrderById(@Param('id') id: string): Promise<Order> {
    return this.ordersService.getOrderById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllOrders(): Promise<Order[]> {
    return this.ordersService.getAllOrders();
  }

  
  @UseGuards(JwtAuthGuard)
  @Get('/user/:userId')
  async getOrdersByUserId(@Param('userId') userId: string): Promise<Order[]> {
    return this.ordersService.getOrderByUserId(userId);
  }

}
