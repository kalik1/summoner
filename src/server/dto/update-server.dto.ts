import { EntityToDtoNoIdAndTimeStamps } from '../../base/base.interfaces';
import { ServerEntity } from '../entities/server.entity';
import { UpdateDto } from '../../base/dto/update.dto';

type RequiredProps = never;

type RequiredPropertiesT = Required<Pick<EntityToDtoNoIdAndTimeStamps<ServerEntity>, RequiredProps>>;
type FacultativePropertiesT = Partial<Omit<EntityToDtoNoIdAndTimeStamps<ServerEntity>, RequiredProps>>;

export class UpdateServerDto extends UpdateDto implements RequiredPropertiesT, FacultativePropertiesT {
  containterId?: never;

  owner?: string;

  image?: string;

  instance?: string;

  managePort?: string;

  name?: string;

  port?: number;

  serverPort?: string;
}
