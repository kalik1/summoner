/**
 value    The property value before the transformation.
 key      The name of the transformed property.
 obj       The transformation source object.
 type     The transformation type.
 options The options object passed to the transformation method.
 https://github.com/typestack/class-transformer/tree/master#implicit-type-conversion
 */
import { PORTS_PROTOCOLS } from '../../constnats';

export function serverPortTransformer(
  options: { addProtocol?: boolean, defaultProtocol?: typeof PORTS_PROTOCOLS[number] } =
  { addProtocol: true, defaultProtocol: PORTS_PROTOCOLS[0] },
): (obj: { value: string }) => string {
  return (obj: { value: string }): string => {
    let { value } = obj;
    if (!value) return undefined;
    // eslint-disable-next-line no-param-reassign
    value = value.toString();
    // eslint-disable-next-line no-param-reassign
    if (options.addProtocol == null) options.addProtocol = true;
    const [port, protocol] = value.split('/');
    if (value.split('/').length > 2 || value.split('/').length < 1) {
      throw new Error(`Invalid ServerPort value in transformer: ${value}`);
    }
    const defProtocol = protocol ?? (options.addProtocol ? options.defaultProtocol : undefined);
    let retServerPort = `${port}`;
    if (defProtocol) {
      retServerPort = `${retServerPort}/${defProtocol}`;
    }
    return retServerPort;
  };
}
