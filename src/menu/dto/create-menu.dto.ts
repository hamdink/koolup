// create-menu.dto.ts
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateMenuDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  restoId: string;

  @IsNotEmpty()
  @IsString()
  categoryId: string;

  // Add other properties as needed
}
