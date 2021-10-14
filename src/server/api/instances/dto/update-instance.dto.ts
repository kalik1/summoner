import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import {
  IsIn, IsNumber, IsString, Max, Min,
} from 'class-validator';
import { CreateInstanceDto } from './create-instance.dto';
import { DOCKER_PROTOCOLS } from '../../../constnats';

export class UpdateInstanceDto extends PartialType(CreateInstanceDto) {
  @ApiPropertyOptional({ default: 'mydockerinstance.unicorn-server.com' })
  @IsString()
  host?: string;

  @ApiPropertyOptional({ default: 12345 })
  @IsNumber()
  @Min(0)
  @Max(65535)
  port?: number;

  @ApiPropertyOptional({ enum: [DOCKER_PROTOCOLS] })
  @IsString()
  @IsIn(DOCKER_PROTOCOLS as unknown as string[])
  protocol?: typeof DOCKER_PROTOCOLS[number];

  @ApiPropertyOptional({ default: '/summoner/' })
  @IsString()
  baseMountPath?: string;
}
