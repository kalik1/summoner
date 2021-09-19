import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class MapEntity {
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
