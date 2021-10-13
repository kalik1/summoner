import { ApiProperty } from '@nestjs/swagger';
import {
  IsIn,
  IsNumber, IsString, Max, Min,
} from 'class-validator';
import { DOCKER_PROTOCOLS } from '../../../constnats';

export class CreateInstanceDto {
  @ApiProperty({ default: 'mydockerinstance.unicorn-server.com' })
  @IsString()
  host: string;

  @ApiProperty({ default: 12345 })
  @IsNumber()
  @Min(0)
  @Max(65535)
  port: number;

  @ApiProperty({ enum: [DOCKER_PROTOCOLS] })
  @IsString()
  @IsIn(DOCKER_PROTOCOLS as unknown as string[])
  protocol?: typeof DOCKER_PROTOCOLS[number];

  @ApiProperty({ default: '/summoner/' })
  @IsString()
  baseMountPath: string;
}
