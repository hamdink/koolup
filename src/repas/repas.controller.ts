// repas.controller.ts

import { Body, Controller, Delete, Get, Param, Post, Put, Patch, UseGuards, UseInterceptors, UploadedFile, NotFoundException } from '@nestjs/common';
import { CreateRepasDto } from './dto/repas.dto';
import { RepasService } from './repas.service';
import { RolesGuard } from '../auth/Roles/roles.guard';
import { UpdateRepasDto } from './dto/updateRepas.dto';
import { Roles } from 'src/auth/Roles/resto-roles.guard';
import { User, UserRole } from 'src/users/entity/user.entity';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';


@Controller('repas')
export class RepasController {
  constructor(private readonly repasService: RepasService) {}

  @Post()
  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles(UserRole.RESTO)
  @UseInterceptors(FileInterceptor('image'))
  async createRepas(
    @Body() createRepasDto: CreateRepasDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    console.log('file', file);
    if (!file) {
      throw new NotFoundException('Image is required');
    }
    const imagePath = file.path.replace(/\\/g, '/'); 

    const savedRepas = await this.repasService.createRepas(createRepasDto, imagePath);
    return {
      ...savedRepas,
      imageUrl: `http://localhost:3004/uploads/${file.filename}`, 
    };
  }
  

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.RESTO)
  @Put('update/:id')
  async updateRepas(@Param('id') id: string, @Body() updateRepasDto: UpdateRepasDto) {
    // You may want to check the user role here to ensure it's 'resto'
    return this.repasService.updateRepas(id, updateRepasDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.RESTO)
  @Delete(':id')
  async deleteRepas(@Param('id') id: string) {
    // You may want to check the user role here to ensure it's 'resto'
    return this.repasService.deleteRepas(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getRepasById(@Param('id') id: string) {
    return this.repasService.getRepasById(id);
  }


  @UseGuards(JwtAuthGuard)
  @Get('/category/:categoryId')
  async getRepasByCategoryId(@Param('categoryId') categoryId: string) {
    return this.repasService.getRepasByCategoryId(categoryId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/resto/:restoId')
  async getRepasByRestoId(@Param('restoId') restoId: string) {
    return this.repasService.getRepasByResto(restoId);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllRepas() {
    return this.repasService.getAllRepas();
  }
}
