import { TestBed } from '@angular/core/testing';

import { ImpsTransactionFeeSetupService } from './imps-transaction-fee-setup.service';

describe('ImpsTransactionFeeSetupService', () => {
  let service: ImpsTransactionFeeSetupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImpsTransactionFeeSetupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
