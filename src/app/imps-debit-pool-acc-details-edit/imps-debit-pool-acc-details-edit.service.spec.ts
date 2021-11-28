import { TestBed } from '@angular/core/testing';

import { ImpsDebitPoolAccDetailsEditService } from './imps-debit-pool-acc-details-edit.service';

describe('ImpsDebitPoolAccDetailsEditService', () => {
  let service: ImpsDebitPoolAccDetailsEditService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImpsDebitPoolAccDetailsEditService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
