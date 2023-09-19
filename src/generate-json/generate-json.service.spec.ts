import { Test, TestingModule } from '@nestjs/testing';
import { GenerateJsonService } from './generate-json.service';

describe('GenerateJsonService', () => {
  let service: GenerateJsonService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GenerateJsonService],
    }).compile();

    service = module.get<GenerateJsonService>(GenerateJsonService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
