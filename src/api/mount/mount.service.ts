import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMountDto } from './dto/create-mount.dto';
import { UpdateMountDto } from './dto/update-mount.dto';
import { MountEntity } from './entities/mount.entity';
import { ImageTypeEntity } from '../imagetype/entities/imagetype.entity';
import { ImageTypeIdParamDto } from '../imagetype/dto/param-imagetype-id.dto';

@Injectable()
export class MountService {
  constructor(
    @InjectRepository(MountEntity)
    private mountRepository: Repository<MountEntity>,
  ) {
  }

  private getOne(id: Required<ImageTypeIdParamDto>['id'], imageType: ImageTypeEntity) {
    return this.mountRepository.findOne({ id, imageType });
  }

  async create(createMountDto: CreateMountDto): Promise<MountEntity> {
    const newMountEntity = new MountEntity();
    Object.assign(newMountEntity, createMountDto);
    await this.mountRepository.save(newMountEntity);
    return this.getOne(newMountEntity.id, newMountEntity.imageType);
  }

  findAll(imageType: string): Promise<MountEntity[]> {
    return this.mountRepository.find({ where: { imageType } });
  }

  findOne(imageTypeParams:ImageTypeIdParamDto): Promise<MountEntity> {
    const imageType = new ImageTypeEntity();
    imageType.id = imageTypeParams.imageType;
    return this.getOne(imageTypeParams.id, imageType);
  }

  async update(imageTypeParams:ImageTypeIdParamDto, updateMountDto: UpdateMountDto): Promise<MountEntity> {
    const imageType = new ImageTypeEntity();
    imageType.id = imageTypeParams.imageType;
    await this.mountRepository.update({ imageType, id: imageTypeParams.id }, updateMountDto);
    return this.getOne(imageTypeParams.id, imageType);
  }

  async remove(imageTypeParams: ImageTypeIdParamDto): Promise<MountEntity> {
    const imageType = new ImageTypeEntity();
    imageType.id = imageTypeParams.imageType;
    await this.mountRepository.softDelete({ imageType, id: imageTypeParams.id });
    return this.getOne(imageTypeParams.id, imageType);
  }
}
