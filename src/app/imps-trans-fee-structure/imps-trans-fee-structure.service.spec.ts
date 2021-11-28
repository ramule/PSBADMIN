import { TestBed } from '@angular/core/testing';

import { ImpsTransFeeStructureService } from './imps-trans-fee-structure.service';

describe('ImpsTransFeeStructureService', () => {
  let service: ImpsTransFeeStructureService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImpsTransFeeStructureService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
