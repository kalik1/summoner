import { Module } from '@nestjs/common';
import { TypeOrmModuleOptions } from '@nestjs/typeorm/dist/interfaces/typeorm-options.interface';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './api/user/user.module';
import { AuthModule } from './api/auth/auth.module';
import { MailSenderModule } from './mail-sender/mail-sender.module';
import { ServerModule } from './api/server/server.module';
import { InstanceModule } from './api/instances/instance.module';
import { MapModule } from './api/map/map.module';
import { ImageModule } from './api/image/image.module';
import { ImagetypeModule } from './api/imagetype/imagetype.module';
import { DockerService } from './docker/docker.service';
import { MountModule } from './api/mount/mount.module';
import { EnvModule } from './api/env/env.module';
import { LogsModule } from './logs/logs.module';
import * as ormconfig from '../ormconfig';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormconfig as TypeOrmModuleOptions),
    UserModule,
    AuthModule,
    MailSenderModule,
    ServerModule,
    InstanceModule,
    MapModule,
    ImageModule,
    ImagetypeModule,
    MountModule,
    EnvModule,
    LogsModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../src', 'static'),
    }),
  ],
  providers: [DockerService],
})
export class AppModule {
}
