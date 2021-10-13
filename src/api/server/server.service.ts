import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContainerInspectInfo } from 'dockerode';
import { CreateServerDto } from './dto/create-server.dto';
import { UpdateServerDto } from './dto/update-server.dto';
import { ServerEntity } from './entities/server.entity';
import { DockerService } from '../../docker/docker.service';

@Injectable()
export class ServerService {
  constructor(
    @InjectRepository(ServerEntity)
    private serverRepository: Repository<ServerEntity>,
    private dockerService: DockerService,
  ) {
  }

  private getOne(id: ServerEntity['id']) {
    return this.serverRepository.createQueryBuilder('server')
      .leftJoinAndSelect('server.instance', 'instance')
      .leftJoinAndSelect('server.image', 'image')
      .where('server.id = :id', { id })
      .getOne();
    // return this.serverRepository.findOne({ id }, );
  }

  async create(createServerDto: CreateServerDto): Promise<ServerEntity> {
    const newServerEntity = new ServerEntity();
    Object.assign(newServerEntity, createServerDto);
    await this.serverRepository.save(newServerEntity);
    return this.getOne(newServerEntity.id);
  }

  async stop(id: ServerEntity['id']) {
    const currentServer: ServerEntity = await this.serverRepository.findOne(id, { relations: ['instance'] });
    const currentInstanceName = this.dockerService.GetOrStartClientFromInstance(currentServer.instance);
    await this.dockerService.StopContainer(currentInstanceName, currentServer.containterId);
    return this.dockerService.GetContainerState(currentInstanceName, currentServer.containterId);
  }

  async start(id: ServerEntity['id']) {
    const currentServer: ServerEntity = await this.serverRepository.findOne(id, {
      relations: [
        'instance',
        'image',
        'image.imageType',
        'image.imageType.mounts',
        'image.imageType.envs',
      ],
    });

    let currentContainer;
    const currentInstanceName = this.dockerService.GetOrStartClientFromInstance(currentServer.instance);

    try {
      currentContainer = await this.dockerService.InspectContainer(currentInstanceName, currentServer.containterId);
    } catch (e) {
      currentContainer = undefined;
    }

    if (currentContainer) {
      const currentContainerStatus = await this.dockerService.GetContainerState(currentInstanceName, currentContainer.Id);
      if (['running', 'creating'].includes(currentContainerStatus.Status)) {
        throw new BadRequestException('Container Already Running');
      }
    }
    
    await this.ValidatePorts(currentServer);

    if (currentServer.containterId) {
      try {
        currentContainer = await this.dockerService.InspectContainer(currentInstanceName, currentServer.containterId);
      } catch (e) {
        // ho il contaner rimasto orfano con in id sbagliato...
        try {
          const testCurrentContainer = await this.dockerService
            .findOrphanByName(
              currentInstanceName, this.dockerService.getName(currentServer.id),
            ) as unknown as { name: string };
          if (testCurrentContainer && testCurrentContainer.name) {
            currentServer.containterId = currentContainer.id;
            await this.serverRepository.save(currentServer);
          }
        } catch (e1) {
          // console.log(e1);
        }
        // console.log(e);
      }
    }
    console.log('qui ci sono...');
    if (!currentContainer) {
      currentContainer = await this.dockerService.CreateContainer(currentServer);
      console.log(currentContainer);
      currentServer.containterId = currentContainer.id;
      await this.serverRepository.save(currentServer);
    }
    try {
      await this.dockerService.StartContainer(currentInstanceName, currentServer.containterId);
    } catch (e) {
      // throw new UnprocessableEntityException(e?.message || e);
    }

    return this.dockerService.InspectContainer(currentInstanceName, currentServer.containterId);
  }

  private async ValidatePorts(currentServer: ServerEntity) {
    const usedPorts = await this.dockerService.getUsedHostPorts(currentServer.instance);
    if (usedPorts.includes(`0.0.0.0/${currentServer.serverPort}/${(currentServer.image.serverPort.split('/')[1]) ?? 'tcp'}`)) {
      throw new BadRequestException(`Host Port ${currentServer.serverPort} in Alread In Use. Please use another server port.`);
    }

    if (currentServer.managePort && usedPorts.includes(`0.0.0.0/${currentServer.managePort}/${(currentServer.image.managePort?.split('/')[1]) ?? 'tcp'}`)) {
      throw new BadRequestException(`Host Port ${currentServer.managePort} in Alread In Use. Please use another server manage port.`);
    }
  }

  findAll(): Promise<ServerEntity[]> {
    return this.serverRepository.find({ relations: ['instance', 'image'] });
  }

  findOne(id: ServerEntity['id']): Promise<ServerEntity> {
    return this.getOne(id);
  }

  async info(id: ServerEntity['id']): Promise<ContainerInspectInfo> {
    const currentServer: ServerEntity = await this.serverRepository.findOne(id, { relations: ['instance'] });
    const currentInstanceName = await this.dockerService.GetOrStartClientFromInstance(currentServer.instance);
    return this.dockerService.InspectContainer(currentInstanceName, currentServer.containterId);
  }

  async state(id: ServerEntity['id']): Promise<ContainerInspectInfo['State']> {
    const currentServer: ServerEntity = await this.serverRepository.findOne(id, { relations: ['instance'] });
    const currentInstanceName = await this.dockerService.GetOrStartClientFromInstance(currentServer.instance);
    return this.dockerService.GetContainerState(currentInstanceName, currentServer.containterId);
  }

  async update(id: ServerEntity['id'], updateServerDto: UpdateServerDto): Promise<ServerEntity> {
    console.log(updateServerDto);
    await this.serverRepository.update({ id }, updateServerDto);
    return this.getOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.serverRepository.delete({ id });
  }
}
