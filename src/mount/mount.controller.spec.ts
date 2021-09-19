import { Test, TestingModule } from '@nestjs/testing';
import { MountController } from './mount.controller';
import { MountService } from './mount.service';

describe('MountController', () => {
  let controller: MountController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MountController],
      providers: [MountService],
    }).compile();

    controller = module.get<MountController>(MountController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
