import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EnvService } from './env.service';
import { CreateEnvDto } from './dto/create-env.dto';
import { UpdateEnvDto } from './dto/update-env.dto';

@Controller('env')
export class EnvController {
  constructor(private readonly envService: EnvService) {}

  @Post()
  create(@Body() createEnvDto: CreateEnvDto) {
    return this.envService.create(createEnvDto);
  }

  @Get()
  findAll() {
    return this.envService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.envService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEnvDto: UpdateEnvDto) {
    return this.envService.update(+id, updateEnvDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.envService.remove(+id);
  }
}
