// user.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Menu } from 'src/menu/entity/menu.entity';
import { Repas } from 'src/repas/entity/repas.entity';
import { Categorie } from 'src/catégorie/entity/categorie.entity'; // Import Categorie entity
import { Order } from 'src/commande/entity/commande.entity';

export enum UserRole {
  RESTO = 'resto',
  ADMIN = 'admin',
  LIVREUR = 'livreur',
  CONSOMMATEUR = 'consommateur',
}

@Entity('users')
@Schema({ timestamps: true })
export class User {
  @PrimaryGeneratedColumn()
  id: string;

  @Prop()
  @Column()
  name: string;

  @Prop({ required: true, unique: true })
  @Column()
  email: string;

  @Prop()
  @Column()
  password: string;

  @Prop()
  @Column()
  telephone: string;

  @Prop()
  @Column()
  adresse: string;

  @Prop({ required: true })
  @Column({ type: 'enum', enum: UserRole, default: UserRole.CONSOMMATEUR })
  role: UserRole;

  @OneToMany(() => Menu, menu => menu.user)
  menus: Menu[];

  @OneToMany(() => Repas, repas => repas.categorie)
  repas: Repas[];

  @OneToMany(() => Categorie, categorie =>  categorie.user) // Establishing the relationship with Categorie
  categories: Categorie[];

  // @OneToMany(() => Order, commande => Order.user)
  // commandes: Order[];


  @Prop()
  @Column({ nullable: true })
  resetTokenExpires: Date;

  @Prop()
  @Column({ nullable: true })
  resetToken: string;

  save(): User | PromiseLike<User> {
    throw new Error('Method not implemented.');
  }
}

export const UserSchema = SchemaFactory.createForClass(User);
export type UserDocument = User & Document;
