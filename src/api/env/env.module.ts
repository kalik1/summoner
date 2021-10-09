import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnvService } from './env.service';
import { EnvController } from './env.controller';
import { EnvEntity } from './entities/env.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EnvEntity])],
  controllers: [EnvController],
  providers: [EnvService],
})
export class EnvModule {}
