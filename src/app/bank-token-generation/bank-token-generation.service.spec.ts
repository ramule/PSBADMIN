import { TestBed } from '@angular/core/testing';

import { BankTokenGenerationService } from './bank-token-generation.service';

describe('BankTokenGenerationService', () => {
  let service: BankTokenGenerationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BankTokenGenerationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
