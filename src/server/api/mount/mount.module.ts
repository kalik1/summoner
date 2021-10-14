import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MountService } from './mount.service';
import { MountController } from './mount.controller';
import { MountEntity } from './entities/mount.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MountEntity])],
  controllers: [MountController],
  providers: [MountService],
})
export class MountModule {}
