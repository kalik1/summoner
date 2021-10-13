// eslint-disable-next-line max-classes-per-file
import { IsOptional, validate } from 'class-validator';
import { classToClass, plainToClass, Transform } from 'class-transformer';
import { IsPortAndProto } from '../server-proto.class-validator/server-proto.class-validator';
import { serverPortTransformer } from './server-proto.class-transformer';

describe('Server Port Custom Transformer', () => {
  it('should transform', async () => {
    class ValidProtoAndServer {
      @IsPortAndProto()
      @Transform(serverPortTransformer())
      serverPort: string;
    }

    const testValid = new ValidProtoAndServer();
    testValid.serverPort = '1234';
    const validationResult = await validate(testValid);
    expect(validationResult.length).toBe(0);
    const myValid = plainToClass(ValidProtoAndServer, { serverPort: '1234' });
    expect(myValid.serverPort).toBe('1234/tcp');
  });

  it('should transform in other protocol', async () => {
    class ValidProtoAndServer {
      @IsPortAndProto()
      @Transform(serverPortTransformer({ defaultProtocol: 'udp' }))
      serverPort: string;
    }

    const testValid = new ValidProtoAndServer();
    testValid.serverPort = '1234';
    const validationResult = await validate(testValid);
    expect(validationResult.length).toBe(0);
    const myValid = plainToClass(ValidProtoAndServer, { serverPort: '1234' });
    expect(myValid.serverPort).toBe('1234/udp');
  });

  it('should transform not add protocol', async () => {
    class ValidProtoAndServer {
      @IsPortAndProto()
      @Transform(serverPortTransformer({ addProtocol: false }))
      serverPort: string;
    }

    const testValid = new ValidProtoAndServer();
    testValid.serverPort = '1234';
    const validationResult = await validate(testValid);
    expect(validationResult.length).toBe(0);
    const myValid = plainToClass(ValidProtoAndServer, { serverPort: '1234' });
    expect(myValid.serverPort).toBe('1234');
  });

  it('should skip undefined transform', async () => {
    class ValidProtoAndServer {
      @IsPortAndProto()
      @IsOptional()
      @Transform(serverPortTransformer())
      serverPort: string;
    }

    const testValid = new ValidProtoAndServer();
    const validationResult = await validate(testValid);
    const myValid = classToClass(testValid);
    expect(validationResult.length).toBe(0);
    expect(myValid.serverPort).toBe(undefined);
  });
});
