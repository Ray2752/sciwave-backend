import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Resource } from './entities/resource.entity';
import { CreateResourceDto } from './dto/create-resource.dto';

@Injectable()
export class ResourcesService {
  constructor(
    @InjectRepository(Resource)
    private readonly resourceRepository: Repository<Resource>,
  ) {}

  async findAll(langCode: string) {
    // Busca recursos filtrando por el código de idioma de la relación
    return await this.resourceRepository.find({
      where: { language: { code: langCode } },
      relations: ['category', 'language'], // Trae los datos anidados
    });
  }

  async findOne(langCode: string, id: string) {
    const resource = await this.resourceRepository.findOne({
      where: { id, language: { code: langCode } },
      relations: ['category', 'language'],
    });
    if (!resource) throw new NotFoundException(`Recurso no encontrado`);
    return resource;
  }

  async create(createResourceDto: CreateResourceDto) {
    // TypeORM mapea el DTO directamente a la entidad
    const newResource = this.resourceRepository.create({
      title: createResourceDto.title,
      content: createResourceDto.content,
      category: { id: createResourceDto.categoryId },
      language: { id: createResourceDto.languageId },
      source_url: createResourceDto.source_url,
      status: createResourceDto.status,
    });
    return await this.resourceRepository.save(newResource);
  }

  async update(id: string, updateData: Partial<CreateResourceDto>) {
    await this.resourceRepository.update(id, {
      ...(updateData.title && { title: updateData.title }),
      ...(updateData.content && { content: updateData.content }),
      ...(updateData.source_url && { source_url: updateData.source_url }),
      ...(updateData.status && { status: updateData.status }),
      ...(updateData.categoryId && { category: { id: updateData.categoryId } }),
      ...(updateData.languageId && { language: { id: updateData.languageId } }),
    });
    return this.resourceRepository.findOne({ where: { id }, relations: ['category', 'language'] });
  }

  async remove(id: string) {
    return await this.resourceRepository.delete(id);
  }
}