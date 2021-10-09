import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { IsArray, IsUUID } from 'class-validator';
import { CreateImagetypeDto } from './create-imagetype.dto';

export class UpdateImagetypeDto {
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
