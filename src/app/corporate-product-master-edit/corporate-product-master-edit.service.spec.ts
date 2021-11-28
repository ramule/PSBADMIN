import { TestBed } from '@angular/core/testing';

import { CorporateProductMasterEditService } from './corporate-product-master-edit.service';

describe('CorporateProductMasterEditService', () => {
  let service: CorporateProductMasterEditService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CorporateProductMasterEditService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
