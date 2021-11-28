import { TestBed } from '@angular/core/testing';

import { CorporateProductMasterService } from './corporate-product-master.service';

describe('CorporateProductMasterService', () => {
  let service: CorporateProductMasterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CorporateProductMasterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
