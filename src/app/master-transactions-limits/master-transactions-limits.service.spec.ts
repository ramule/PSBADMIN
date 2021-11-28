import { TestBed } from '@angular/core/testing';

import { MasterTransactionsLimitsService } from './master-transactions-limits.service';

describe('MasterTransactionsLimitsService', () => {
  let service: MasterTransactionsLimitsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MasterTransactionsLimitsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
