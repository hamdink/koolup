// menu.controller.ts
import { Controller, Post, Body, UseGuards, Request, Param, Patch, Delete, Get} from '@nestjs/common';
import { MenuService } from './menu.service';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { Menu } from './entity/menu.entity';
import { User, UserRole } from 'src/users/entity/user.entity';
import { RolesGuard } from 'src/auth/Roles/roles.guard';
import { Roles } from 'src/auth/Roles/resto-roles.guard';

@Controller('menus')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.RESTO)
  @Post()
  async createMenu( @Body() createMenuDto: CreateMenuDto) {
    return this.menuService.createMenu( createMenuDto);
  }

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.RESTO)
@Patch('update/:id')
async updateMenu(@Request() req, @Param('id') id: string, @Body() updateMenuDto: UpdateMenuDto) {
  return this.menuService.updateMenu(id, updateMenuDto);
}

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.RESTO)
@Delete(':id')
async deleteMenu(@Request() req, @Param('id') id: string) {
  return this.menuService.deleteMenu(id);
}

@UseGuards(JwtAuthGuard)
  @Get()
  async getMenu(@Request() req): Promise<Menu[]> {
    const user: User = req.user; // Get authenticated user
    return this.menuService.getMenu(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('menu/:id')
  async getMenuById(@Param('id') id: string): Promise<Menu> {
    return this.menuService.getMenuById(id);
  }


  @UseGuards(JwtAuthGuard)
  @Get('/resto/:restoId')
  async getMenuByRestoId(@Param('restoId') restoId: string): Promise<Menu[]> {
    return this.menuService.getMenuByRestoId(restoId);
  }


@UseGuards(JwtAuthGuard)
  @Get('/category/:categoryId')
  async getMenuByCategoryId(@Param('categoryId') categoryId: string): Promise<Menu[]> {
    return this.menuService.getMenuByCategorieId(categoryId);
  }
}
