import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEnvDto } from './dto/create-env.dto';
import { UpdateEnvDto } from './dto/update-env.dto';
import { EnvEntity } from './entities/env.entity';
import { MountEntity } from '../mount/entities/mount.entity';
import { ImageTypeEntity } from '../imagetype/entities/imagetype.entity';
import { ImageTypeIdParamDto } from '../imagetype/dto/param-imagetype-id.dto';
import { ImageTypeParamDto } from '../imagetype/dto/param-imagetype.dto';

@Injectable()
export class EnvService {
  constructor(
    @InjectRepository(EnvEntity)
    private envRepository: Repository<EnvEntity>,
  ) {
    envRepository.createQueryBuilder('env').stream()
      .then((s) => s.on('data', (D) => console.log(D)));
  }

  private getOne(id: Required<ImageTypeIdParamDto>['id'], imageType: ImageTypeEntity) {
    return this.envRepository.findOne({ id, imageType });
  }

  async create(createEnvDto: CreateEnvDto, imageTypeParams: ImageTypeParamDto): Promise<EnvEntity | undefined> {
    const newEnvEntity = new EnvEntity();
    Object.assign(newEnvEntity, createEnvDto);
    const imageType = new ImageTypeEntity();
    newEnvEntity.imageType = imageType;
    imageType.id = imageTypeParams.imageType;
    await this.envRepository.save(newEnvEntity);
    return this.getOne(newEnvEntity.id, newEnvEntity.imageType);
  }

  findAll(imageTypeId: string): Promise<EnvEntity[]> {
    const imageType = new ImageTypeEntity();
    imageType.id = imageTypeId;
    return this.envRepository.find({ where: { imageType } });
  }

  findOne(imageTypeParams:ImageTypeIdParamDto): Promise<EnvEntity | undefined> {
    const imageType = new ImageTypeEntity();
    imageType.id = imageTypeParams.imageType;
    return this.getOne(imageTypeParams.id, imageType);
  }

  async update(imageTypeParams: ImageTypeIdParamDto, updateEnvDto: UpdateEnvDto): Promise<EnvEntity | undefined> {
    const imageType = new ImageTypeEntity();
    imageType.id = imageTypeParams.imageType;
    await this.envRepository.update({ imageType, id: imageTypeParams.id }, updateEnvDto);
    return this.getOne(imageTypeParams.id, imageType);
  }

  async remove(imageTypeParams: ImageTypeIdParamDto): Promise<EnvEntity | undefined> {
    const imageType = new ImageTypeEntity();
    imageType.id = imageTypeParams.imageType;
    await this.envRepository.delete({ imageType, id: imageTypeParams.id });
    return this.getOne(imageTypeParams.id, imageType);
  }
}
