import { Test, TestingModule } from '@nestjs/testing';
import { MountService } from './mount.service';

describe('MountService', () => {
  let service: MountService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MountService],
    }).compile();

    service = module.get<MountService>(MountService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
