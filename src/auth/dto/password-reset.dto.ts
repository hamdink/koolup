import { UnauthorizedException, BadRequestException } from '@nestjs/common';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class PasswordResetDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  newPassword: string;

  
}
