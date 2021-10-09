import {
  Body, Controller, Delete, Get, Param, Patch, Post,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as Docker from 'dockerode';

import { ServerService } from './server.service';
import { CreateServerDto } from './dto/create-server.dto';
import { UpdateServerDto } from './dto/update-server.dto';
import { DockerService } from '../../docker/docker.service';
import { ServerEntity } from './entities/server.entity';

@Controller('server')
export class ServerController {
  constructor(
    private readonly serverService: ServerService,
    private readonly dockerService: DockerService,
    @InjectRepository(ServerEntity)
    private readonly serverRepository: Repository<ServerEntity>,
  ) {}

  @Post()
  async create(@Body() createServerDto: CreateServerDto) {
    let currentServer: ServerEntity = await this.serverService.create(createServerDto);
    currentServer = await this.serverRepository.findOne(currentServer.id, { relations: ['image', 'imageType', 'imageType.mounts', 'instance', 'serverPort', 'managePort'] });

    const container = await this.dockerService.CreateContainer(currentServer);
    currentServer.containterId = container.id;
    currentServer = await this.serverRepository.save(currentServer);
    return currentServer;
  }

  @Post(':id/start')
  async start(@Param('id') id: string): Promise<Docker.ContainerStats> {
    const currentServer: ServerEntity = await this.serverRepository.findOne(id, { relations: ['instance'] });
    await this.dockerService.StartContainer(currentServer.instance.id, currentServer.containterId);
    return this.dockerService.GetContainerStatus(currentServer.instance.id, currentServer.containterId);
  }

  @Post(':id/stop')
  async stop(@Param('id') id: string): Promise<Docker.ContainerStats> {
    const currentServer: ServerEntity = await this.serverRepository.findOne(id, { relations: ['instance'] });
    await this.dockerService.StopContainer(currentServer.instance.id, currentServer.containterId);
    return this.dockerService.GetContainerStatus(currentServer.instance.id, currentServer.containterId);
  }

  @Get()
  findAll() {
    return this.serverService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.serverService.findOne(id);
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
