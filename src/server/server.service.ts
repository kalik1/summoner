import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ServerEntity } from './entities/server.entity';
import { BaseEntityService } from '../base/base.service';
import { CreateDto } from '../base/dto/create.dto';
import { UpdateDto } from '../base/dto/update.dto';

interface ServerCru {
  CREATE: CreateDto
  UPDATE: UpdateDto
}

@Injectable()
export class ServerService extends BaseEntityService<typeof ServerEntity, ServerCru> {
  constructor(
    @InjectRepository(ServerEntity)
    private readonly serverRepository: Repository<ServerEntity>,
  ) {
    super(serverRepository, ServerEntity);
  }

  start() {

  }
}
