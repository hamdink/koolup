// menu.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MenuController } from './menu.controller';
import { MenuService } from './menu.service';
import { Menu, MenuSchema } from './entity/menu.entity';
import { UserModule } from 'src/users/user.module'; // Import the UserModule based on your project structure

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Menu.name, schema: MenuSchema }]),
    UserModule, // Include the UserModule for User entity and related functionalities
  ],
  controllers: [MenuController],
  providers: [MenuService],
})
export class MenuModule {}
