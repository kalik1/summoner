import {
  BaseEntity,
  Column, Entity, OneToMany, PrimaryGeneratedColumn,
} from 'typeorm';
import {
  IsIn, IsNumber, Max, Min,
} from 'class-validator';
// eslint-disable-next-line import/no-cycle
import { ServerEntity } from '../../server/entities/server.entity';
// eslint-disable-next-line import/no-cycle
import { UserEntity } from '../../user/entities/user.entity';

const DOCKER_PROTOCOLS = <const>['http', 'https', 'ssh'];

@Entity()
export class InstanceEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(() => ServerEntity, (server: ServerEntity) => server.instance)
  servers: ServerEntity[];

  @Column({ nullable: false })
  host: string;

  @Column('int4', { nullable: false })
  @IsNumber()
  @Min(0)
  @Max(65535)
  port: number;

  @Column({
    type: 'enum',
    enum: DOCKER_PROTOCOLS,
    default: 'http',
  })
  @IsIn(DOCKER_PROTOCOLS as unknown as string[])
  protocol?: typeof DOCKER_PROTOCOLS[number];

  @Column('text', {
    default: '/summoner/',
    nullable: false,
  })
  baseMountPath: string;

  @OneToMany(() => UserEntity, (user: UserEntity) => user.instances)
  users: UserEntity[];
}
