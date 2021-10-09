import {
  Equals, IsNumber, IsString, IsUUID, Max, Min,
} from 'class-validator';
import { ServerEntity } from '../entities/server.entity';
import { CreateDto } from '../../base/dto/create.dto';
import { EntityToDtoNoIdAndTimeStamps } from '../../base/base.interfaces';

type FacultativeProps = 'managePort';

type RequiredPropertiesT = Omit<EntityToDtoNoIdAndTimeStamps<ServerEntity>, FacultativeProps>;
type FacultativePropertiesT = Partial<Pick<EntityToDtoNoIdAndTimeStamps<ServerEntity>, FacultativeProps>>;

export class CreateServerDto extends CreateDto implements Partial<RequiredPropertiesT>, FacultativePropertiesT {
  @Equals(undefined)
  id: never;

  @Equals(undefined)
  containterId: never;

  @IsUUID()
  owner: string;

  @IsUUID()
  image: string;

  @IsUUID()
  instance: string;

  @IsUUID()
  user: string;

  @IsNumber()
  @Min(1024)
  @Max(65534)
  managePort?: string;

  @IsString()
  name: string;

  @IsNumber()
  @Min(1024)
  @Max(65534)
  port: number;

  @IsNumber()
  @Min(1024)
  @Max(65534)
  serverPort: string;
}
