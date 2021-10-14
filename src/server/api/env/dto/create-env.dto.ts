import { ApiProperty } from '@nestjs/swagger';
import {
  IsString, MaxLength, MinLength,
} from 'class-validator';

export class CreateEnvDto {
  @ApiProperty()
  @IsString()
  @MinLength(3)
  @MaxLength(300)
  name: string;

  @ApiProperty()
  @IsString()
  @MinLength(3)
  @MaxLength(3000)
  value: string;
}
