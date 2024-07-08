// repas.module.ts

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RepasController } from './repas.controller';
import { RepasService } from './repas.service';
import { Repas, RepasSchema } from './entity/repas.entity';
import { CategorieModule } from 'src/catégorie/categorie.module';
import { Categorie, CategorieSchema } from 'src/catégorie/entity/categorie.entity';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Repas.name, schema: RepasSchema },
      { name: Categorie.name, schema: CategorieSchema }
    ]),
    MulterModule.register({
      dest: './uploads', 

    }),
  ],
  controllers: [RepasController],
  providers: [RepasService],
})
export class RepasModule {}
