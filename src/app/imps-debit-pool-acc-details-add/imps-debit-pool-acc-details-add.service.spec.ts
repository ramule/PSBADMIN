import { TestBed } from '@angular/core/testing';

import { ImpsDebitPoolAccDetailsAddService } from './imps-debit-pool-acc-details-add.service';

describe('ImpsDebitPoolAccDetailsAddService', () => {
  let service: ImpsDebitPoolAccDetailsAddService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImpsDebitPoolAccDetailsAddService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
