import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ImagetypeService } from './imagetype.service';
import { CreateImagetypeDto } from './dto/create-imagetype.dto';
import { UpdateImagetypeDto } from './dto/update-imagetype.dto';

@Controller('imagetype')
export class ImagetypeController {
  constructor(private readonly imagetypeService: ImagetypeService) {}

  @Post()
  create(@Body() createImagetypeDto: CreateImagetypeDto) {
    return this.imagetypeService.create(createImagetypeDto);
  }

  @Get()
  findAll() {
    return this.imagetypeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.imagetypeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateImagetypeDto: UpdateImagetypeDto) {
    return this.imagetypeService.update(+id, updateImagetypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.imagetypeService.remove(+id);
  }
}
