import { Module } from '@nestjs/common';
import { MountService } from './mount.service';
import { MountController } from './mount.controller';

@Module({
  controllers: [MountController],
  providers: [MountService]
})
export class MountModule {}
