import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { MyBaseEntity } from '../../base/entities/base.enitity_tmpl';

@Entity()
export class MapEntity extends MyBaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  name: string;

  @Column('text')
  description: string;

  @Column('text')
  photo: string;

  @Column()
  filename: string;
}
