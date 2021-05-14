import { TestBed } from '@angular/core/testing';

import { BotServiceService } from './bot-service.service';

describe('BotServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BotServiceService = TestBed.get(BotServiceService);
    expect(service).toBeTruthy();
  });
});
