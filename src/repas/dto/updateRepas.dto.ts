// repas.dto.ts

import { IsOptional } from 'class-validator';

export class UpdateRepasDto {
 @IsOptional()
  nom: string;

  @IsOptional()
  description: string;

  @IsOptional()
  prix: number;

  @IsOptional()
  supplements: string;

  @IsOptional()
  categoryId: string; // New field for category ID
}
