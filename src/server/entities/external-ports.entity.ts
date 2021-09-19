import {
  BaseEntity,
  Column, Entity, Index, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn,
} from 'typeorm';
import { IsNumber, Max, Min } from 'class-validator';
import { UserEntity } from '../../user/entities/user.entity';
import { InstanceEntity } from '../../instances/entities/instance.entity';
import { ImageEntity } from '../../image/entities/image.entity';
import { ServerEntity } from './server.entity';

@Entity()
@Index(['externalPort', 'server'], { unique: true })

export class ExternalPortsEntity extends BaseEntity {
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
