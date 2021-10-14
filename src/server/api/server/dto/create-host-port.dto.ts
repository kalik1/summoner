import {
  Equals, IsNumber, Max, Min,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateHostPortDto {

  @Equals(undefined)
  id: never;

  @Equals(undefined)
  server: never;

  @ApiProperty()
  @IsNumber()
  @Min(1024)
  @Max(65534)
  serverPort: number;
}
