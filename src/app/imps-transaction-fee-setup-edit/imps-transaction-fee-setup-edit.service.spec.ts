import { TestBed } from '@angular/core/testing';

import { ImpsTransactionFeeSetupEditService } from './imps-transaction-fee-setup-edit.service';

describe('ImpsTransactionFeeSetupEditService', () => {
  let service: ImpsTransactionFeeSetupEditService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImpsTransactionFeeSetupEditService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
