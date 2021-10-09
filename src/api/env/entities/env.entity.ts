import {
  Column, Entity, ManyToOne,
} from 'typeorm';
import { ImageTypeEntity } from '../../imagetype/entities/imagetype.entity';
import { MyBaseEntity } from '../../base/entities/base.enitity_tmpl';

@Entity()
export class EnvEntity extends MyBaseEntity {
  @Column({ type: 'text', nullable: false })
  name: string;

  @Column({ type: 'text', nullable: false })
  value: string;

  @ManyToOne(() => ImageTypeEntity, (image: ImageTypeEntity) => image.envs)
  imageType: ImageTypeEntity;
}
