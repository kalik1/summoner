import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import {
  IsArray, IsIn, IsOptional, IsUUID,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { CreateImagetypeDto } from './create-imagetype.dto';
import { IdAssignerTransformer } from '../../../components/id-assigner.transform.ts/id-assigner.transformer';
import { ImageEntity } from '../../image/entities/image.entity';
import { MountEntity } from '../../mount/entities/mount.entity';
import { EnvEntity } from '../../env/entities/env.entity';
import { IMAGE_TYPES } from '../entities/imagetype.entity';

export class UpdateImagetypeDto {
  @ApiPropertyOptional({ enum: [IMAGE_TYPES] })
  @IsIn(IMAGE_TYPES)
  imageType: typeof IMAGE_TYPES[number];

  // @ApiPropertyOptional({ default: ['UUID1', 'UUID2', '...'] })
  // @IsOptional()
  // @IsUUID(undefined, { each: true })
  // @IsArray()
  // @Transform(IdAssignerTransformer(ImageEntity))
  // images: ImageEntity[];
  //
  // @ApiPropertyOptional({ default: ['UUID1', 'UUID2', '...'] })
  // @IsOptional()
  // @IsUUID(undefined, { each: true })
  // @IsArray()
  // @Transform(IdAssignerTransformer(MountEntity))
  // mounts: MountEntity[];
  //
  // @ApiPropertyOptional({ default: ['UUID1', 'UUID2', '...'] })
  // @IsOptional()
  // @IsUUID(undefined, { each: true })
  // @IsArray()
  // @Transform(IdAssignerTransformer(EnvEntity))
  // envs: EnvEntity[];
}
