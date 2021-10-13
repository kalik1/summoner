import {
  Column,
  Entity, Index, JoinColumn, OneToOne, PrimaryGeneratedColumn,
} from 'typeorm';
import { Transform } from 'class-transformer';
import { ServerEntity } from './server.entity';
import { MyBaseEntity } from '../../base/entities/base.enitity_tmpl';
import { IsPortAndProto } from '../../../components/server-proto.class-validator/server-proto.class-validator';
import { serverPortTransformer } from '../../../components/server-proto.class-transformer/server-proto.class-transformer';

@Entity()
@Index(['externalPort', 'server'], { unique: true })

export class HostPortsEntity extends MyBaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => ServerEntity, (server: ServerEntity) => server.serverPort)
  @JoinColumn()
  server: ServerEntity;

  @Column('text')
  externalPort: number;
}
