import { Test, TestingModule } from '@nestjs/testing';
import { ImagetypeController } from './imagetype.controller';
import { ImagetypeService } from './imagetype.service';

describe('ImagetypeController', () => {
  let controller: ImagetypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ImagetypeController],
      providers: [ImagetypeService],
    }).compile();

    controller = module.get<ImagetypeController>(ImagetypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
