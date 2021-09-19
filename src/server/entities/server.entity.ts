import {
  BaseEntity,
  Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn,
} from 'typeorm';
import { IsNumber, Max, Min } from 'class-validator';
import { UserEntity } from '../../user/entities/user.entity';
import { InstanceEntity } from '../../instances/entities/instance.entity';
import { ImageEntity } from '../../image/entities/image.entity';
import { ExternalPortsEntity } from './external-ports.entity';

@Entity()
export class ServerEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  containterId: string;

  @ManyToOne(() => UserEntity, (user: UserEntity) => user.servers)
  user: UserEntity;

  @ManyToOne(() => InstanceEntity, (instance: InstanceEntity) => instance.servers)
  instance: InstanceEntity;

  @Column('int4', { nullable: false })
  @IsNumber()
  @Min(0)
  @Max(65535)
  port: number;

  @ManyToOne(() => ImageEntity, (image: ImageEntity) => image.servers)
  image: ImageEntity;

  @OneToOne(() => ExternalPortsEntity, (externalPort) => externalPort.server)
  serverPort: ExternalPortsEntity;

  @OneToOne(() => ExternalPortsEntity, (externalPort) => externalPort.server)
  managePort: ExternalPortsEntity;
}
