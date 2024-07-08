// create-user.dto.ts

import { IsString, IsEmail, IsNotEmpty, IsOptional, IsDate } from 'class-validator';
import { Date } from 'mongoose';

export class CreateUserDto {

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  telephone: string; 

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  adresse: string;

  @IsNotEmpty()
  @IsString()
  dateInscription: string;

  @IsNotEmpty()
  @IsString()
  role: string;



  @IsOptional()
  resetTokenExpires: Date;

  @IsOptional()
  resetToken: string;
}
