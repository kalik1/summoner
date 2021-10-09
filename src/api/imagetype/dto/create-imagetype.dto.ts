import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsIn, IsUUID } from 'class-validator';
import { IMAGE_TYPES } from '../entities/imagetype.entity';

export class CreateImagetypeDto {
  @ApiProperty({ enum: IMAGE_TYPES })
  @IsIn(IMAGE_TYPES)
  imageType: typeof IMAGE_TYPES[number];

  @ApiPropertyOptional({ enum: [['UUID', '...']] })
  @IsUUID(undefined, { each: true })
  @IsArray()
  images: string[];

  @ApiPropertyOptional({ enum: [['UUID', '...']] })
  @IsUUID(undefined, { each: true })
  @IsArray()
  mounts: string[];

  @ApiPropertyOptional({ enum: [['UUID', '...']] })
  @IsUUID(undefined, { each: true })
  @IsArray()
  envs: string[];
}
