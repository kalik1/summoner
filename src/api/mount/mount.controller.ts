import {
  Controller, Get, Post, Body, Patch, Param, Delete,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MountService } from './mount.service';
import { CreateMountDto } from './dto/create-mount.dto';
import { UpdateMountDto } from './dto/update-mount.dto';
import { ImageTypeParamDto } from '../imagetype/dto/param-imagetype.dto';
import { MountEntity } from './entities/mount.entity';
import { ImageTypeIdParamDto } from '../imagetype/dto/param-imagetype-id.dto';

@Controller('/imagetype/:imagetype/mount')
@ApiTags('Mount')
export class MountController {
  constructor(private readonly mountService: MountService) {}

  @Post()
  create(@Param() imageTypeParams: ImageTypeParamDto, @Body() createMountDto: CreateMountDto): Promise<MountEntity> {
    return this.mountService.create(createMountDto);
  }

  @Get()
  findAll(@Param() imageTypeParams: ImageTypeParamDto):Promise<MountEntity[]> {
    return this.mountService.findAll(imageTypeParams.imageType);
  }

  @Get(':id')
  findOne(@Param() imageTypeParams: ImageTypeIdParamDto): Promise<MountEntity> {
    return this.mountService.findOne(imageTypeParams);
  }

  @Patch(':id')
  update(@Param() imageTypeParams: ImageTypeIdParamDto, @Body() updateMountDto: UpdateMountDto): Promise<MountEntity> {
    return this.mountService.update(imageTypeParams, updateMountDto);
  }

  @Delete(':id')
  remove(@Param() imageTypeParams: ImageTypeIdParamDto): Promise<MountEntity> {
    return this.mountService.findOne(imageTypeParams);
  }
}
