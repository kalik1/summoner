import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { ImageEntity } from './entities/image.entity';
import { ServerEntity } from '../server/entities/server.entity';

@Injectable()
export class ImageService {
  constructor(
    @InjectRepository(ImageEntity)
    private imageRepository: Repository<ImageEntity>,
  ) {
  }

  private editOrCreateArrays(
    editOrCreateResource: ImageEntity,
    editsOrCreates: UpdateImageDto,
    fieldName: keyof ImageEntity,
    ResType: typeof ServerEntity,
  ): void {
    if (editsOrCreates[fieldName] && editsOrCreates[fieldName].length > 0) {
      Object.assign(editOrCreateResource, {
        [fieldName]: editsOrCreates[fieldName].map((image: string): ServerEntity => {
          const imageEnt = new ResType();
          imageEnt.id = image;
          return imageEnt;
        }),
      });
      Reflect.deleteProperty(editsOrCreates, fieldName);
    }
  }

  private getOne(id: string) {
    return this.imageRepository.findOne(id);
  }

  async create(createImageDto: CreateImageDto): Promise<ImageEntity> {
    const newImage = new ImageEntity();
    this.editOrCreateArrays(newImage, createImageDto, 'servers', ServerEntity);
    Object.assign(newImage, createImageDto);
    await this.imageRepository.save(newImage);
    return this.getOne(newImage.id);
  }

  findAll(): Promise<ImageEntity[]> {
    return this.imageRepository.find();
  }

  findOne(id: string): Promise<ImageEntity> {
    return this.getOne(id);
  }

  async update(id: string, updateImageDto: UpdateImageDto): Promise<ImageEntity> {
    const newImage = await this.getOne(id);
    this.editOrCreateArrays(newImage, updateImageDto, 'servers', ServerEntity);
    Object.assign(newImage, updateImageDto);
    await this.imageRepository.save(newImage);
    return this.getOne(newImage.id);
  }

  async remove(id: string): Promise<void> {
    await this.imageRepository.delete(id);
  }
}
