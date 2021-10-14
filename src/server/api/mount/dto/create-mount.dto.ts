import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength } from 'class-validator';
import { CreateDto } from '../../base/dto/create.dto';

export class CreateMountDto extends CreateDto {
  @ApiProperty()
  @IsString()
  @MinLength(1)
  @MaxLength(1024)
  internalPath: string;

  @ApiProperty()
  @IsString()
  @MinLength(1)
  @MaxLength(1024)
  hostPath: string;
}
