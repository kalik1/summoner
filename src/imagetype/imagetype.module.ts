import { Module } from '@nestjs/common';
import { ImagetypeService } from './imagetype.service';
import { ImagetypeController } from './imagetype.controller';

@Module({
  controllers: [ImagetypeController],
  providers: [ImagetypeService]
})
export class ImagetypeModule {}
