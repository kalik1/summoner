import { Injectable, NotFoundException } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateImagetypeDto } from './dto/create-imagetype.dto';
import { UpdateImagetypeDto } from './dto/update-imagetype.dto';
import { ImageTypeIdParamDto } from './dto/param-imagetype-id.dto';
import { ImageTypeEntity } from './entities/imagetype.entity';
import { MountEntity } from '../mount/entities/mount.entity';
import { ImageEntity } from '../image/entities/image.entity';
import { EnvEntity } from '../env/entities/env.entity';

@Injectable()
export class ImagetypeService {
  constructor(
    @InjectRepository(ImageTypeEntity)
    private imageTypeRepository: Repository<ImageTypeEntity>,
  ) {
  }

  private editOrCreateArrays(
    editOrCreateResource: ImageTypeEntity,
    editsOrCreates: UpdateImagetypeDto,
    fieldName: keyof ImageTypeEntity,
    ResType: typeof ImageEntity | typeof MountEntity | typeof EnvEntity,
  ): void {
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

  private getOne(id: Required<ImageTypeIdParamDto>['id']) {
    return this.imageTypeRepository.findOne(id, { relations: ['images', 'mounts', 'envs'] });
  }

  async create(createImagetypeDto: CreateImagetypeDto): Promise<ImageTypeEntity | undefined> {
    const newImageType = new ImageTypeEntity();
    // this.editOrCreateArrays(newImageType, createImagetypeDto, 'images', ImageEntity);
    // this.editOrCreateArrays(newImageType, createImagetypeDto, 'mounts', MountEntity);
    // this.editOrCreateArrays(newImageType, createImagetypeDto, 'envs', EnvEntity);
    Object.assign(newImageType, createImagetypeDto);
    await this.imageTypeRepository.save(newImageType);
    return this.getOne(newImageType.id);
  }

  findAll(): Promise<ImageTypeEntity[]> {
    return this.imageTypeRepository.find({ relations: ['images', 'mounts', 'envs'] });
  }

  findOne(id: string): Promise<ImageTypeEntity | undefined> {
    return this.getOne(id);
  }

  async update(id: string, updateImagetypeDto: UpdateImagetypeDto): Promise<ImageTypeEntity | undefined> {
    const editResource = await this.getOne(id);
    if (!editResource) throw new NotFoundException(`ImageTypeEntity ${id} not found`);
    // this.editOrCreateArrays(editResource, updateImagetypeDto, 'images', ImageEntity);
    // this.editOrCreateArrays(editResource, updateImagetypeDto, 'mounts', MountEntity);
    // this.editOrCreateArrays(editResource, updateImagetypeDto, 'envs', EnvEntity);
    Object.assign(editResource, updateImagetypeDto);
    await this.imageTypeRepository.save(editResource);
    return this.getOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.imageTypeRepository.delete(id);
  }
}
