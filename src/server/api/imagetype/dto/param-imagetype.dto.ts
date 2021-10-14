import { IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ImageTypeParamDto {
  @ApiProperty()
  @IsUUID()
  imageType: string;
}
