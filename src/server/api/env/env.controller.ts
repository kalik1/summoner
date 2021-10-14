import {
  Controller, Get, Post, Body, Patch, Param, Delete,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { EnvService } from './env.service';
import { CreateEnvDto } from './dto/create-env.dto';
import { UpdateEnvDto } from './dto/update-env.dto';
import { ImageTypeParamDto } from '../imagetype/dto/param-imagetype.dto';
import { EnvEntity } from './entities/env.entity';
import { ImageTypeIdParamDto } from '../imagetype/dto/param-imagetype-id.dto';

@Controller('/imagetype/:imageType/env')
@ApiTags('Env')
export class EnvController {
  constructor(private readonly envService: EnvService) {}

  @Post()
  create(@Param() imageTypeParams: ImageTypeParamDto, @Body() createEnvDto: CreateEnvDto): Promise<EnvEntity | undefined> {
    return this.envService.create(createEnvDto, imageTypeParams);
  }

  @Get()
  findAll(@Param() imageTypeParams: ImageTypeParamDto):Promise<EnvEntity[]> {
    return this.envService.findAll(imageTypeParams.imageType);
  }

  @Get(':id')
  findOne(@Param() imageTypeParams: ImageTypeIdParamDto): Promise<EnvEntity | undefined> {
    return this.envService.findOne(imageTypeParams);
  }

  @Patch(':id')
  update(@Param() imageTypeParams: ImageTypeIdParamDto, @Body() updateEnvDto: UpdateEnvDto): Promise<EnvEntity | undefined> {
    return this.envService.update(imageTypeParams, updateEnvDto);
  }

  @Delete(':id')
  remove(@Param() imageTypeParams: ImageTypeIdParamDto): Promise<EnvEntity | undefined> {
    return this.envService.remove(imageTypeParams);
  }
}
