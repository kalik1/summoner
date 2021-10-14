import { IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ImageTypeIdParamDto {
  @ApiProperty()
  @IsUUID()
  id: string;

  @ApiProperty()
  @IsUUID()
  imageType: string;
}
