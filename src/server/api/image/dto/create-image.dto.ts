import { Transform, Type } from 'class-transformer';
import { IsOptional, IsString, Validate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsPortAndProto } from '../../../components/server-proto.class-validator/server-proto.class-validator';
import { serverPortTransformer } from '../../../components/server-proto.class-transformer/server-proto.class-transformer';
import { ResourceUUID } from '../../../components/reference-id.validator/reference-id-validator';
import { InstanceEntity } from '../../instances/entities/instance.entity';
import { IdAssignerTransformer } from '../../../components/id-assigner.transform.ts/id-assigner.transformer';
import { ImageTypeEntity } from '../../imagetype/entities/imagetype.entity';

export class CreateImageDto {
  @ApiProperty({ default: 'baseq3/baseq3:latest' })
  @IsString()
  imageName: string;

  @ApiProperty({ default: '27960/tcp' })
  @IsString()
  @IsPortAndProto()
  @Transform(serverPortTransformer(), { toClassOnly: true })
  serverPort: string;

  @ApiProperty({ default: 'UUID' })
  @Validate(ResourceUUID)
  @Type(() => ImageTypeEntity)
  @Transform(IdAssignerTransformer(ImageTypeEntity))
  imageType: ImageTypeEntity;

  @ApiProperty({ default: '28960/tcp' })
  @IsString()
  @IsOptional()
  @IsPortAndProto()
  @Transform(serverPortTransformer(), { toClassOnly: true })
  managePort: string;
}
