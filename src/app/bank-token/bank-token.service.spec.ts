import { TestBed } from '@angular/core/testing';

import { BankTokenService } from './bank-token.service';

describe('BankTokenService', () => {
  let service: BankTokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BankTokenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
