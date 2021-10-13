// eslint-disable-next-line max-classes-per-file
import { validate } from 'class-validator';
import { IsPortAndProto } from './server-proto.class-validator';

describe('Server Port Custom Validator', () => {
  it('should validate tcp', async () => {
    class ValidProtoAndServer {
      @IsPortAndProto()
      serverPort: string;
    }

    const testValid = new ValidProtoAndServer();
    testValid.serverPort = '1234/tcp';
    const validationResult = await validate(testValid);
    expect(validationResult.length).toBe(0);
  });

  it('should validate udp', async () => {
    class ValidProtoAndServer {
      @IsPortAndProto()
      serverPort: string;
    }

    const testValid = new ValidProtoAndServer();
    testValid.serverPort = '1234/udp';
    const validationResult = await validate(testValid);
    expect(validationResult.length).toBe(0);
  });

  it('should not validate unknown protocol', async () => {
    class ValidProtoAndServer {
      @IsPortAndProto()
      serverPort: string;
    }

    const testValid = new ValidProtoAndServer();
    testValid.serverPort = '1234/ospf';
    const validationResult = await validate(testValid);
    expect(validationResult.length).toBe(1);
  });

  it('should not validate low port', async () => {
    class ValidProtoAndServer {
      @IsPortAndProto()
      serverPort: string;
    }

    const testValid = new ValidProtoAndServer();
    testValid.serverPort = '123/tcp';
    const validationResult = await validate(testValid);
    expect(validationResult.length).toBe(1);
  });

  it('should not validate high port', async () => {
    class ValidProtoAndServer {
      @IsPortAndProto()
      serverPort: string;
    }

    const testValid = new ValidProtoAndServer();
    testValid.serverPort = '65536/tcp';
    const validationResult = await validate(testValid);
    expect(validationResult.length).toBe(1);
  });

  it('should require a valid protocol', async () => {
    class ValidProtoAndServer {
      @IsPortAndProto(true)
      serverPort: string;
    }

    const testValid = new ValidProtoAndServer();
    testValid.serverPort = '1234';
    const validationResult = await validate(testValid);
    expect(validationResult.length).toBe(1);
  });

  it('should allow a port without protocol', async () => {
    class ValidProtoAndServer {
      @IsPortAndProto()
      serverPort: string;
    }

    const testValid = new ValidProtoAndServer();
    testValid.serverPort = '1234';
    const validationResult = await validate(testValid);
    expect(validationResult.length).toBe(0);
  });

  it('should allow specific protocols', async () => {
    class ValidProtoAndServer {
      @IsPortAndProto(true, ['tcp'])
      serverPort: string;
    }

    const testValid = new ValidProtoAndServer();
    testValid.serverPort = '1234/udp';
    const validationResult = await validate(testValid);
    expect(validationResult.length).toBe(1);
  });
});
