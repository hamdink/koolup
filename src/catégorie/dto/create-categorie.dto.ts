// create-categorie.dto.ts
import { IsNotEmpty, IsString, IsMongoId } from 'class-validator';

export class CreateCategorieDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  restoId: string;

  // Add other properties as needed
}
