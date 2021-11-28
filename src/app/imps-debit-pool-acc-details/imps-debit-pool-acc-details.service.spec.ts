import { TestBed } from '@angular/core/testing';

import { ImpsDebitPoolAccDetailsService } from './imps-debit-pool-acc-details.service';

describe('ImpsDebitPoolAccDetailsService', () => {
  let service: ImpsDebitPoolAccDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImpsDebitPoolAccDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
