import { TestBed } from '@angular/core/testing';

import { UpiTransactionsService } from './upi-transactions.service';

describe('UpiTransactionsService', () => {
  let service: UpiTransactionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpiTransactionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
