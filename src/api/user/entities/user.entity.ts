import {
  Column, Entity, Index, ManyToMany, OneToMany,
} from 'typeorm';
// eslint-disable-next-line import/no-cycle
import { ServerEntity } from '../../server/entities/server.entity';
// eslint-disable-next-line import/no-cycle
import { InstanceEntity } from '../../instances/entities/instance.entity';
import { MyBaseEntity } from '../../base/entities/base.enitity_tmpl';

const USER_ROLES = ['user', 'admin'];

@Entity('user')
@Index('index_user_username', ['username'], { unique: true })
@Index('index_user_email', ['email'], { unique: true })
export class UserEntity extends MyBaseEntity {

  @Column('text')
  username: string;

  @Column('text')
  email: string;

  @Column('text')
  passwordHash: string;

  @Column('text')
  firstName: string;

  @Column('text')
  lastName: string;

  @Column('text', { nullable: true })
  middleName: string | null;

  @Column('text', { nullable: true })
  image: string | null;

  @Column('boolean', { default: false })
  emailVerified: boolean;

  @Column({
    type: 'enum',
    enum: USER_ROLES,
  })
  role: typeof USER_ROLES[number];

  @Column('date', { nullable: true })
  birthDate: string | null; // ISO Date

  @Column('timestamp', { default: () => 'timezone(\'UTC\', now())' })
  registrationDate: string; // ISO Date

  @OneToMany(() => ServerEntity, (server: ServerEntity) => server.user)
  servers: ServerEntity[];

  @ManyToMany(() => InstanceEntity, (instance: InstanceEntity) => instance.users)
  instances: InstanceEntity[];
}
