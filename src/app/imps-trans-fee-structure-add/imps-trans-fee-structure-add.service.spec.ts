import { TestBed } from '@angular/core/testing';

import { ImpsTransFeeStructureAddService } from './imps-trans-fee-structure-add.service';

describe('ImpsTransFeeStructureAddService', () => {
  let service: ImpsTransFeeStructureAddService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImpsTransFeeStructureAddService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
