import {
  Column, Entity, OneToMany, PrimaryGeneratedColumn,
} from 'typeorm';
import { IsIn } from 'class-validator';
import { ImageEntity } from '../../image/entities/image.entity';
import { MountEntity } from '../../mount/entities/mount.entity';
import { EnvEntity } from '../../env/entities/env.entity';

const IMAGE_TYPES = ['baseq3'];

@Entity()
export class ImageTypeEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: IMAGE_TYPES,
    default: 'baseq3',
  })
  @IsIn(IMAGE_TYPES)
  imageType?: typeof IMAGE_TYPES[number];

  @OneToMany(() => ImageEntity, (image: ImageEntity) => image.imageType)
  images: ImageEntity[];

  @OneToMany(() => MountEntity, (mount: MountEntity) => mount.imageType)
  mounts: MountEntity[];

  @OneToMany(() => EnvEntity, (env: EnvEntity) => env.imageType)
  envs: EnvEntity[];
}
