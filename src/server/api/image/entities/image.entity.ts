import {
  Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn,
} from 'typeorm';
import { MyBaseEntity } from '../../base/entities/base.enitity_tmpl';
import { ImageTypeEntity } from '../../imagetype/entities/imagetype.entity';
import { ServerEntity } from '../../server/entities/server.entity';

@Entity()
export class ImageEntity extends MyBaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  imageName: string;

  @Column('text')
  serverPort: string;

  @Column('text')
  managePort: string;

  @OneToMany(() => ServerEntity, (server: ServerEntity) => server.image)
  servers: ServerEntity[];

  @ManyToOne(() => ImageTypeEntity, (imageType: ImageTypeEntity) => imageType.images, { nullable: false })
  imageType: ImageTypeEntity;
}
