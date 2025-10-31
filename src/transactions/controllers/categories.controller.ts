import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { CategoriesService } from '../services/categories.service';
import { Category } from '../entities/category.entity';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { CurrentUser } from 'src/auth/current-user.decorator';

@ApiBearerAuth()
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new cateogory' })
  create(
    @Body() createCategoryDto: CreateCategoryDto,
    @CurrentUser() userId: string,
  ): Promise<Category> {
    return this.categoriesService.create(createCategoryDto, userId);
  }

  @Get()
  @ApiOperation({ summary: 'Get all categories' })
  findAll(@CurrentUser() userId: string): Promise<Category[] | null> {
    return this.categoriesService.findAll(userId);
  }
}
