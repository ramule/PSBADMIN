import { TestBed } from '@angular/core/testing';

import { ImpsTransFeeStructureEditService } from './imps-trans-fee-structure-edit.service';

describe('ImpsTransFeeStructureEditService', () => {
  let service: ImpsTransFeeStructureEditService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImpsTransFeeStructureEditService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
