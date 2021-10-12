export function serverPortTransformer(value: string): string {
  const [port, protocol] = value.split('/');
  const defProtocol = protocol || 'tcp';
  return `${port}/${defProtocol}`;
}
