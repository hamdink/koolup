// menu.entity.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { User } from 'src/users/entity/user.entity';
import { Categorie, CategorieSchema } from 'src/catégorie/entity/categorie.entity';
import { PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';

@Schema()
export class Menu {
  @PrimaryGeneratedColumn()
  id: number;

  @Prop({ required: true })
  restoId: string;

  @Prop()
  categoryId: string;

  

  @ManyToOne(() => User, user => user.menus)
  user: User;

  @OneToMany(() => Categorie, categorie => categorie.menu) // Specify target type and inverse side
  categories: Categorie[];
}

export const MenuSchema = SchemaFactory.createForClass(Menu);
