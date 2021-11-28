import { TestBed } from '@angular/core/testing';

import { InsuranceProductAddService } from './insurance-product-add.service';

describe('InsuranceProductAddService', () => {
  let service: InsuranceProductAddService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InsuranceProductAddService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
