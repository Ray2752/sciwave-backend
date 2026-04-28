import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  findAllByLanguage(langCode: string): Promise<Category[]> {
    return this.categoryRepository.find({
      where: { language: { code: langCode } },
      relations: ['language'],
    });
  }
}
