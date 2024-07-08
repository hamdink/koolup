import { Type } from "class-transformer";
import { IsNotEmpty } from "class-validator";
import { CreateCommandeLineDto } from "src/ligneCommande/dto/createCommandeLineDto";

// src/orders/dto/create-order.dto.ts
export class CreateOrderDto {
  @IsNotEmpty()
  userId: string;

  @IsNotEmpty()
  @Type(() => CreateCommandeLineDto)
  commandeLines: CreateCommandeLineDto[];
}
