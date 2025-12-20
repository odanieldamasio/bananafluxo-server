import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from '../entities/category.entity';
import { CreateCategoryDto } from '../dto/create-category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  create(
    createCategoryDto: CreateCategoryDto,
    userId: string,
  ): Promise<Category> {
    const transaction = this.categoryRepository.create({
      ...createCategoryDto,
      userId,
    });
    return this.categoryRepository.save(transaction);
  }

  findAll(userId: string): Promise<Category[] | null> {
    return this.categoryRepository.find({ where: { userId } });
  }
}
