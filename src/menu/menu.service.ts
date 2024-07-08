// menu.service.ts
import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Menu } from './entity/menu.entity';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { User } from 'src/users/entity/user.entity';



@Injectable()
export class MenuService {
  constructor(
    @InjectModel(Menu.name)
    private menuModel: Model<Menu>,
  ) {}

  async createMenu( createMenuDto: CreateMenuDto): Promise<Menu> {
  
    const menu = new this.menuModel({ ...createMenuDto });
    return await menu.save();
  }

  async updateMenu(id: string, updateMenuDto: UpdateMenuDto): Promise<Menu> {
    const menu = await this.menuModel.findByIdAndUpdate(id, updateMenuDto, { new: true });

    if (!menu) {
      throw new NotFoundException(`Menu with ID ${id} not found`);
    }

    return menu;
  }

  async deleteMenu(id: string): Promise<void> {
    const result = await this.menuModel.deleteOne({ _id: id });

    if (result.deletedCount === 0) {
      throw new NotFoundException(`Menu with ID ${id} not found`);
    }
    
  }

  
  async getMenu(user: User): Promise<Menu[]> {
    // Fetch menu items based on the authenticated user
    return await this.menuModel.find({ user: user }).exec();
  }

  async getMenuById(id: string): Promise<Menu> {  
    const menu = await this.menuModel.findById(id);

    if (!menu) {
      throw new NotFoundException(`Menu with ID ${id} not found`);
    }

    return menu;
  }

  async getMenuByRestoId(restoId: string): Promise<Menu[]> {
    return this.menuModel.find({ restoId}).exec();
  
  }

  async getMenuByCategorieId(categoryId: string): Promise<Menu[]> {
    return this.menuModel.find({ categoryId }).exec();
  }
}
