import { Controller, Get, Param } from '@nestjs/common';
import { CategoriesService } from './categories.service';

@Controller()
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get(':langCode/categories')
  findAllByLanguage(@Param('langCode') langCode: string) {
    return this.categoriesService.findAllByLanguage(langCode);
  }
}
