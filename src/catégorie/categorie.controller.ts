// categorie.controller.ts
import { Controller, Post, Body, UseGuards, Request, Param, Patch, Delete, Get, Put } from '@nestjs/common';
import { CategorieService } from './categorie.service';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { CreateCategorieDto } from './dto/create-categorie.dto';
import { UpdateCategorieDto } from './dto/update-categorie.dto';
import { Categorie } from './entity/categorie.entity';
import { RolesGuard } from 'src/auth/Roles/roles.guard';
import { UserRole } from 'src/users/entity/user.entity';
import { Roles } from 'src/auth/Roles/resto-roles.guard';

@Controller('categories')
export class CategorieController {
  constructor(private readonly categorieService: CategorieService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.RESTO)
  @Post()
  async createCategorie(@Request() req, @Body() createCategorieDto: CreateCategorieDto): Promise<Categorie> {
    return this.categorieService.createCategorie(req.user, createCategorieDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.RESTO)
  @Put('update/:id')
  async updateCategorie(@Request() req, @Param('id') id: string, @Body() updateCategorieDto: UpdateCategorieDto): Promise<Categorie> {
    return this.categorieService.updateCategorie(id, updateCategorieDto);
  }

  
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.RESTO)
  @Delete(':id')
  async deleteCategorie(@Request() req, @Param('id') id: number): Promise<void> {
    return this.categorieService.deleteCategorie(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllCategories(): Promise<Categorie[]> {
    return this.categorieService.getAllCategories();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getCategoryById(@Param('id') id: string): Promise<Categorie> {
    return this.categorieService.getCategoryById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/resto/:restoId')
  async getCategoriesByRestoId(@Param('restoId') restoId: string): Promise<Categorie[]> {
    return this.categorieService.getCategoriesByRestoId(restoId);
  }
}
