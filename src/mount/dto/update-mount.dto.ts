import { PartialType } from '@nestjs/swagger';
import { CreateMountDto } from './create-mount.dto';

export class UpdateMountDto extends PartialType(CreateMountDto) {}
