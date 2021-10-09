import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImagetypeService } from './imagetype.service';
import { ImagetypeController } from './imagetype.controller';
import { ImageTypeEntity } from './entities/imagetype.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ImageTypeEntity])],
  controllers: [ImagetypeController],
  providers: [ImagetypeService],
})
export class ImagetypeModule {}
