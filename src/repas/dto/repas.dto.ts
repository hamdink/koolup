// repas.dto.ts

import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateRepasDto {
  @IsNotEmpty()
  @IsString()
  nom: string;

  @IsNotEmpty()
  @IsString()
  restoId: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  prix: number;

  @IsOptional()
  @IsString()
  supplements?: string;

  image: string;

  @IsNotEmpty() // Assuming category ID is required
  @IsString()
  categoryId: string; // New field for category ID
}
