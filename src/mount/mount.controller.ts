import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MountService } from './mount.service';
import { CreateMountDto } from './dto/create-mount.dto';
import { UpdateMountDto } from './dto/update-mount.dto';

@Controller('mount')
export class MountController {
  constructor(private readonly mountService: MountService) {}

  @Post()
  create(@Body() createMountDto: CreateMountDto) {
    return this.mountService.create(createMountDto);
  }

  @Get()
  findAll() {
    return this.mountService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mountService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMountDto: UpdateMountDto) {
    return this.mountService.update(+id, updateMountDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mountService.remove(+id);
  }
}
