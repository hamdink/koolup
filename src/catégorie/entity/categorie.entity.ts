// categorie.entity.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { User } from 'src/users/entity/user.entity';
import { Menu } from 'src/menu/entity/menu.entity';
import { Repas } from 'src/repas/entity/repas.entity';
import {  ManyToOne, OneToMany } from 'typeorm';
export type CategorieDocument = Categorie & Document;

@Schema()
export class Categorie {
  @Prop({ required: true }) // Assurez-vous d'ajouter cette ligne pour la propriété name
  name: string;

  @Prop()
  restoId: string;

  @ManyToOne(() => User, user => user.categories)
  user: User;

  @ManyToOne(() => Menu, menu => menu.categories)
  menu: Menu;

  @OneToMany(() => Repas, repas => repas.categorie)
  repas: Repas[];
}

export const CategorieSchema = SchemaFactory.createForClass(Categorie);
