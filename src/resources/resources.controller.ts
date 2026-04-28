import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ResourcesService } from './resources.service';
import { CreateResourceDto } from './dto/create-resource.dto';

@Controller()
export class ResourcesController {
  constructor(private readonly resourcesService: ResourcesService) {}

  @Get(':langCode/resources')
  findAll(@Param('langCode') langCode: string) {
    return this.resourcesService.findAll(langCode);
  }

  @Get(':langCode/resources/:id')
  findOne(@Param('langCode') langCode: string, @Param('id') id: string) {
    return this.resourcesService.findOne(langCode, id);
  }

  @Post('resources')
  create(@Body() createResourceDto: CreateResourceDto) {
    return this.resourcesService.create(createResourceDto);
  }

  @Put('resources/:id')
  update(@Param('id') id: string, @Body() updateData: Partial<CreateResourceDto>) {
    return this.resourcesService.update(id, updateData);
  }

  @Delete('resources/:id')
  remove(@Param('id') id: string) {
    return this.resourcesService.remove(id);
  }
}
