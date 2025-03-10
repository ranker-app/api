import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CategoryEntity } from './category.entity';
import { Category } from './interfaces/category.interface';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private categorysRepository: Repository<CategoryEntity>,
  ) {}

  async findAll(): Promise<Category[]> {
    return this.categorysRepository.find();
  }

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const newCategory: Category =
      this.categorysRepository.create(createCategoryDto);

    return this.categorysRepository.save(newCategory);
  }

  async findOneOrThrow(id: number): Promise<Category> {
    const category = await this.categorysRepository.findOneBy({ id });

    if (!category) {
      throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
    }

    return category;
  }

  async update(
    id: number,
    createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    const foundCategory = await this.findOneOrThrow(id);

    Object.assign(foundCategory, createCategoryDto);

    return await this.categorysRepository.save(foundCategory);
  }

  async delete(id: number): Promise<any> {
    await this.findOneOrThrow(id);

    return await this.categorysRepository.delete(id);
  }
}
