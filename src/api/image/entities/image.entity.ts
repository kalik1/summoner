import {
  Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn,
} from 'typeorm';
import {
  IsIn, IsNumber, Max, Min,
} from 'class-validator';
import { MyBaseEntity } from '../../base/entities/base.enitity_tmpl';
import { ImageTypeEntity } from '../../imagetype/entities/imagetype.entity';
import { ServerEntity } from '../../server/entities/server.entity';

const TCP_UDP_C = <const>['TCP', 'UDP'];

@Entity()
export class ImageEntity extends MyBaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  imageName: string;

  @Column('int4', { nullable: false })
  @IsNumber()
  @Min(0)
  @Max(65535)
  serverPort: number;

  @Column({
    type: 'enum',
    enum: TCP_UDP_C,
  })
  @IsIn(TCP_UDP_C as unknown as string[])
  serverPortProto: typeof TCP_UDP_C[number];

  @Column('int4', { nullable: false })
  @IsNumber()
  @Min(0)
  @Max(65535)
  managePort: number;

  @Column({
    type: 'enum',
    enum: TCP_UDP_C,
  })
  managePortProto: typeof TCP_UDP_C[number];

  @OneToMany(() => ServerEntity, (server: ServerEntity) => server.image)
  servers: ServerEntity[];

  @ManyToOne(() => ImageTypeEntity, (imageType: ImageTypeEntity) => imageType.images)
  imageType: ImageTypeEntity;
}
