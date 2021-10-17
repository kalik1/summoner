import {
  Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn,
} from 'typeorm';
import {
  IsIn, IsNumber, Max, Min,
} from 'class-validator';
// eslint-disable-next-line import/no-cycle
// eslint-disable-next-line import/no-cycle
import { UserEntity } from '../../user/entities/user.entity';
import { MyBaseEntity } from '../../base/entities/base.enitity_tmpl';
import { ServerEntity } from '../../server/entities/server.entity';
import { DOCKER_PROTOCOLS, INSTANCE_TYPES } from '../../../constnats';

@Entity()
export class InstanceEntity extends MyBaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(() => ServerEntity, (server: ServerEntity) => server.instance)
  servers: ServerEntity[];

  @Column({ unique: true, nullable: false})
  name: string;

  @Column({ nullable: false })
  host: string;

  @Column('int4', { nullable: false })
  port: number;

  @Column({
    type: 'enum',
    enum: DOCKER_PROTOCOLS,
    default: 'http',
  })
  @IsIn(DOCKER_PROTOCOLS as unknown as string[])
  protocol?: typeof DOCKER_PROTOCOLS[number];

  @Column({
    type: 'enum',
    enum: INSTANCE_TYPES,
    default: 'docker',
  })
  @IsIn(INSTANCE_TYPES as unknown as string[])
  instanceType?: typeof INSTANCE_TYPES[number];

  @Column('text', {
    default: '/summoner/',
    nullable: false,
  })
  baseMountPath: string;

  @ManyToMany(() => UserEntity, (user: UserEntity) => user.instances)
  @JoinTable()
  users: UserEntity[];

  @Column('int4', { nullable: false, default: 20000 })
  containersLowerPortRange: number;

  @Column('int4', { nullable: false, default: 50000 })
  containersHigherPortRange: number;
}
