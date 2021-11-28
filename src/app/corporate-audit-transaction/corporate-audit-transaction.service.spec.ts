import { TestBed } from '@angular/core/testing';

import { CorporateAuditTransactionService } from './corporate-audit-transaction.service';

describe('CorporateAuditTransactionService', () => {
  let service: CorporateAuditTransactionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CorporateAuditTransactionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
