import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class UpdateMenuDto {
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  name?: string;

  // Add other properties as needed
}
