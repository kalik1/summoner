import {
  Equals, IsNumber, IsOptional, IsString, Max, Min, Validate,
} from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { UpdateDto } from '../../base/dto/update.dto';
import { IdAssignerTransformer } from '../../../components/id-assigner.transform.ts/id-assigner.transformer';
import { ImageEntity } from '../../image/entities/image.entity';
import { InstanceEntity } from '../../instances/entities/instance.entity';
import { ResourceUUID } from '../../../components/reference-id.validator/reference-id-validator';

export class UpdateServerDto extends UpdateDto {
  @Equals(undefined)
  @IsOptional()
  id?: never;

  @Equals(undefined)
  @IsOptional()
  containterId?: never;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  cmd?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Validate(ResourceUUID)
  @Type(() => ImageEntity)
  @Transform(IdAssignerTransformer(ImageEntity))
  image?: ImageEntity;

  @ApiPropertyOptional()
  @Validate(ResourceUUID)
  @IsOptional()
  @Type(() => InstanceEntity)
  @Transform(IdAssignerTransformer(InstanceEntity))
  instance?: InstanceEntity;

  // @ApiPropertyOptional()
  // @Type(() => CreateHostPortDto)
  // @IsOptional()
  // managePort?: HostPortsEntity;
  //
  // @ApiPropertyOptional()
  // @Type(() => CreateHostPortDto)
  // @IsOptional()
  // serverPort?: HostPortsEntity;

  // @ApiProperty({ default: '27960/tcp' })
  // @IsString()
  // @IsPortAndProto()
  // @IsOptional()
  // @Transform(serverPortTransformer(), { toClassOnly: true })
  // serverPort: string;
  //
  // @ApiProperty({ default: '28960/tcp' })
  // @IsString()
  // @IsOptional()
  // @IsPortAndProto()
  // @Transform(serverPortTransformer(), { toClassOnly: true })
  // managePort: string;

  @ApiPropertyOptional({ default: 28960 })
  @Min(1024)
  @Max(65534)
  @IsNumber()
  @IsOptional()
  serverPort?: number;

  @ApiPropertyOptional({ default: 28960 })
  @Min(1024)
  @Max(65534)
  @IsNumber()
  @IsOptional()
  managePort?: number;
}
