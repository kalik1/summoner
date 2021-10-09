import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEnvDto } from './dto/create-env.dto';
import { UpdateEnvDto } from './dto/update-env.dto';
import { EnvEntity } from './entities/env.entity';
import { MountEntity } from '../mount/entities/mount.entity';
import { ImageTypeEntity } from '../imagetype/entities/imagetype.entity';
import { ImageTypeIdParamDto } from '../imagetype/dto/param-imagetype-id.dto';

@Injectable()
export class EnvService {
  constructor(
    @InjectRepository(EnvEntity)
    private envRepository: Repository<EnvEntity>,
  ) {
  }

  private getOne(id: Required<ImageTypeIdParamDto>['id'], imageType: ImageTypeEntity) {
    return this.envRepository.findOne({ id, imageType });
  }

  async create(createEnvDto: CreateEnvDto): Promise<EnvEntity> {
    const newEnvEntity = new MountEntity();
    Object.assign(newEnvEntity, createEnvDto);
    await this.envRepository.save(newEnvEntity);
    return this.getOne(newEnvEntity.id, newEnvEntity.imageType);
  }

  findAll(imageType: string): Promise<EnvEntity[]> {
    return this.envRepository.find({ where: { imageType } });
  }

  findOne(imageTypeParams:ImageTypeIdParamDto): Promise<EnvEntity> {
    const imageType = new ImageTypeEntity();
    imageType.id = imageTypeParams.imageType;
    return this.getOne(imageTypeParams.id, imageType);
  }

  async update(imageTypeParams:ImageTypeIdParamDto, updateEnvDto: UpdateEnvDto): Promise<EnvEntity> {
    const imageType = new ImageTypeEntity();
    imageType.id = imageTypeParams.imageType;
    await this.envRepository.update({ imageType, id: imageTypeParams.id }, updateEnvDto);
    return this.getOne(imageTypeParams.id, imageType);
  }

  async remove(imageTypeParams: ImageTypeIdParamDto): Promise<EnvEntity> {
    const imageType = new ImageTypeEntity();
    imageType.id = imageTypeParams.imageType;
    await this.envRepository.softDelete({ imageType, id: imageTypeParams.id });
    return this.getOne(imageTypeParams.id, imageType);
  }
}
