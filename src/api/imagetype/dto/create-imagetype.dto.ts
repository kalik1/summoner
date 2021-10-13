import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsIn, IsOptional, IsUUID } from 'class-validator';
import { IMAGE_TYPES } from '../entities/imagetype.entity';
import { Transform } from 'class-transformer';
import { IdAssignerTransformer } from '../../../components/id-assigner.transform.ts/id-assigner.transformer';
import { MountEntity } from '../../mount/entities/mount.entity';
import { EnvEntity } from '../../env/entities/env.entity';
import { ImageEntity } from '../../image/entities/image.entity';

export class CreateImagetypeDto {
  @ApiProperty({ enum: [IMAGE_TYPES.join(' | ')] })
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
