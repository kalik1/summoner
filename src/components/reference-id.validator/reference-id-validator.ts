import {
  isUUID, ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface,
} from 'class-validator';
import { MyBaseEntity } from '../../api/base/entities/base.enitity_tmpl';

@ValidatorConstraint({ name: 'ResourceUUID', async: false })
export class ResourceUUID<K extends MyBaseEntity> implements ValidatorConstraintInterface {
  validate(reference: K, args?: ValidationArguments) {
    if (reference?.id === null) return true;
    return isUUID(reference.id, args?.constraints ? args?.constraints[0] : 'all');
  }

  defaultMessage(args?: ValidationArguments) {
    // here you can provide default error message if validation failed
    return `Invalid Resource UUID, id: ${(args.value?.id)}`;
  }
}
