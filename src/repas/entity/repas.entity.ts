// repas.entity.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { Categorie } from 'src/catégorie/entity/categorie.entity';
import { CommandeLine } from 'src/ligneCommande/entity/ligne-commande.entity';

export type RepasDocument = Repas & Document;

@Schema()
export class Repas {
  @PrimaryGeneratedColumn()
  id: string;

  @ManyToOne(() => Categorie, categorie => categorie.repas)
  categorie: Categorie;

  // @OneToMany(() => CommandeLine, ligneCommande => ligneCommande.commande)
  // commandeLines: CommandeLine[];

  @Prop({ required: true })
  nom: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  prix: number;

  @Prop()
  categoryId:string;

  @Prop()
  restoId:string;

  @Prop()
  image: string;

  // @Prop()
  // supplements?: string;
}

export const RepasSchema = SchemaFactory.createForClass(Repas);
