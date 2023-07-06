import { Test, TestingModule } from '@nestjs/testing';
import { AdditionalUsersController } from './additional-users.controller';
import { AdditionalUsersService } from './additional-users.service';

describe('AdditionalUsersController', () => {
  let controller: AdditionalUsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdditionalUsersController],
      providers: [AdditionalUsersService],
    }).compile();

    controller = module.get<AdditionalUsersController>(AdditionalUsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
