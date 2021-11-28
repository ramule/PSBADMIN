import { TestBed } from '@angular/core/testing';

import { InsuranceCompanyAddService } from './insurance-company-add.service';

describe('InsuranceCompanyAddService', () => {
  let service: InsuranceCompanyAddService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InsuranceCompanyAddService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
