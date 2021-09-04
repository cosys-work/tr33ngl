import { Test, TestingModule } from '@nestjs/testing';
import { ZentraleService } from './zentrale.service';

describe('ZentraleService', () => {
  let service: ZentraleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ZentraleService],
    }).compile();

    service = module.get<ZentraleService>(ZentraleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
