import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';
import { PORTS_PROTOCOLS } from '../../constnats';

export function IsPortAndProto(
  protocolRequired = false,
  protocols: readonly string[] = PORTS_PROTOCOLS,
  validationOptions?: ValidationOptions,
) {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types,func-names
  return (object: any, propertyName: string) => {
    registerDecorator({
      name: 'isPortAndProto',
      target: object.constructor,
      propertyName,
      constraints: [protocolRequired, protocols],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          if (value) {
            const [localProtocolRequired, localProtocols] = args.constraints;
            if (value.split('/').length > 2 || value.split('/').length < 1) {
              return false;
            }
            const [port, protocol] = value.split('/');
            const defPort = parseInt(port, 10);
            const isProtocolValid = (localProtocolRequired === false && protocol === undefined)
              || localProtocols.includes(protocol);
            return isProtocolValid && Number.isInteger(defPort) && defPort > 1024 && defPort < 65535;
          }
          return false;
        },
      },
    });
  };
}
