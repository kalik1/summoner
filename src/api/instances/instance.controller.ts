import {
  Controller, Get, Post, Body, Patch, Param, Delete,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { InstanceService } from './instance.service';
import { CreateInstanceDto } from './dto/create-instance.dto';
import { UpdateInstanceDto } from './dto/update-instance.dto';
import { ParamIdDto } from '../base/dto/param-id.dto';

@Controller('instances')
@ApiTags('Instances')
export class InstanceController {
  constructor(private readonly instancesService: InstanceService) {}

  @Post()
  create(@Body() createInstanceDto: CreateInstanceDto) {
    return this.instancesService.create(createInstanceDto);
  }

  @Get()
  findAll() {
    return this.instancesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.instancesService.findOne(id);
  }

  @Get(':id/info')
  test(@Param() params: ParamIdDto) {
    return this.instancesService.info(params.id);
  }

  @Get(':id/containers')
  getContainers(@Param() params: ParamIdDto) {
    return this.instancesService.getContainers(params.id);
  }

  @Get(':id/hostports')
  hostPorts(@Param() params: ParamIdDto) {
    return this.instancesService.hostPorts(params.id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInstanceDto: UpdateInstanceDto) {
    return this.instancesService.update(id, updateInstanceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.instancesService.remove(id);
  }
}
