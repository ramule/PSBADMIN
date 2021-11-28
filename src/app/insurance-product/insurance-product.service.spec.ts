import { TestBed } from '@angular/core/testing';

import { InsuranceProductService } from './insurance-product.service';

describe('InsuranceProductService', () => {
  let service: InsuranceProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InsuranceProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
