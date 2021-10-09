import {

  Column, Entity, Index, JoinColumn, OneToOne, PrimaryGeneratedColumn,
} from 'typeorm';
import { IsNumber, Max, Min } from 'class-validator';
import { ServerEntity } from './server.entity';
import { MyBaseEntity } from '../../base/entities/base.enitity_tmpl';

@Entity()
@Index(['externalPort', 'server'], { unique: true })

export class ExternalPortsEntity extends MyBaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => ServerEntity, (server: ServerEntity) => server.serverPort)
  @JoinColumn()
  server: ServerEntity;

  @Column('int4', { nullable: false })
  @IsNumber()
  @Min(0)
  @Max(65535)
  externalPort: number;
}
