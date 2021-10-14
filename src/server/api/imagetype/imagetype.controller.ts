import {
  Controller, Get, Post, Body, Patch, Param, Delete,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ImagetypeService } from './imagetype.service';
import { CreateImagetypeDto } from './dto/create-imagetype.dto';
import { UpdateImagetypeDto } from './dto/update-imagetype.dto';
import { ParamIdDto } from '../base/dto/param-id.dto';

@Controller('imagetype')
@ApiTags('ImageType')
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
  findOne(@Param() params: ParamIdDto) {
    return this.imagetypeService.findOne(params.id);
  }

  @Patch(':id')
  update(@Param() params: ParamIdDto, @Body() updateImagetypeDto: UpdateImagetypeDto) {
    return this.imagetypeService.update(params.id, updateImagetypeDto);
  }

  @Delete(':id')
  remove(@Param() params: ParamIdDto) {
    return this.imagetypeService.remove(params.id);
  }
}
