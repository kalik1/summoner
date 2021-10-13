import {
  Column, Entity, ManyToOne
} from 'typeorm';
import { UserEntity } from '../../user/entities/user.entity';
import { InstanceEntity } from '../../instances/entities/instance.entity';
import { ImageEntity } from '../../image/entities/image.entity';
import { MyBaseEntity } from '../../base/entities/base.enitity_tmpl';

@Entity()
export class ServerEntity extends MyBaseEntity {
  @Column()
  name: string;

  @Column({ nullable: true })
  containterId?: string;

  @Column({ nullable: true })
  cmd?: string;

  @ManyToOne(() => UserEntity, (user: UserEntity) => user.servers, { nullable: true })
  user: UserEntity;

  @ManyToOne(() => InstanceEntity, (instance: InstanceEntity) => instance.servers)
  instance: InstanceEntity;

  @ManyToOne(() => ImageEntity, (image: ImageEntity) => image.servers)
  image: ImageEntity;

  // @OneToOne(() => HostPortsEntity, (externalPort) => externalPort.server)
  // serverPort: HostPortsEntity;
  //
  // @OneToOne(() => HostPortsEntity, (externalPort) => externalPort.server)
  // managePort?: HostPortsEntity;

  @Column('int4')
  serverPort: number;

  @Column('text', { nullable: true })
  managePort: number;
}
