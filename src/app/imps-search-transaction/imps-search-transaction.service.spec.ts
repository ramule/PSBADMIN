import { TestBed } from '@angular/core/testing';

import { ImpsSearchTransactionService } from './imps-search-transaction.service';

describe('ImpsSearchTransactionService', () => {
  let service: ImpsSearchTransactionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImpsSearchTransactionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
