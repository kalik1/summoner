import { Injectable } from '@nestjs/common';
import { CreateImagetypeDto } from './dto/create-imagetype.dto';
import { UpdateImagetypeDto } from './dto/update-imagetype.dto';

@Injectable()
export class ImagetypeService {
  create(createImagetypeDto: CreateImagetypeDto) {
    return 'This action adds a new imagetype';
  }

  findAll() {
    return `This action returns all imagetype`;
  }

  findOne(id: number) {
    return `This action returns a #${id} imagetype`;
  }

  update(id: number, updateImagetypeDto: UpdateImagetypeDto) {
    return `This action updates a #${id} imagetype`;
  }

  remove(id: number) {
    return `This action removes a #${id} imagetype`;
  }
}
