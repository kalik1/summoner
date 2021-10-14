import {
  Equals, IsNumber, IsOptional, IsString, Max, Min, Validate,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { CreateDto } from '../../base/dto/create.dto';
import { ImageEntity } from '../../image/entities/image.entity';
import { IdAssignerTransformer } from '../../../components/id-assigner.transform.ts/id-assigner.transformer';
import { InstanceEntity } from '../../instances/entities/instance.entity';
import { ResourceUUID } from '../../../components/reference-id.validator/reference-id-validator';

export class CreateServerDto extends CreateDto {
  @Equals(undefined)
  id: never;

  @Equals(undefined)
  containterId: never;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  cmd?: string;

  @ApiProperty({ default: 'UUID' })
  @Validate(ResourceUUID)
  @Type(() => ImageEntity)
  @Transform(IdAssignerTransformer(ImageEntity))
  image: ImageEntity;

  @ApiProperty({ default: 'UUID' })
  @Validate(ResourceUUID)
  @Type(() => InstanceEntity)
  @Transform(IdAssignerTransformer(InstanceEntity))
  instance: InstanceEntity;

  // @ApiProperty()
  // @Type(() => CreateHostPortDto)
  // managePort?: HostPortsEntity;
  //
  // @ApiProperty()
  // @Type(() => CreateHostPortDto)
  // serverPort?: HostPortsEntity;

  // @ApiProperty({ default: '27960/tcp' })
  // @IsString()
  // @IsPortAndProto()
  // @Transform(serverPortTransformer(), { toClassOnly: true })
  // serverPort: string;
  //
  // @ApiProperty({ default: '28960/tcp' })
  // @IsString()
  // @IsOptional()
  // @IsPortAndProto()
  // @Transform(serverPortTransformer(), { toClassOnly: true })
  // managePort: string;

  @ApiProperty({ default: 28960 })
  @Min(1024)
  @Max(65534)
  @IsNumber()
  serverPort: number;

  @ApiPropertyOptional({ default: 28960 })
  @Min(1024)
  @Max(65534)
  @IsNumber()
  @IsOptional()
  managePort?: number;
}
