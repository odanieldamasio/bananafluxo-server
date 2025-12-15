import { Body, Controller, Get, Headers, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { CategoriesService } from '../services/categories.service';
import { Category } from '../entities/category.entity';
import { CreateCategoryDto } from '../dto/create-category.dto';

@ApiBearerAuth()
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new cateogory' })
  create(
    @Body() createCategoryDto: CreateCategoryDto,
    @Headers('x-user-id') userId: string,
  ): Promise<Category> {
    return this.categoriesService.create(createCategoryDto, userId);
  }

  @Get()
  @ApiOperation({ summary: 'Get all categories' })
  findAll(@Headers('x-user-id') userId: string): Promise<Category[] | null> {
    return this.categoriesService.findAll(userId);
  }
}
