import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServerService } from './server.service';
import { ServerController } from './server.controller';
import { DockerService } from '../docker/docker.service';
import { ServerEntity } from './entities/server.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ServerEntity]),
  ],
  controllers: [ServerController],
  providers: [ServerService, DockerService],
})
export class ServerModule {}
