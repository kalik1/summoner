import { ServerEntity } from '../entities/server.entity';
import { CreateDto } from '../../base/dto/create.dto';
import { EntityToDtoNoIdAndTimeStamps } from '../../base/base.interfaces';

type FacultativeProps = 'managePort';

type RequiredPropertiesT = Omit<EntityToDtoNoIdAndTimeStamps<ServerEntity>, FacultativeProps>;
type FacultativePropertiesT = Partial<Pick<EntityToDtoNoIdAndTimeStamps<ServerEntity>, FacultativeProps>>;

export class CreateServerDto extends CreateDto implements RequiredPropertiesT, FacultativePropertiesT {

  containterId: never;

  owner: string;

  image: string ;

  instance: string;

  user: string;

  managePort?: string;

  name: string;

  port: number;

  serverPort: string;
}
