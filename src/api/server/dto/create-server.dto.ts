import {
  Equals, IsNumber, IsString, IsUUID, Max, Min,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ServerEntity } from '../entities/server.entity';
import { CreateDto } from '../../base/dto/create.dto';
import { EntityToDtoNoIdAndTimeStamps } from '../../base/base.interfaces';
import { CreateExternalPortDto } from './create-external-port.dto';

type FacultativeProps = 'managePort';

type RequiredPropertiesT = Omit<EntityToDtoNoIdAndTimeStamps<ServerEntity>, FacultativeProps>;
type FacultativePropertiesT = Partial<Pick<EntityToDtoNoIdAndTimeStamps<ServerEntity>, FacultativeProps>>;

type RequiredPropertiesFilteredT = Omit<RequiredPropertiesT, 'managePort' | 'serverPort' >;
type FacultativePropertiesFilteredT = Omit<RequiredPropertiesT, 'managePort' | 'serverPort'>;

export class CreateServerDto extends CreateDto implements RequiredPropertiesFilteredT, FacultativePropertiesFilteredT {
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

  @Type(() => CreateExternalPortDto)
  managePort?: CreateExternalPortDto;

  @IsString()
  name: string;

  @IsNumber()
  @Min(1024)
  @Max(65534)
  port: number;

  @Type(() => CreateExternalPortDto)
  serverPort?: CreateExternalPortDto;
}
