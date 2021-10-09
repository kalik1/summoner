import {
  Equals, IsNumber, Max, Min,
} from 'class-validator';

export class CreateExternalPortDto {
  @Equals(undefined)
  id: never;

  @Equals(undefined)
  server: never;

  @IsNumber()
  @Min(1024)
  @Max(65534)
  serverPort: number;
}
