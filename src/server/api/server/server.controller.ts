import {
  Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as Docker from 'dockerode';

import { ApiTags } from '@nestjs/swagger';
import { ServerService } from './server.service';
import { CreateServerDto } from './dto/create-server.dto';
import { UpdateServerDto } from './dto/update-server.dto';
import { DockerService } from '../../docker/docker.service';
import { ServerEntity } from './entities/server.entity';

@Controller('server')
@ApiTags('Server')
export class ServerController {
  constructor(
    private readonly serverService: ServerService,
    private readonly dockerService: DockerService,
    @InjectRepository(ServerEntity)
    private readonly serverRepository: Repository<ServerEntity>,
  ) {}

  @Post()
  async create(@Body() createServerDto: CreateServerDto) {
    let currentServer: ServerEntity | undefined = await this.serverService.create(createServerDto);
    if (!currentServer) throw new NotFoundException(`Server ${createServerDto.id} not found`);
    currentServer = await this.serverRepository.findOne(currentServer.id, { relations: ['image', 'image.imageType', 'image.imageType.mounts', 'image.imageType.envs', 'instance'] });
    if (!currentServer) throw new NotFoundException(`Server ${createServerDto.id} not found`);
    const container = await this.dockerService.CreateContainer(currentServer);
    currentServer.containterId = container.id;
    currentServer = await this.serverRepository.save(currentServer);
    return currentServer;
  }

  @Post(':id/start')
  async start(@Param('id') id: string): Promise<any> /* Promise<Docker.ContainerStats> */ {
    return this.serverService.start(id);
  }

  @Post(':id/stop')
  async stop(@Param('id') id: string): Promise<any> /* Promise<Docker.ContainerStats> */ {
    return this.serverService.stop(id);
    // const currentServer: ServerEntity = await this.serverRepository.findOne(id, { relations: ['instance'] });
    //
    // try {
    //   return this.dockerService.GetContainerState(currentServer.instance.id, currentServer.containterId);
    // } catch (e) {
    //   return e;
    // }
    // // await this.dockerService.StopContainer(currentServer.instance.id, currentServer.containterId);
    // return this.dockerService.GetContainerState(currentServer.instance.id, currentServer.containterId);
  }

  @Get()
  findAll() {
    return this.serverService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.serverService.findOne(id);
  }

  @Get(':id/info')
  info(@Param('id') id: string) {
    return this.serverService.info(id);
  }

  @Get(':id/state')
  state(@Param('id') id: string) {
    return this.serverService.state(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateServerDto: UpdateServerDto) {
    return this.serverService.update(id, updateServerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.serverService.remove(id);
  }
}
