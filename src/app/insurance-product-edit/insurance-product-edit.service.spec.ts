import { TestBed } from '@angular/core/testing';

import { InsuranceProductEditService } from './insurance-product-edit.service';

describe('InsuranceProductEditService', () => {
  let service: InsuranceProductEditService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InsuranceProductEditService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
