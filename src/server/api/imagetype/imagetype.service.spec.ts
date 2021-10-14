import { Test, TestingModule } from '@nestjs/testing';
import { ImagetypeService } from './imagetype.service';

describe('ImagetypeService', () => {
  let service: ImagetypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ImagetypeService],
    }).compile();

    service = module.get<ImagetypeService>(ImagetypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
