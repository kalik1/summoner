import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { MailSenderModule } from './mail-sender/mail-sender.module';
import { ServerModule } from './server/server.module';
import { InstancesModule } from './instances/instances.module';
import { MapModule } from './map/map.module';
import { ImageModule } from './image/image.module';
import { ImagetypeModule } from './imagetype/imagetype.module';
import { DockerService } from './docker/docker.service';
import { MountModule } from './mount/mount.module';
import { EnvModule } from './env/env.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    UserModule,
    AuthModule,
    MailSenderModule,
    ServerModule,
    InstancesModule,
    MapModule,
    ImageModule,
    ImagetypeModule,
    MountModule,
    EnvModule,
  ],
  providers: [DockerService],
})
export class AppModule {
}
