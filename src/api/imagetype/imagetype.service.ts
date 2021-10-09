import { Injectable } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateImagetypeDto } from './dto/create-imagetype.dto';
import { UpdateImagetypeDto } from './dto/update-imagetype.dto';
import { ImageTypeIdParamDto } from './dto/param-imagetype-id.dto';
import { ImageTypeEntity } from './entities/imagetype.entity';
import { MountEntity } from '../mount/entities/mount.entity';
import { ImageEntity } from '../image/entities/image.entity';
import { MyBaseEntity } from '../base/entities/base.enitity_tmpl';
import { EnvEntity } from '../env/entities/env.entity';

@Injectable()
export class ImagetypeService {
  constructor(
    @InjectRepository(ImageTypeEntity)
    private imageTypeRepository: Repository<ImageTypeEntity>,
  ) {
  }

  private getOne(id: Required<ImageTypeIdParamDto>['id']) {
    return this.imageTypeRepository.findOne(id);
  }

  async create(createImagetypeDto: CreateImagetypeDto): Promise<ImageTypeEntity> {
    const newImageType = new ImageTypeEntity();
    this.editOrCreateArrays(newImageType, createImagetypeDto, 'images', ImageEntity);
    this.editOrCreateArrays(newImageType, createImagetypeDto, 'mounts', MountEntity);
    this.editOrCreateArrays(newImageType, createImagetypeDto, 'envs', EnvEntity);
    Object.assign(newImageType, createImagetypeDto);
    await this.imageTypeRepository.save(newImageType);
    return this.getOne(newImageType.id);
  }

  findAll() {
    return `This action returns all imagetype`;
  }

  findOne(id: string): Promise<ImageTypeEntity> {
    return this.getOne(id);
  }

  private editOrCreateArrays(editOrCreateResource: ImageTypeEntity, editsOrCreates: UpdateImagetypeDto, fieldName: keyof ImageTypeEntity, ResType: typeof ImageEntity | typeof MountEntity | typeof EnvEntity): void {
    if (editsOrCreates[fieldName] && editsOrCreates[fieldName].length > 0) {
      Object.assign(editOrCreateResource, {
        [fieldName]: editsOrCreates[fieldName].map((image: string): ImageEntity | MountEntity | EnvEntity => {
          const imageEnt = new ResType();
          imageEnt.id = image;
          return imageEnt;
        }),
      });
      Reflect.deleteProperty(editsOrCreates, fieldName);
    }
  }

  async update(id: string, updateImagetypeDto: UpdateImagetypeDto): Promise<ImageTypeEntity> {
    const editResource = await this.getOne(id);
    this.editOrCreateArrays(editResource, updateImagetypeDto, 'images', ImageEntity);
    this.editOrCreateArrays(editResource, updateImagetypeDto, 'mounts', MountEntity);
    this.editOrCreateArrays(editResource, updateImagetypeDto, 'envs', EnvEntity);
    Object.assign(editResource, updateImagetypeDto);
    await this.imageTypeRepository.save(editResource);
    return this.getOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.imageTypeRepository.softDelete(id);
  }
}
