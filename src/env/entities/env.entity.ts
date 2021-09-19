import {
  Column, Entity, ManyToOne, PrimaryGeneratedColumn,
} from 'typeorm';
import { ImageTypeEntity } from '../../imagetype/entities/imagetype.entity';

@Entity()
export class EnvEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text', nullable: false })
  name: string;

  @Column({ type: 'text', nullable: false })
  value: string;

  @ManyToOne(() => ImageTypeEntity, (image: ImageTypeEntity) => image.envs)
  imageType: ImageTypeEntity;
}
