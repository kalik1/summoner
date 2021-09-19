import { FindConditions, Repository } from 'typeorm';
import { FindOneOptions } from 'typeorm/find-options/FindOneOptions';
import { validateOrReject } from 'class-validator';
import { CreateDto } from './dto/create.dto';
import { MyBaseEntity } from './entities/base.enitity_tmpl';
import { UpdateDto } from './dto/update.dto';

interface CRU<K extends CreateDto, J extends UpdateDto> {
  CREATE: K
  UPDATE: J
}

export abstract class BaseEntityService<K extends typeof MyBaseEntity, J extends CRU<CreateDto, UpdateDto>> {
  protected constructor(
    private readonly repo: Repository<InstanceType<K>>,
    private readonly Entity: K,
  ) { }

  getOne(id: InstanceType<K>['id'], options?: FindOneOptions<InstanceType<K>>): Promise<InstanceType<K>> {
    return this.repo.findOne(id, options);
  }

  getMany(options?: FindConditions<InstanceType<K>>): Promise<InstanceType<K>[]> {
    return this.repo.find(options);
  }

  async create(createResDto: J['CREATE']): Promise<InstanceType<K>> {
    const newRes = new this.Entity();
    Object.assign(newRes, createResDto);
    await validateOrReject(newRes);
    await this.repo.save(newRes as never);
    return newRes as InstanceType<K>;
  }

  findAll(options?: FindConditions<InstanceType<K>>): Promise<InstanceType<K>[]> {
    return this.getMany(options);
  }

  findOne(id: string, options?: FindOneOptions<InstanceType<K>>): Promise<InstanceType<K>> {
    return this.getOne(id, options);
  }

  async update(id: string, updateServerDto: J['UPDATE']): Promise<InstanceType<K> | null> {
    const newRes = await this.getOne(id);
    if (!newRes) return null;
    Object.assign(newRes, updateServerDto);
    await validateOrReject(newRes);
    await this.repo.save(newRes as never);
    return newRes as InstanceType<K>;
  }

  async remove(id: string): Promise<InstanceType<K>> {
    const remRes = await this.getOne(id);
    return this.repo.remove(remRes);
  }
}
