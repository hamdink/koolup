// repas.service.ts

import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateRepasDto } from './dto/repas.dto';
import { Repas, RepasDocument } from './entity/repas.entity';
import mongoose from 'mongoose';
import { Categorie, CategorieDocument } from 'src/catégorie/entity/categorie.entity';
import { UpdateRepasDto } from './dto/updateRepas.dto';


@Injectable()
export class RepasService {
  constructor(
    @InjectModel(Repas.name)
    private readonly repasModel: Model<RepasDocument>,
    @InjectModel(Categorie.name)
    private readonly categorieModel: Model<CategorieDocument>,
  ) {}

  async createRepas(createRepasDto: CreateRepasDto, imagePath: string): Promise<Repas> {
    const { categoryId, ...repasData } = createRepasDto;

    const category = await this.categorieModel.findById(categoryId);
    if (!category) {
      throw new NotFoundException(`Category with ID ${categoryId} not found`);
    }

    const repas = new this.repasModel({
      ...repasData,
      categoryId: categoryId,
      image: imagePath,
    });

    return await repas.save();
  }

  async updateRepas(id: string, updateRepasDto: UpdateRepasDto): Promise<Repas> {
    const repas = await this.repasModel.findByIdAndUpdate(id, updateRepasDto, { new: true });

    if (!repas) {
      throw new NotFoundException(`Repas with ID ${id} not found`);
    }

    return repas;
  }

  async deleteRepas(id: string): Promise<void> {
    const result = await this.repasModel.deleteOne({ _id: id });

    if (result.deletedCount === 0) {
      throw new NotFoundException(`Repas with ID ${id} not found`);
    }
  }

  async getRepasById(id: string): Promise<Repas> {
    const repas = await this.repasModel.findById(id);

    if (!repas) {
      throw new NotFoundException(`Repas with ID ${id} not found`);
    }

    return repas;
  }


  async getRepasByCategoryId(categoryId: string): Promise<Repas[]> {
    const repas = await this.repasModel.find({categoryId});

    if (!repas) {
      throw new NotFoundException(`Repas with category ID ${categoryId} not found`);
    }

    return repas;
  }

  async getAllRepas(): Promise<Repas[]> {
    return this.repasModel.find().exec();
  }

  async getRepasByResto(restoId: string): Promise<Repas[]> {
    const repas = await this.repasModel.find({restoId});

    if (!repas) {
      throw new NotFoundException(`Repas with resto ID ${restoId} not found`);
    }

    return repas;
  }
}
