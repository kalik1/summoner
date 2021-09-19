import { Injectable } from '@nestjs/common';
import { CreateEnvDto } from './dto/create-env.dto';
import { UpdateEnvDto } from './dto/update-env.dto';

@Injectable()
export class EnvService {
  create(createEnvDto: CreateEnvDto) {
    return 'This action adds a new env';
  }

  findAll() {
    return `This action returns all env`;
  }

  findOne(id: number) {
    return `This action returns a #${id} env`;
  }

  update(id: number, updateEnvDto: UpdateEnvDto) {
    return `This action updates a #${id} env`;
  }

  remove(id: number) {
    return `This action removes a #${id} env`;
  }
}
