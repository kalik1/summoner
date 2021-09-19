import {
  Column, Entity, ManyToOne, PrimaryGeneratedColumn,
} from 'typeorm';
import { ImageTypeEntity } from '../../imagetype/entities/imagetype.entity';

@Entity()
export class MountEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text', nullable: false })
  internalPath: string;

  @Column({ type: 'text', nullable: false })
  hostPath: string;

  @ManyToOne(() => ImageTypeEntity, (image: ImageTypeEntity) => image.mounts)
  imageType: ImageTypeEntity;
}
