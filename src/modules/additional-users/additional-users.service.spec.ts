import { Test, TestingModule } from '@nestjs/testing';
import { AdditionalUsersService } from './additional-users.service';

describe('AdditionalUsersService', () => {
  let service: AdditionalUsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdditionalUsersService],
    }).compile();

    service = module.get<AdditionalUsersService>(AdditionalUsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
