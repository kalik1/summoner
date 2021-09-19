import { Injectable } from '@nestjs/common';
import { CreateMountDto } from './dto/create-mount.dto';
import { UpdateMountDto } from './dto/update-mount.dto';

@Injectable()
export class MountService {
  create(createMountDto: CreateMountDto) {
    return 'This action adds a new mount';
  }

  findAll() {
    return `This action returns all mount`;
  }

  findOne(id: number) {
    return `This action returns a #${id} mount`;
  }

  update(id: number, updateMountDto: UpdateMountDto) {
    return `This action updates a #${id} mount`;
  }

  remove(id: number) {
    return `This action removes a #${id} mount`;
  }
}
