import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InstanceService } from './instance.service';
import { InstanceController } from './instance.controller';
import { InstanceEntity } from './entities/instance.entity';
import { DockerService } from '../../docker/docker.service';

@Module({
  imports: [TypeOrmModule.forFeature([InstanceEntity])],
  controllers: [InstanceController],
  providers: [InstanceService, DockerService],
})
export class InstanceModule {}
