import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { CreateImageDto } from './create-image.dto';
import { IsPortAndProto } from '../../../components/server-proto.class-validator/server-proto.class-validator';
import { serverPortTransformer } from '../../../components/server-proto.class-transformer/server-proto.class-transformer';

export class UpdateImageDto extends PartialType(CreateImageDto) {
  @ApiPropertyOptional({ default: 'baseq3/baseq3:latest' })
  @IsString()
  @IsOptional()
  imageName?: string;

  @ApiPropertyOptional({ default: '27960/tcp' })
  @IsString()
  @IsPortAndProto()
  @Transform(serverPortTransformer(), { toClassOnly: true })
  @IsOptional()
  serverPort?: string;

  @ApiProperty({ default: '28960/tcp' })
  @IsString()
  @IsOptional()
  @IsPortAndProto()
  @Transform(serverPortTransformer(), { toClassOnly: true })
  managePort?: string;
}
