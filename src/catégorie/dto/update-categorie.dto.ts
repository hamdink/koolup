// update-categorie.dto.ts
import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class UpdateCategorieDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  readonly name?: string;

  // Add other properties as needed
}
