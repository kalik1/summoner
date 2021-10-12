import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InstancesService } from './instances.service';
import { InstancesController } from './instances.controller';
import { InstanceEntity } from './entities/instance.entity';

@Module({
  imports: [TypeOrmModule.forFeature([InstanceEntity])],
  controllers: [InstancesController],
  providers: [InstancesService],
})
export class InstancesModule {}
