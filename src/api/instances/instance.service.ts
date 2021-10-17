import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateInstanceDto } from './dto/create-instance.dto';
import { UpdateInstanceDto } from './dto/update-instance.dto';
import { InstanceEntity } from './entities/instance.entity';
import { DockerService } from '../../docker/docker.service';
import { ImageInfo } from 'dockerode';

@Injectable()
export class InstanceService {
  constructor(
    @InjectRepository(InstanceEntity)
    private instanceRepository: Repository<InstanceEntity>,
    private dockerService: DockerService,
  ) {
  }

  private getOne(id: InstanceEntity['id']) {
    return this.instanceRepository.findOne({ id });
  }

  async create(createInstanceDto: CreateInstanceDto): Promise<InstanceEntity> {
    const newInstanceEntity = new InstanceEntity();
    Object.assign(newInstanceEntity, createInstanceDto);
    await this.instanceRepository.save(newInstanceEntity);
    return this.getOne(newInstanceEntity.id);
  }

  async info(id: InstanceEntity['id']) {
    const instance = await this.getOne(id);
    return this.dockerService.Info(instance);
  }

  async getContainers(id: InstanceEntity['id']) {
    const instance = await this.getOne(id);
    return this.dockerService.getContainers(instance);
  }

  async getImages(id: InstanceEntity['id']): Promise<ImageInfo[]> {
    const instance = await this.getOne(id);
    return this.dockerService.getImages(instance);
  }

  async hostPorts(id: InstanceEntity['id']) {
    const instance = await this.getOne(id);
    return this.dockerService.getUsedHostPorts(instance);
  }

  findAll(): Promise<InstanceEntity[]> {
    return this.instanceRepository.find();
  }

  findOne(id: InstanceEntity['id']): Promise<InstanceEntity> {
    return this.getOne(id);
  }

  async update(id: InstanceEntity['id'], updateInstanceDto: UpdateInstanceDto): Promise<InstanceEntity> {
    await this.instanceRepository.update({ id }, updateInstanceDto);
    return this.getOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.instanceRepository.delete({ id });
  }
}
