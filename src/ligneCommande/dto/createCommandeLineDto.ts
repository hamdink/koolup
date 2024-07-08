import { IsNotEmpty } from 'class-validator';


export class CreateCommandeLineDto {
  @IsNotEmpty()
  repasId: string;

  @IsNotEmpty()
  quantity: number;
}
