import { IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ParamIdDto {
  @ApiProperty()
  @IsUUID()
  id: string;
}
