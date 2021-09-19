import { PartialType } from '@nestjs/swagger';
import { CreateImagetypeDto } from './create-imagetype.dto';

export class UpdateImagetypeDto extends PartialType(CreateImagetypeDto) {}
